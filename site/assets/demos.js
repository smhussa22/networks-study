(function () {
  'use strict';
  const Study = window.Study;
  const esc = Study.esc;

  function shell(root, title, subtitle) {
    root.innerHTML =
      '<div class="demo-head"><span class="demo-title">' + esc(title) + '</span>' +
      (subtitle ? '<span class="demo-sub">' + subtitle + '</span>' : '') + '</div>' +
      '<div class="demo-modes"></div><div class="demo-stage"></div>' +
      '<div class="demo-controls"></div><p class="demo-readout" aria-live="polite"></p>';
    return {
      modes: root.querySelector('.demo-modes'),
      stage: root.querySelector('.demo-stage'),
      controls: root.querySelector('.demo-controls'),
      readout: root.querySelector('.demo-readout')
    };
  }

  function makeButton(label, onClick, extraClass) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'demo-btn' + (extraClass ? ' ' + extraClass : '');
    button.textContent = label;
    button.addEventListener('click', onClick);
    return button;
  }

  function modeButtons(host, choices, current, onChange) {
    host.innerHTML = '';
    host.setAttribute('role', 'group');
    choices.forEach(choice => {
      const button = makeButton(choice[1], () => {
        host.querySelectorAll('button').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
        onChange(choice[0]);
      }, 'seg');
      button.setAttribute('aria-pressed', String(choice[0] === current));
      host.appendChild(button);
    });
  }

  function transport(host, step, reset, delay) {
    let timer = null;
    const play = makeButton('Play', () => (timer ? stop() : start()), 'primary');
    const stepButton = makeButton('Step', () => { stop(); step(); });
    const resetButton = makeButton('Reset', () => { stop(); reset(); });
    function start() {
      if (step() === false) { reset(); step(); }
      timer = setInterval(() => { if (step() === false) stop(); }, delay);
      play.textContent = 'Pause';
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
      play.textContent = 'Play';
    }
    host.append(play, stepButton, resetButton);
    return { stop: stop };
  }

  function slider(host, label, min, max, value, onInput, format) {
    const id = 'slider-' + Math.random().toString(36).slice(2, 8);
    const wrap = document.createElement('label');
    wrap.className = 'demo-slider';
    wrap.htmlFor = id;
    wrap.innerHTML = '<span>' + esc(label) + ' <strong></strong></span><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" value="' + value + '">';
    const output = wrap.querySelector('strong');
    const input = wrap.querySelector('input');
    const show = () => { output.textContent = format ? format(Number(input.value)) : input.value; };
    input.addEventListener('input', () => { show(); onInput(Number(input.value)); });
    show();
    host.appendChild(wrap);
    return input;
  }

  function svg(width, height, body, label) {
    return '<svg viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' + esc(label || '') + '" font-family="var(--font)" font-size="13">' + body + '</svg>';
  }

  function text(x, y, content, attributes) {
    return '<text x="' + x + '" y="' + y + '" ' + (attributes || '') + '>' + esc(content) + '</text>';
  }

  function box(x, y, width, height, fill, label, labelColor) {
    return '<rect x="' + x + '" y="' + y + '" width="' + width + '" height="' + height + '" rx="5" fill="' + fill + '"/>' +
      (label ? text(x + width / 2, y + height / 2 + 4, label, 'text-anchor="middle" font-family="var(--mono)" font-size="12" font-weight="600" fill="' + (labelColor || 'var(--paper)') + '"') : '');
  }

  function encapsulation(root) {
    const ui = shell(root, 'Encapsulation, end to end', 'Follow one message down the source stack and back up the destination stack.');
    const LAYERS = ['application', 'transport', 'network', 'link', 'physical'];
    const HEADER_COLORS = { Hl: 'var(--t3)', Hn: 'var(--t2)', Ht: 'var(--t1)', M: 'var(--t0)' };
    const STEPS = [
      { side: 0, layer: 0, unit: ['M'], note: 'The application hands message M to the transport layer through its socket.' },
      { side: 0, layer: 1, unit: ['Ht', 'M'], note: 'Transport adds header Ht (ports and other fields) to make a segment.' },
      { side: 0, layer: 2, unit: ['Hn', 'Ht', 'M'], note: 'Network adds header Hn (addresses for delivery across networks) to make a datagram.' },
      { side: 0, layer: 3, unit: ['Hl', 'Hn', 'Ht', 'M'], note: 'Link adds header Hl to make a frame for the next device.' },
      { side: 0, layer: 4, unit: ['Hl', 'Hn', 'Ht', 'M'], note: 'Physical sends the frame as bits on the medium. A router on the way would strip Hl, read Hn and build a new frame.' },
      { side: 1, layer: 3, unit: ['Hl', 'Hn', 'Ht', 'M'], note: 'At the destination, the link layer checks and removes Hl.' },
      { side: 1, layer: 2, unit: ['Hn', 'Ht', 'M'], note: 'Network reads and removes Hn, then passes the segment up.' },
      { side: 1, layer: 1, unit: ['Ht', 'M'], note: 'Transport reads the destination port in Ht, removes it, and demultiplexes to the right socket.' },
      { side: 1, layer: 0, unit: ['M'], note: 'The application receives M, with no headers left.' }
    ];
    let position = -1;
    function render() {
      const width = 680;
      let body = '';
      [0, 1].forEach(side => {
        const left = side === 0 ? 20 : 360;
        body += text(left, 18, side === 0 ? 'source' : 'destination', 'font-weight="700" fill="var(--ink)"');
        LAYERS.forEach((layer, row) => {
          const top = 30 + row * 40;
          const isActive = position >= 0 && STEPS[position].side === side && STEPS[position].layer === row;
          body += '<rect x="' + left + '" y="' + top + '" width="300" height="32" rx="6" fill="' + (isActive ? 'var(--accent-soft)' : 'var(--paper)') + '" stroke="' + (isActive ? 'var(--accent)' : 'var(--rule)') + '"/>';
          body += text(left + 10, top + 21, layer, 'font-family="var(--mono)" font-size="12" fill="var(--ink-2)"');
        });
      });
      if (position >= 0) {
        const current = STEPS[position];
        const left = (current.side === 0 ? 20 : 360) + 110;
        const top = 30 + current.layer * 40 + 4;
        let x = left;
        current.unit.forEach(part => {
          const partWidth = part === 'M' ? 60 : 34;
          body += box(x, top, partWidth - 3, 24, HEADER_COLORS[part], part);
          x += partWidth;
        });
      }
      ui.stage.innerHTML = svg(width, 236, body, 'Protocol stacks at source and destination');
      ui.readout.textContent = position < 0 ? 'Press Step to start.' : (position + 1) + ' of ' + STEPS.length + '. ' + STEPS[position].note;
    }
    transport(ui.controls, () => {
      if (position >= STEPS.length - 1) return false;
      ++position;
      render();
      return position < STEPS.length - 1;
    }, () => { position = -1; render(); }, 1100);
    render();
  }

  function delay(root) {
    const ui = shell(root, 'Transmission vs propagation delay', 'Move the sliders to see which delay dominates.');
    const RATES = [0.056, 1, 2, 10, 100, 1000, 10000];
    let packetBytes = 1500;
    let rateIndex = 2;
    let distanceKm = 2500;
    const SPEED = 2.5e8;
    function format(seconds) {
      if (seconds >= 1) return (Math.round(seconds * 1000) / 1000) + ' s';
      if (seconds >= 0.001) return (Math.round(seconds * 1e6) / 1000) + ' ms';
      return (Math.round(seconds * 1e9) / 1000) + ' µs';
    }
    function render() {
      const bits = packetBytes * 8;
      const rate = RATES[rateIndex] * 1e6;
      const transmit = bits / rate;
      const propagate = distanceKm * 1000 / SPEED;
      const total = transmit + propagate;
      const widest = Math.max(transmit, propagate);
      const width = 680;
      const barSpace = 460;
      let body = '';
      [['transmission L/R', transmit, 'var(--t0)'], ['propagation d/s', propagate, 'var(--t1)']].forEach((row, index) => {
        const top = 14 + index * 46;
        body += text(10, top + 20, row[0], 'font-size="13" fill="var(--ink-2)"');
        body += '<rect x="170" y="' + top + '" width="' + barSpace + '" height="28" rx="5" fill="var(--rule)"/>';
        body += '<rect x="170" y="' + top + '" width="' + Math.max(2, barSpace * row[1] / widest) + '" height="28" rx="5" fill="' + row[2] + '"/>';
        body += text(170 + barSpace + 8, top + 20, format(row[1]), 'font-size="12" fill="var(--ink)"');
      });
      ui.stage.innerHTML = svg(width, 110, body, 'Transmission and propagation delay bars');
      const bdp = rate * propagate;
      const bitWidth = SPEED / rate;
      ui.readout.textContent = 'd_trans = ' + format(transmit) + ', d_prop = ' + format(propagate) + ', one packet end to end ≈ ' + format(total) + '. ' +
        (transmit > propagate ? 'Transmission dominates: the last bit leaves after the first bit has already arrived.' : 'Propagation dominates: the first bit is still on the link when the last bit leaves.') +
        ' Bandwidth-delay product ≈ ' + Math.round(bdp).toLocaleString() + ' bits; one bit is ' + (bitWidth >= 1 ? Math.round(bitWidth).toLocaleString() + ' m' : (Math.round(bitWidth * 100) / 100) + ' m') + ' wide.';
    }
    slider(ui.controls, 'Packet size', 40, 10000, packetBytes, value => { packetBytes = value; render(); }, value => value.toLocaleString() + ' bytes');
    slider(ui.controls, 'Link rate', 0, RATES.length - 1, rateIndex, value => { rateIndex = value; render(); }, value => (RATES[value] < 1 ? '56 kbps' : (RATES[value] >= 1000 ? (RATES[value] / 1000) + ' Gbps' : RATES[value] + ' Mbps')));
    slider(ui.controls, 'Distance', 1, 36000, distanceKm, value => { distanceKm = value; render(); }, value => value.toLocaleString() + ' km');
    render();
  }

  function http(root) {
    const ui = shell(root, 'HTTP connection strategies', 'A base HTML file plus small referenced images, transmission time ignored.');
    let mode = 'nonpersistent';
    let images = 4;
    function timeline() {
      const rows = [];
      if (mode === 'nonpersistent') {
        for (let object = 0; object <= images; ++object) rows.push(['setup', object === 0 ? 'base' : 'img ' + object], ['fetch', object === 0 ? 'base' : 'img ' + object]);
      } else if (mode === 'persistent') {
        rows.push(['setup', 'once']);
        for (let object = 0; object <= images; ++object) rows.push(['fetch', object === 0 ? 'base' : 'img ' + object]);
      } else {
        rows.push(['setup', 'once'], ['fetch', 'base'], ['fetch', 'all ' + images + ' images']);
      }
      return rows;
    }
    function render() {
      const rows = timeline();
      const width = 680;
      const slot = Math.min(56, (width - 20) / rows.length);
      let body = '';
      rows.forEach((row, index) => {
        const x = 10 + index * slot;
        body += box(x, 20, slot - 4, 30, row[0] === 'setup' ? 'var(--t3)' : 'var(--t0)', '');
        body += text(x + (slot - 4) / 2, 66, String(index + 1), 'text-anchor="middle" font-size="11" fill="var(--ink-2)"');
      });
      body += text(10, 92, 'RTTs →', 'font-size="12" fill="var(--ink-2)"');
      ui.stage.innerHTML = svg(width, 100, body, 'Timeline in round-trip times') +
        '<div class="demo-legend"><span style="--swatch:var(--t3)">TCP connection setup (1 RTT)</span><span style="--swatch:var(--t0)">request and response (1 RTT)</span></div>';
      const notes = {
        nonpersistent: 'Non-persistent: every object needs its own TCP setup plus a request, about 2 RTTs each.',
        persistent: 'Persistent without pipelining: one setup, then one RTT per object.',
        pipelined: 'Persistent with pipelining: one setup, one RTT for the base file, then all images requested back to back.'
      };
      ui.readout.textContent = notes[mode] + ' Total: ' + rows.length + ' RTTs for ' + (images + 1) + ' objects.';
    }
    modeButtons(ui.modes, [['nonpersistent', 'Non-persistent'], ['persistent', 'Persistent'], ['pipelined', 'Persistent + pipelining']], mode, next => { mode = next; render(); });
    slider(ui.controls, 'Images on the page', 1, 10, images, value => { images = value; render(); });
    render();
  }

  function dns(root) {
    const ui = shell(root, 'Resolving gaia.cs.umass.edu', 'From a host at engineering.nyu.edu.');
    const NODES = {
      host: [70, 170, 'host'], local: [250, 170, 'local DNS'], root: [430, 40, 'root'],
      tld: [610, 100, '.edu TLD'], auth: [610, 200, 'umass.edu']
    };
    const SCRIPTS = {
      iterative: [
        ['host', 'local', 'query: gaia.cs.umass.edu?'], ['local', 'root', 'query'], ['root', 'local', 'referral: ask the .edu TLD'],
        ['local', 'tld', 'query'], ['tld', 'local', 'referral: ask umass.edu'], ['local', 'auth', 'query'],
        ['auth', 'local', 'answer: IP address'], ['local', 'host', 'answer (local server caches it)']
      ],
      recursive: [
        ['host', 'local', 'query'], ['local', 'root', 'query'], ['root', 'tld', 'query (root takes on the work)'],
        ['tld', 'auth', 'query'], ['auth', 'tld', 'answer'], ['tld', 'root', 'answer'], ['root', 'local', 'answer'], ['local', 'host', 'answer']
      ],
      cached: [
        ['host', 'local', 'query'], ['local', 'tld', 'query (TLD address already cached, root skipped)'],
        ['tld', 'local', 'referral: ask umass.edu'], ['local', 'auth', 'query'], ['auth', 'local', 'answer'], ['local', 'host', 'answer']
      ]
    };
    let mode = 'iterative';
    let position = 0;
    function arrow(from, to, number, isCurrent) {
      const start = NODES[from];
      const end = NODES[to];
      const offset = number % 2 === 0 ? 6 : -6;
      const color = isCurrent ? 'var(--accent)' : 'var(--chart-muted)';
      const midX = (start[0] + end[0]) / 2;
      const midY = (start[1] + end[1]) / 2 + offset;
      return '<line x1="' + start[0] + '" y1="' + (start[1] + offset) + '" x2="' + end[0] + '" y2="' + (end[1] + offset) + '" stroke="' + color + '" stroke-width="' + (isCurrent ? 3 : 1.5) + '" marker-end="url(#dns-arrow-' + (isCurrent ? 'on' : 'off') + ')"/>' +
        '<circle cx="' + midX + '" cy="' + midY + '" r="10" fill="' + color + '"/>' + text(midX, midY + 4, String(number), 'text-anchor="middle" font-size="11" font-weight="700" fill="var(--paper)"');
    }
    function render() {
      const script = SCRIPTS[mode];
      let body = '<defs>' +
        '<marker id="dns-arrow-on" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker>' +
        '<marker id="dns-arrow-off" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--chart-muted)"/></marker></defs>';
      script.slice(0, position).forEach((message, index) => { body += arrow(message[0], message[1], index + 1, index === position - 1); });
      Object.keys(NODES).forEach(key => {
        const node = NODES[key];
        body += '<rect x="' + (node[0] - 52) + '" y="' + (node[1] - 16) + '" width="104" height="32" rx="7" fill="var(--paper)" stroke="var(--ink-2)"/>';
        body += text(node[0], node[1] + 5, node[2], 'text-anchor="middle" font-size="13" fill="var(--ink)"');
      });
      ui.stage.innerHTML = svg(680, 240, body, 'DNS servers and messages');
      ui.readout.textContent = position === 0 ? 'Press Step. This lookup takes ' + script.length + ' messages.'
        : 'Message ' + position + ' of ' + script.length + ': ' + NODES[script[position - 1][0]][2] + ' → ' + NODES[script[position - 1][1]][2] + ', ' + script[position - 1][2] + '.';
    }
    modeButtons(ui.modes, [['iterative', 'Iterative'], ['recursive', 'Recursive'], ['cached', 'Iterative, TLD cached']], mode, next => { mode = next; position = 0; controls.stop(); render(); });
    const controls = transport(ui.controls, () => {
      if (position >= SCRIPTS[mode].length) return false;
      ++position;
      render();
      return position < SCRIPTS[mode].length;
    }, () => { position = 0; render(); }, 900);
    render();
  }

  function demux(root) {
    const ui = shell(root, 'Which socket gets the segment?', 'Server B, port 80. Pick the fields of an arriving segment.');
    const CONNECTIONS = [['A', '9157'], ['C', '5775'], ['C', '9157']];
    let mode = 'tcp';
    let sourceIp = 'A';
    let sourcePort = '5775';
    function makeSelect(label, choices, current, onChange) {
      const wrap = document.createElement('label');
      wrap.className = 'demo-check';
      wrap.innerHTML = esc(label) + ' <select>' + choices.map(choice => '<option' + (choice === current ? ' selected' : '') + '>' + esc(choice) + '</option>').join('') + '</select>';
      wrap.querySelector('select').addEventListener('change', event => onChange(event.target.value));
      ui.controls.appendChild(wrap);
    }
    function render() {
      const rows = mode === 'tcp'
        ? CONNECTIONS.map((connection, index) => ({ label: 'connection socket ' + (index + 1) + ': (' + connection[0] + ', ' + connection[1] + ', B, 80)', match: connection[0] === sourceIp && connection[1] === sourcePort }))
        : [{ label: 'UDP socket bound to (B, 80)', match: true }];
      const matched = rows.filter(row => row.match);
      let html = '<div class="table-wrap"><table class="demo-table"><thead><tr><th>Socket on server B</th><th>Match?</th></tr></thead><tbody>' +
        rows.map(row => '<tr><td>' + esc(row.label) + '</td><td class="' + (row.match ? 'hit' : 'miss') + '">' + (row.match ? 'yes' : 'no') + '</td></tr>').join('') + '</tbody></table></div>';
      ui.stage.innerHTML = html;
      const segment = '(' + sourceIp + ', ' + sourcePort + ', B, 80)';
      if (mode === 'udp') ui.readout.textContent = 'UDP looks only at the destination IP and port, so ' + segment + ' goes to the one UDP socket, whatever its source. The process can still read the source address.';
      else if (matched.length) ui.readout.textContent = segment + ' matches all four fields of one connection, so it goes to that connection\'s socket.';
      else ui.readout.textContent = segment + ' matches no connection: its fields appear in different connections, but TCP needs all four to match one.';
    }
    modeButtons(ui.modes, [['tcp', 'TCP (four-tuple)'], ['udp', 'UDP (two-tuple)']], mode, next => { mode = next; render(); });
    makeSelect('Source IP', ['A', 'C'], sourceIp, value => { sourceIp = value; render(); });
    makeSelect('Source port', ['9157', '5775'], sourcePort, value => { sourcePort = value; render(); });
    render();
  }

  function checksum(root) {
    const ui = shell(root, 'UDP checksum', 'One\'s complement sum of 16-bit words, using the lecture\'s example.');
    const ORIGINAL = ['0110011001100000', '0101010101010101', '1000111100001100'];
    let sent = ORIGINAL.slice();
    let received = ORIGINAL.slice();
    let note = 'The receiver gets exactly what was sent.';
    function toNumber(bits) {
      let value = 0;
      for (const bit of bits) value = value * 2 + (bit === '1' ? 1 : 0);
      return value;
    }
    function toBits(value) {
      let bits = '';
      for (let position = 15; position >= 0; --position) bits += Math.floor(value / Math.pow(2, position)) % 2 === 1 ? '1' : '0';
      return bits;
    }
    function wrappedSum(words) {
      let total = 0;
      words.forEach(word => {
        total += toNumber(word);
        if (total > 0xffff) total = total - 0x10000 + 1;
      });
      return total;
    }
    function complement(value) { return 0xffff - value; }
    function flipBit(word, position) {
      const bits = word.split('');
      bits[position] = bits[position] === '1' ? '0' : '1';
      return bits.join('');
    }
    function render() {
      const senderSum = wrappedSum(sent);
      const sentChecksum = complement(senderSum);
      const receiverTotal = wrappedSum(received.concat([toBits(sentChecksum)]));
      const passes = receiverTotal === 0xffff;
      const changed = received.some((word, index) => word !== sent[index]);
      let html = '<div class="table-wrap"><table class="demo-table"><thead><tr><th>Word</th><th>Sent</th><th>Received</th></tr></thead><tbody>';
      sent.forEach((word, index) => {
        html += '<tr><td>' + (index + 1) + '</td><td>' + word + '</td><td class="' + (received[index] === word ? '' : 'miss') + '">' + received[index] + '</td></tr>';
      });
      html += '<tr><td>sum</td><td>' + toBits(senderSum) + '</td><td>' + toBits(wrappedSum(received)) + '</td></tr>';
      html += '<tr><td>checksum</td><td>' + toBits(sentChecksum) + '</td><td>(carried in the header)</td></tr>';
      html += '<tr><td>receiver total</td><td></td><td class="' + (passes ? 'hit' : 'miss') + '">' + toBits(receiverTotal) + '</td></tr></tbody></table></div>';
      ui.stage.innerHTML = html;
      ui.readout.textContent = note + ' ' + (passes ? 'The total is all 1s, so no error is detected.' : 'The total has a 0, so the error is detected and the datagram is discarded.') +
        (passes && changed ? ' The data did change: this is the checksum\'s weak spot.' : '');
    }
    ui.controls.append(
      makeButton('Corrupt one bit', () => {
        received = sent.slice();
        received[0] = flipBit(received[0], 3);
        note = 'One bit of word 1 flipped in transit.';
        render();
      }),
      makeButton('Flip two bits that cancel', () => {
        received = sent.slice();
        let column = 0;
        for (let position = 0; position < 16; ++position) {
          if (sent[0][position] !== sent[1][position]) { column = position; break; }
        }
        received[0] = flipBit(received[0], column);
        received[1] = flipBit(received[1], column);
        note = 'The same bit position flipped in words 1 and 2, in opposite directions.';
        render();
      }),
      makeButton('Reset', () => {
        received = sent.slice();
        note = 'The receiver gets exactly what was sent.';
        render();
      })
    );
    render();
  }

  function slidingWindow(root) {
    const ui = shell(root, 'Go-Back-N vs Selective Repeat', 'Window N = 4, packets 0 to 5, packet 2 is lost. The lecture\'s example.');
    const SCRIPTS = {
      gbn: [
        { base: 0, sent: [0, 1, 2, 3], acked: [], lost: [2], delivered: [], buffered: [], note: 'Sender fills the window with packets 0 to 3. Packet 2 is lost.' },
        { base: 0, sent: [0, 1, 2, 3], acked: [], lost: [2], delivered: [0, 1], buffered: [], note: 'Receiver gets 0 and 1, delivers them, and sends ACK0 and ACK1.' },
        { base: 0, sent: [0, 1, 2, 3], acked: [], lost: [2], delivered: [0, 1], buffered: [], note: 'Packet 3 arrives out of order: the receiver discards it and sends ACK1 again.' },
        { base: 2, sent: [0, 1, 2, 3, 4, 5], acked: [0, 1], lost: [2], delivered: [0, 1], buffered: [], note: 'ACK0 and ACK1 slide the window to 2–5, so packets 4 and 5 go out.' },
        { base: 2, sent: [0, 1, 2, 3, 4, 5], acked: [0, 1], lost: [2], delivered: [0, 1], buffered: [], note: 'Packets 4 and 5 are discarded too; each gets a duplicate ACK1, which the sender ignores.' },
        { base: 2, sent: [0, 1, 2, 3, 4, 5], acked: [0, 1], lost: [], delivered: [0, 1], buffered: [], note: 'Packet 2 times out: the sender resends 2, 3, 4 and 5, the whole window.' },
        { base: 6, sent: [0, 1, 2, 3, 4, 5], acked: [0, 1, 2, 3, 4, 5], lost: [], delivered: [0, 1, 2, 3, 4, 5], buffered: [], note: 'The receiver delivers 2 to 5 in order and ACKs each; the window slides to 6–9.' }
      ],
      sr: [
        { base: 0, sent: [0, 1, 2, 3], acked: [], lost: [2], delivered: [], buffered: [], note: 'Sender fills the window with packets 0 to 3. Packet 2 is lost.' },
        { base: 0, sent: [0, 1, 2, 3], acked: [], lost: [2], delivered: [0, 1], buffered: [], note: 'Receiver gets 0 and 1, delivers them, and sends ACK0 and ACK1.' },
        { base: 0, sent: [0, 1, 2, 3], acked: [], lost: [2], delivered: [0, 1], buffered: [3], note: 'Packet 3 arrives out of order: the receiver buffers it and sends ACK3.' },
        { base: 2, sent: [0, 1, 2, 3, 4, 5], acked: [0, 1, 3], lost: [2], delivered: [0, 1], buffered: [3], note: 'ACK0 and ACK1 slide the window to 2–5 and packets 4 and 5 go out. The sender records ACK3.' },
        { base: 2, sent: [0, 1, 2, 3, 4, 5], acked: [0, 1, 3, 4, 5], lost: [2], delivered: [0, 1], buffered: [3, 4, 5], note: 'Packets 4 and 5 are buffered and individually ACKed.' },
        { base: 2, sent: [0, 1, 2, 3, 4, 5], acked: [0, 1, 3, 4, 5], lost: [], delivered: [0, 1], buffered: [3, 4, 5], note: 'Only packet 2\'s timer expires, so only packet 2 is resent.' },
        { base: 6, sent: [0, 1, 2, 3, 4, 5], acked: [0, 1, 2, 3, 4, 5], lost: [], delivered: [0, 1, 2, 3, 4, 5], buffered: [], note: 'Packet 2 arrives: the receiver delivers 2, 3, 4 and 5 and sends ACK2. With 3 to 5 already ACKed, send_base jumps to 6.' }
      ]
    };
    const WINDOW = 4;
    const SLOTS = 10;
    let mode = 'gbn';
    let position = 0;
    function render() {
      const state = SCRIPTS[mode][position];
      let body = text(10, 30, 'sender', 'font-weight="700" fill="var(--ink)"') + text(10, 110, 'receiver', 'font-weight="700" fill="var(--ink)"');
      for (let slot = 0; slot < SLOTS; ++slot) {
        const x = 100 + slot * 56;
        let fill = 'var(--rule)';
        if (state.acked.indexOf(slot) >= 0) fill = 'var(--ok)';
        else if (state.sent.indexOf(slot) >= 0) fill = 'var(--t3)';
        else if (slot >= state.base && slot < state.base + WINDOW) fill = 'var(--accent)';
        body += box(x, 12, 48, 30, fill, String(slot), fill === 'var(--rule)' ? 'var(--ink-2)' : 'var(--paper)');
        let receiverFill = 'var(--rule)';
        if (state.delivered.indexOf(slot) >= 0) receiverFill = 'var(--ok)';
        else if (state.buffered.indexOf(slot) >= 0) receiverFill = 'var(--t2)';
        else if (state.lost.indexOf(slot) >= 0) receiverFill = 'var(--bad)';
        body += box(x, 92, 48, 30, receiverFill, state.lost.indexOf(slot) >= 0 ? '✕' : String(slot), receiverFill === 'var(--rule)' ? 'var(--ink-2)' : 'var(--paper)');
      }
      body += '<rect x="' + (96 + state.base * 56) + '" y="6" width="' + (WINDOW * 56) + '" height="42" rx="8" fill="none" stroke="var(--ink)" stroke-dasharray="5 4"/>';
      body += text(100 + state.base * 56, 62, 'window', 'font-size="11" fill="var(--ink-2)"');
      ui.stage.innerHTML = svg(680, 136, body, 'Sender and receiver windows') +
        '<div class="demo-legend"><span style="--swatch:var(--ok)">ACKed / delivered</span><span style="--swatch:var(--t3)">sent, not ACKed</span><span style="--swatch:var(--accent)">usable, not sent</span><span style="--swatch:var(--t2)">buffered</span><span style="--swatch:var(--bad)">lost</span></div>';
      ui.readout.textContent = (position + 1) + ' of ' + SCRIPTS[mode].length + '. ' + state.note;
    }
    modeButtons(ui.modes, [['gbn', 'Go-Back-N'], ['sr', 'Selective Repeat']], mode, next => { mode = next; position = 0; controls.stop(); render(); });
    const controls = transport(ui.controls, () => {
      if (position >= SCRIPTS[mode].length - 1) return false;
      ++position;
      render();
      return position < SCRIPTS[mode].length - 1;
    }, () => { position = 0; render(); }, 1500);
    render();
  }

  const DEMOS = { encapsulation: encapsulation, delay: delay, http: http, dns: dns, demux: demux, checksum: checksum, window: slidingWindow };
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.demo[data-demo]').forEach(element => {
      const mount = DEMOS[element.getAttribute('data-demo')];
      if (mount) mount(element);
    });
  });
})();
