window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(
  {
    id: "udp-01", topic: "udp", pool: "quiz", source: "inclass", multi: false, ref: "In-class Set 2 Q5",
    q: "A UDP client sends to the correct server IP but an unrelated port. What has it selected incorrectly?",
    options: [
      { id: "host", text: "The receiving host, while the intended service is right.", why: "The IP address is correct, so the right host receives the datagram. It is the service (port) that is wrong." },
      { id: "encoding", text: "The encoding of the message.", why: "Encoding affects whether the server can read the bytes, not where they are delivered." },
      { id: "source-ip", text: "The source host's IP address.", why: "The source IP is the client's own address and is supplied by the OS." },
      { id: "dest-socket", correct: true, text: "The destination socket endpoint.", why: "A UDP destination socket is (destination IP, destination port). The IP picks the host and the wrong port picks the wrong socket, or none." },
      { id: "server-source", text: "The server's source endpoint for replies.", why: "The server's reply endpoint is chosen by the server, not by the client's request." }
    ]
  },
  {
    id: "udp-02", topic: "udp", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "A developer picks UDP only because it is less complex than TCP. Is that enough to decide that UDP suits the application?",
    options: [
      { id: "yes-fast", text: "Yes, because UDP guarantees lower latency than TCP.", why: "UDP gives no latency guarantees; it only skips connection setup." },
      { id: "os", text: "Yes, because the operating system adds any reliability the application needs automatically.", why: "The OS adds nothing beyond UDP's best-effort delivery." },
      { id: "service", correct: true, text: "No; its service must match what the app needs.", why: "Simplicity only helps if best-effort delivery is acceptable or the application supplies what it needs." },
      { id: "no-udp", text: "No, because UDP cannot be used for real applications.", why: "DNS, QUIC and real-time media all use UDP." },
      { id: "yes", text: "Yes, because simpler protocols always serve applications better than complex ones like TCP.", why: "A file transfer that needs reliability would be badly served by plain UDP." }
    ]
  },
  {
    id: "udp-03", topic: "udp", pool: "exam", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "A request has UDP source port 50501 and destination port 50502. The server replies from the same socket to the client's sending socket. What ports does the reply use?",
    options: [
      { id: "both-02", text: "Source 50502, destination 50502", why: "The client's socket is on 50501, so the reply must go there." },
      { id: "same", text: "Source 50501, destination 50502", why: "Those are the request's ports; replies reverse them." },
      { id: "swap", correct: true, text: "Source 50502, destination 50501", why: "The server's port becomes the reply's source, and the client's original source port becomes the destination." },
      { id: "new", text: "A new random source port, destination 50501", why: "The reply comes from the same server socket, port 50502." },
      { id: "53", text: "Source 53, destination 50501", why: "53 is DNS; nothing in the question involves DNS." }
    ]
  },
  {
    id: "udp-04", topic: "udp", pool: "quiz", source: "inclass", multi: true, ref: "Lecture discussion questions",
    q: "An application sends a UDP message to another process. Where do the destination IP address and port end up?",
    options: [
      { id: "port-udp", correct: true, text: "The destination port is in the UDP header.", why: "The UDP header has source port, destination port, length and checksum." },
      { id: "ip-in-udp", text: "The destination IP address is in the UDP header.", why: "The UDP header has no IP address fields." },
      { id: "ip-ip", correct: true, text: "The destination IP address is in the IP header.", why: "IP fills in its destination address field." },
      { id: "os-pass", correct: true, text: "The OS hands the destination IP to IP along with the datagram.", why: "The application supplies the IP when sending, and the OS passes it to IP as extra information." },
      { id: "port-in-ip", text: "The destination port is in the IP header.", why: "Ports are transport-layer fields." }
    ]
  },
  {
    id: "udp-05", topic: "udp", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "An application asks UDP to send a message larger than the allowed UDP/IP size. What happens?",
    options: [
      { id: "truncate", text: "UDP silently sends only the first part of the message.", why: "The send fails rather than truncating." },
      { id: "tcp", text: "The OS switches the socket to TCP for that message.", why: "The socket type never changes on its own." },
      { id: "fails", correct: true, text: "The send fails; the app must split it.", why: "UDP puts each message in one datagram and never splits it." },
      { id: "splits", text: "UDP splits it into several datagrams with sequence numbers so the receiver can rebuild it.", why: "UDP has no sequence numbers and does not divide messages." },
      { id: "fragment-udp", text: "UDP fragments it into pieces, and the receiver's UDP reassembles them before delivery.", why: "Fragmentation is an IP-layer action, and only for datagrams that already fit UDP's limit." }
    ]
  },
  {
    id: "udp-06", topic: "udp", pool: "exam", source: "inclass", multi: true, ref: "Lecture discussion questions",
    q: "A message fits within the UDP/IP size limit, but the resulting IPv4 datagram is larger than the network MTU. Which statements are correct?",
    options: [
      { id: "reassemble", correct: true, text: "The destination's IP reassembles fragments before passing the datagram to UDP.", why: "UDP receives one complete datagram, not fragments." },
      { id: "one-msg", correct: true, text: "The receiving application gets one message, if delivery succeeds.", why: "Assuming all fragments arrive and the buffer is big enough." },
      { id: "fragment", correct: true, text: "IPv4 may fragment the datagram if fragmentation is allowed.", why: "Fragmentation is possible in IPv4 when allowed." },
      { id: "ip-layer", correct: true, text: "Fragmentation happens at the IP layer.", why: "UDP still treats the application message as one message." },
      { id: "udp-splits", text: "UDP splits the message into several smaller UDP datagrams so that each one fits within the MTU.", why: "UDP never divides an accepted message." }
    ]
  },
  {
    id: "udp-07", topic: "udp", pool: "quiz", source: "inclass", multi: true, ref: "Lecture discussion question",
    q: "An application divides a large message into three smaller messages and sends each with UDP. Which statements are correct?",
    options: [
      { id: "guarantee", text: "UDP guarantees that all three pieces arrive.", why: "UDP is best effort." },
      { id: "merge", text: "UDP merges pieces sent to the same port into one message.", why: "UDP preserves message boundaries; it never merges." },
      { id: "app-combine", correct: true, text: "The receiving app must rejoin them and handle loss or reordering.", why: "UDP does not combine messages, and any of the three may be lost or arrive out of order." },
      { id: "three", correct: true, text: "They travel as three separate UDP datagrams.", why: "Each send becomes one datagram." },
      { id: "udp-order", text: "UDP reassembles the three pieces in order at the receiver.", why: "UDP has no sequence numbers to reorder pieces." }
    ]
  },
  {
    id: "udp-08", topic: "udp", pool: "quiz", source: "inclass", multi: true,
    q: "A sensor app sends readings over UDP and wants good transmission efficiency. Which design advice from the lecture applies?",
    options: [
      { id: "bigger-always", text: "Make each message as large as UDP allows.", why: "Messages beyond the MTU get fragmented, which is less efficient." },
      { id: "fit-mtu", correct: true, text: "Use larger messages that keep the whole datagram within the path MTU.", why: "That balances overhead against fragmentation." },
      { id: "udp-batch", text: "Rely on UDP to batch small readings into one datagram.", why: "UDP sends each message in its own datagram." },
      { id: "huge-mtu", correct: true, text: "Very large messages may exceed the MTU and need fragmentation.", why: "Fragmentation reduces efficiency." },
      { id: "tiny-overhead", correct: true, text: "Very small messages carry a lot of header overhead for their data.", why: "Header bytes are a large fraction of a tiny message." }
    ]
  },
  {
    id: "udp-09", topic: "udp", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "A valid UDP segment arrives from IP. How does UDP turn it into data the application can use?",
    options: [
      { id: "ack", text: "It sends an ACK to the sender, then delivers the data to the app in sequence order.", why: "UDP sends no ACKs and has no sequence numbers." },
      { id: "reassemble", text: "It waits for the rest of the byte stream to arrive and then passes all the bytes up.", why: "UDP is message-oriented; each datagram stands alone." },
      { id: "route", text: "It forwards the segment to the next router on the path.", why: "Forwarding is a network-layer job." },
      { id: "header-app", text: "It passes the whole segment, header included, to the app.", why: "UDP strips its header before delivery." },
      { id: "steps", correct: true, text: "Checksum check, header removal, then delivery via the socket.", why: "The application gets its message without processing the UDP header itself." }
    ]
  },
  {
    id: "udp-10", topic: "udp", pool: "exam", source: "inclass", multi: false,
    q: "During transmission, one bit flips from 0 to 1 in a 16-bit word, and the bit in the same position flips from 1 to 0 in another word. What happens at the receiver?",
    options: [
      { id: "missed", correct: true, text: "The sum can stay the same, so the error goes undetected.", why: "Opposite flips in the same column cancel in the one's complement sum. This is the weak protection the lecture shows." },
      { id: "corrected", text: "The checksum identifies the flipped bits and corrects them.", why: "The UDP checksum only detects some errors; it cannot correct any." },
      { id: "detected", text: "The receiver's sum is no longer all 1s, so the error is detected.", why: "With cancelling flips, the sum is unchanged." },
      { id: "nak", text: "UDP sends a NAK so the sender retransmits.", why: "UDP has no NAKs or retransmission." },
      { id: "link", text: "The link layer always catches this, so UDP never sees it.", why: "Not all links check errors, and errors can occur in router memory." }
    ]
  },
  {
    id: "udp-11", topic: "udp", pool: "quiz", source: "inclass", multi: false,
    q: "A UDP segment fails its checksum check at the receiver. What does UDP do?",
    options: [
      { id: "discard", correct: true, text: "It silently discards the datagram.", why: "UDP detects errors only; it neither corrects nor recovers." },
      { id: "deliver-flag", text: "It delivers the message with an error flag set.", why: "Failed datagrams are dropped, not delivered." },
      { id: "notify", text: "It tells the sender to retransmit.", why: "UDP sends no feedback." },
      { id: "correct", text: "It corrects the flipped bits and delivers the message.", why: "The checksum cannot locate or fix errors." },
      { id: "wait", text: "It waits for a duplicate copy to arrive.", why: "UDP does not expect or track duplicates." }
    ]
  },
  {
    id: "udp-12", topic: "udp", pool: "exam", source: "textbook", multi: false, ref: "Textbook Ch. 3 P3",
    q: "A sender adds the 8-bit words 01010011, 01100110 and 01110100 with one's complement arithmetic (wrapping any carry around). What checksum does it send?",
    options: [
      { id: "11010010", text: "11010010", why: "That is the complement of the sum without the wraparound." },
      { id: "00101110", text: "00101110", why: "That is the wrapped sum; the checksum is its one's complement." },
      { id: "10111010", text: "10111010", why: "This does not match the sum or its complement; redo the addition." },
      { id: "11010001", correct: true, text: "11010001", why: "83 + 102 + 116 = 301; 301 − 256 = 45, plus the wrapped carry gives 46 = 00101110; its complement is 11010001." },
      { id: "00101101", text: "00101101", why: "That drops the carry instead of wrapping it around." }
    ]
  },
  {
    id: "udp-13", topic: "udp", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 P4b",
    q: "Add the 8-bit words 11011010 and 01100101 with one's complement arithmetic. What is the checksum, the complement of the wrapped sum?",
    options: [
      { id: "10111111", correct: true, text: "10111111", why: "218 + 101 = 319; 319 − 256 = 63, plus the carry gives 64 = 01000000; complement 10111111." },
      { id: "00111111", text: "00111111", why: "That drops the carry instead of wrapping it around." },
      { id: "11000000", text: "11000000", why: "That is the complement of the sum without the wraparound." },
      { id: "10011011", text: "10011011", why: "This does not follow from the addition." },
      { id: "01000000", text: "01000000", why: "That is the wrapped sum, not its complement." }
    ]
  },
  {
    id: "udp-14", topic: "udp", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 P5",
    q: "The UDP receiver computes the checksum and it matches. Can it be absolutely sure no bit errors happened?",
    options: [
      { id: "short", text: "Yes, as long as the segment is short.", why: "Even two words can hide cancelling errors." },
      { id: "yes", text: "Yes: a matching checksum always proves there are no errors.", why: "The checksum offers only weak protection." },
      { id: "no", correct: true, text: "No: some combinations of errors produce a matching checksum.", why: "Cancelling bit flips leave the sum unchanged." },
      { id: "link", text: "Yes, because the link layer already checked the frame.", why: "Not all links check errors, and router memory can introduce them." },
      { id: "tcp", text: "No, but only for TCP segments.", why: "UDP and TCP use the same kind of checksum." }
    ]
  },
  {
    id: "udp-15", topic: "udp", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 R6",
    q: "Can an application get reliable data transfer while running over UDP?",
    options: [
      { id: "os-flag", text: "Yes, by setting the reliability flag in the UDP header so the OS retransmits for it.", why: "The UDP header has no such flag." },
      { id: "never", text: "No, UDP can never be part of a reliable service.", why: "Applications can implement reliability themselves." },
      { id: "app", correct: true, text: "Yes, if the app adds its own reliability, such as ACKs and retransmissions.", why: "Reliability can be added above UDP; QUIC does exactly this." },
      { id: "tcp-socket", text: "Only if the application also opens a TCP socket to carry the acknowledgments.", why: "Reliability can be built on UDP alone." },
      { id: "wired", text: "Only if every link on the path is wired.", why: "Wired links can still lose packets in queues." }
    ]
  },
  {
    id: "udp-16", topic: "udp", pool: "quiz", source: "conceptual", multi: true,
    q: "Which fields are in the UDP segment header?",
    options: [
      { id: "src", correct: true, text: "Source port", why: "Part of the return address for replies." },
      { id: "seq", text: "Sequence number", why: "UDP has no sequence numbers; that is a TCP field." },
      { id: "sum", correct: true, text: "Checksum", why: "Used for error detection." },
      { id: "len", correct: true, text: "Length", why: "Length in bytes of the UDP segment, header included." },
      { id: "dst", correct: true, text: "Destination port", why: "Used to demultiplex to the right socket." }
    ]
  },
  {
    id: "udp-17", topic: "udp", pool: "quiz", source: "conceptual", multi: false,
    q: "What does the UDP length field measure?",
    options: [
      { id: "segment", correct: true, text: "The length in bytes of the whole UDP segment, counting both the header and the data", why: "The length covers the header plus the application data." },
      { id: "bits", text: "The segment length in bits", why: "It counts bytes." },
      { id: "words", text: "The number of 16-bit words that were added together for the checksum", why: "The checksum is one 16-bit field." },
      { id: "payload", text: "The length of the application data only, without the UDP header", why: "The header is included in the length." },
      { id: "datagram", text: "The length of the full IP datagram", why: "The IP header has its own length field." }
    ]
  },
  {
    id: "udp-18", topic: "udp", pool: "quiz", source: "conceptual", multi: true,
    q: "UDP uses a connectionless paradigm. Which statements follow from that?",
    options: [
      { id: "no-setup", correct: true, text: "An app need not set up communication before sending data.", why: "It can send at any time." },
      { id: "no-state", correct: true, text: "UDP keeps no connection state.", why: "There is no connection to track." },
      { id: "first-handshake", text: "Only the first message of a session needs a handshake.", why: "No UDP message needs a handshake." },
      { id: "min-gap", text: "An app must wait a minimum time between two messages.", why: "UDP allows any delay, short or arbitrarily long." },
      { id: "no-control", correct: true, text: "No control messages are exchanged, only data messages.", why: "Communication consists only of the data messages, so overhead is very low." }
    ]
  },
  {
    id: "udp-19", topic: "udp", pool: "quiz", source: "conceptual", multi: false,
    q: "UDP is message-oriented. What does that mean for the receiving application?",
    options: [
      { id: "boundaries", correct: true, text: "Boundaries are kept: one message in, one out.", why: "UDP does not split or combine messages." },
      { id: "ordered", text: "Messages always arrive in the order they were sent.", why: "UDP gives no ordering guarantee." },
      { id: "acked", text: "Each message is acknowledged by the receiver before the next one is delivered to it.", why: "UDP sends no acknowledgments." },
      { id: "combined", text: "Small messages are joined before delivery.", why: "UDP never combines messages." },
      { id: "stream", text: "Data arrives as one continuous byte stream, so the app must find the message boundaries.", why: "That is TCP's byte-stream interface." }
    ]
  },
  {
    id: "udp-20", topic: "udp", pool: "exam", source: "assignment", multi: false, ref: "Assignment 2 Q4",
    q: "Why does the ping/pong capture contain no TCP handshake and no TCP acknowledgments for this application?",
    options: [
      { id: "vpn", text: "The VPN hid the handshake inside its encrypted tunnel, so Wireshark could not show it.", why: "The capture is done on campus with the VPN off." },
      { id: "fast", text: "The handshake happened too quickly for Wireshark to record it before the first PING.", why: "Wireshark records every packet on the interface; there was no handshake." },
      { id: "server-acks", text: "The server's PONG replies are the TCP ACKs.", why: "PONGs are application messages carried in UDP." },
      { id: "filter", text: "The capture filter removed the TCP handshake.", why: "The application never used TCP; the filter excludes SSH, which is unrelated." },
      { id: "udp", correct: true, text: "The programs use UDP sockets, which need no connection setup and send no ACKs.", why: "Each PING and PONG is a single UDP datagram." }
    ]
  },
  {
    id: "udp-21", topic: "udp", pool: "quiz", source: "assignment", multi: true, ref: "Assignment 2 Q3",
    q: "For one successful probe, the Wireshark time between PING and PONG differs slightly from the RTT the client prints. Which explanations are valid?",
    options: [
      { id: "one-way", text: "The client measures only the one-way delay to the server, while Wireshark measures the round trip.", why: "Both measure from the request to the reply, a round trip." },
      { id: "client-overhead", correct: true, text: "The client's timer runs in Python, so it adds local OS and program processing time.", why: "Timing in the program includes work on the host itself." },
      { id: "capture-point", correct: true, text: "Wireshark timestamps packets when they cross the capture interface.", why: "Its times exclude the time spent inside the client's application and stack." },
      { id: "server-only", text: "Only Wireshark's value includes the server's processing time.", why: "Both measurements include the server's time to reply." },
      { id: "loss", text: "The difference shows that a datagram was lost and resent.", why: "UDP never resends, and a matched PONG means the exchange succeeded." }
    ]
  }
);
