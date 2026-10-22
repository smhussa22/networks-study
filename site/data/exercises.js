window.EXERCISES = [
  {
    id: "1-R11", chapter: 1, number: "R11", title: "Store-and-forward delay through one switch",
    prompt: "A packet of length L goes from a sender over a link of rate R1 to a store-and-forward switch, then over a link of rate R2 to the receiver. Ignoring queuing, propagation and processing delay, what is the total end-to-end delay?",
    answer: "`L/R1 + L/R2`",
    solution: [
      "The sender needs `L/R1` to push all L bits onto the first link.",
      "A store-and-forward switch must receive the **whole** packet before it starts sending, so it then needs `L/R2` on the second link.",
      "The two transmissions happen one after the other, so the delays add: `L/R1 + L/R2`."
    ]
  },
  {
    id: "1-R13", chapter: 1, number: "R13", title: "Circuit switching vs packet switching for bursty users",
    prompt: "Users share a 2 Mbps link. Each user sends at 1 Mbps when active, but is active only 20% of the time. (a) How many users can circuit switching support? (b) With packet switching, what is the probability a given user is transmitting? (c) With three users, what is the probability all three transmit at once?",
    answer: "(a) 2 users. (b) 0.2. (c) 0.008.",
    solution: [
      "(a) Circuit switching reserves the full 1 Mbps for each user even while idle: 2 Mbps / 1 Mbps = **2 users**.",
      "(b) Each user is active 20% of the time, so the probability is **0.2**.",
      "(c) The users are independent, so multiply: 0.2 × 0.2 × 0.2 = **0.008**. Only then does demand (3 Mbps) exceed the link, which is why packet switching can safely carry more bursty users."
    ]
  },
  {
    id: "1-R18", chapter: 1, number: "R18", title: "Propagation delay and packet length",
    prompt: "A 1,000-byte packet crosses a 2,500 km link with propagation speed 2.5 × 10^8 m/s and rate 2 Mbps. How long does it take to propagate? Does propagation delay depend on packet length or transmission rate?",
    answer: "10 ms; no, it depends only on distance and speed.",
    solution: [
      "`d_prop = d / s = 2.5 × 10^6 m / 2.5 × 10^8 m/s = 0.01 s = 10 ms`.",
      "Propagation delay is the time for one bit to travel the length of the link. It depends on distance and signal speed only, not on L or R.",
      "For comparison, the transmission delay is `L/R = 8,000 bits / 2 × 10^6 bits/s = 4 ms`."
    ]
  },
  {
    id: "1-R19", chapter: 1, number: "R19", title: "Throughput of a three-link path",
    prompt: "Host A sends a large file to Host B over links of R1 = 500 kbps, R2 = 2 Mbps and R3 = 1 Mbps in series, with no other traffic. (a) What is the throughput? (b) How long does a 4-million-byte file take? (c) Repeat (a) and (b) with R2 reduced to 100 kbps.",
    answer: "(a) 500 kbps. (b) 64 s. (c) 100 kbps and 320 s.",
    solution: [
      "Throughput of links in series is the **bottleneck** rate: min(500 kbps, 2 Mbps, 1 Mbps) = 500 kbps.",
      "4 × 10^6 bytes = 32 × 10^6 bits. 32 × 10^6 / 5 × 10^5 = **64 s**.",
      "With a 100 kbps link the bottleneck becomes 100 kbps, and 32 × 10^6 / 10^5 = **320 s**."
    ]
  },
  {
    id: "1-P2", chapter: 1, number: "P2", title: "P packets back to back over N links",
    prompt: "P packets of length L are sent back to back over N links, each of rate R, with store-and-forward switches. Ignoring propagation, queuing and processing, what is the delay until the last packet arrives?",
    answer: "`(N + P − 1) L/R`",
    solution: [
      "The first packet takes `N × L/R` to cross all N links.",
      "The packets are pipelined: each later packet arrives `L/R` after the one before it.",
      "So the last of P packets arrives `(P − 1) L/R` after the first: total `(N + P − 1) L/R`."
    ]
  },
  {
    id: "1-P6", chapter: 1, number: "P6", title: "Propagation vs transmission, and where the first bit is",
    prompt: "Hosts A and B are m metres apart, the propagation speed is s and the link rate is R. A sends a packet of L bits at t = 0. Give d_prop, d_trans and the end-to-end delay. Where is the first bit at t = d_trans if d_prop > d_trans? If d_prop < d_trans? With s = 2.5 × 10^8 m/s, L = 120 bits and R = 56 kbps, at what distance are the two delays equal?",
    answer: "`m/s`, `L/R`, their sum; on the link; already at B; about 536 km.",
    solution: [
      "`d_prop = m/s`, `d_trans = L/R`, and ignoring processing and queuing the end-to-end delay is `d_prop + d_trans`.",
      "At `t = d_trans` the last bit has just left A. If `d_prop > d_trans`, the first bit is still travelling on the link. If `d_prop < d_trans`, the first bit has already reached B.",
      "Equal delays: `m = s × L/R = 2.5 × 10^8 × 120 / 56,000 ≈ 535,714 m`, about **536 km**."
    ]
  },
  {
    id: "1-P7", chapter: 1, number: "P7", title: "VoIP packetization delay",
    prompt: "A 64 kbps voice stream is grouped into 56-byte packets and sent over a 2 Mbps link with 10 ms propagation delay. How long from when a bit is created until it is decoded at Host B?",
    answer: "About 17.2 ms",
    solution: [
      "Packetization: the first bit waits while the 56 × 8 = 448-bit packet fills: 448 / 64,000 = **7 ms**.",
      "Transmission: 448 / 2 × 10^6 = **0.224 ms**.",
      "Propagation: **10 ms**. Total ≈ 7 + 0.224 + 10 = **17.224 ms**."
    ]
  },
  {
    id: "1-P8", chapter: 1, number: "P8", title: "How many users a shared link supports",
    prompt: "A 3 Mbps link is shared. Each user needs 150 kbps when active and is active 10% of the time. (a) How many users can circuit switching support? (b) With packet switching, what is the probability a given user is active? (c) With 120 users, what expression gives the probability that exactly n are active? (d) What is the probability that 21 or more are active?",
    answer: "(a) 20. (b) 0.1. (c) `C(120, n) × 0.1^n × 0.9^(120−n)`. (d) About 0.008.",
    solution: [
      "(a) 3 Mbps / 150 kbps = **20 users**.",
      "(b) **0.1**.",
      "(c) A binomial distribution: `C(120, n) × 0.1^n × 0.9^(120 − n)`.",
      "(d) Summing that expression for n = 21 to 120 gives about **0.0079**. So packet switching can carry 120 users and only rarely exceeds the 20 users' worth of capacity. (The textbook question bank lists 0.004 as the closest choice; the exact binomial value is nearer 0.008.)"
    ]
  },
  {
    id: "1-P10", chapter: 1, number: "P10", title: "End-to-end delay over three links",
    prompt: "A 1,500-byte packet crosses three links of 5,000 km, 4,000 km and 1,000 km through two switches. Each link runs at 2 Mbps with propagation speed 2.5 × 10^8 m/s, and each switch has 3 ms processing delay. With no queuing, what is the end-to-end delay?",
    answer: "64 ms",
    solution: [
      "Propagation: (5,000 + 4,000 + 1,000) km / 2.5 × 10^8 m/s = 20 + 16 + 4 = **40 ms**.",
      "Transmission: 12,000 bits / 2 Mbps = 6 ms on each of 3 links = **18 ms** (store-and-forward).",
      "Processing: 2 switches × 3 ms = **6 ms**. Total = 40 + 18 + 6 = **64 ms**."
    ]
  },
  {
    id: "1-P12", chapter: 1, number: "P12", title: "Queuing delay behind other packets",
    prompt: "A packet arrives at a switch whose 2 Mbps outbound link is halfway through sending a 1,500-byte packet, with four more 1,500-byte packets waiting. What is the new packet's queuing delay?",
    answer: "27 ms",
    solution: [
      "Each 1,500-byte packet takes 12,000 / 2 × 10^6 = **6 ms** to transmit.",
      "The packet waits for half of the current packet (3 ms) plus four full packets (24 ms).",
      "Queuing delay = 3 + 24 = **27 ms**."
    ]
  },
  {
    id: "1-P25", chapter: 1, number: "P25", title: "Bandwidth-delay product and the width of a bit",
    prompt: "Two hosts are 20,000 km apart on a 2 Mbps link with propagation speed 2.5 × 10^8 m/s. (a) What is the bandwidth-delay product? (b) An 800,000-bit file is sent continuously: what is the most bits in the link at once? (c) How wide is one bit?",
    answer: "(a) 160,000 bits. (b) 160,000 bits. (c) 125 m.",
    solution: [
      "Propagation delay: 2 × 10^7 m / 2.5 × 10^8 m/s = 0.08 s. BDP = `R × d_prop` = 2 × 10^6 × 0.08 = **160,000 bits**.",
      "The file is bigger than the BDP, so the link fills up: at most **160,000 bits** are in flight.",
      "Width of a bit = `s / R` = 2.5 × 10^8 / 2 × 10^6 = **125 m**, longer than a football field."
    ]
  },
  {
    id: "1-P28", chapter: 1, number: "P28", title: "Continuous sending vs one packet per round trip",
    prompt: "An 800,000-bit file goes over a 2 Mbps link with 80 ms one-way propagation delay. (a) How long to send it continuously, ignoring propagation? (b) The file is instead split into 20 packets of 40,000 bits, and each must be acknowledged (negligible ACK size) before the next is sent. How long does the transfer take?",
    answer: "(a) 0.4 s. (b) 3.6 s.",
    solution: [
      "(a) 800,000 / 2 × 10^6 = **0.4 s**.",
      "(b) Each packet costs 40,000 / 2 × 10^6 = 0.02 s to send, plus a 0.16 s round trip for its ACK: 0.18 s per packet.",
      "20 × 0.18 = **3.6 s**. Waiting for each ACK wastes most of the link's time, the same problem stop-and-wait has."
    ]
  },
  {
    id: "1-P31", chapter: 1, number: "P31", title: "Message segmentation",
    prompt: "An 8 × 10^6-bit message crosses three 2 Mbps links with two store-and-forward switches. (a) How long without segmentation? (b) With 800 packets of 10,000 bits, how long until the first packet reaches the first switch, and when does the second packet arrive there? (c) How long for the whole message? (d) One more reason to segment, and (e) one drawback?",
    answer: "(a) 12 s. (b) 5 ms and 10 ms. (c) 4.01 s. (d) Only lost packets are resent. (e) Header overhead.",
    solution: [
      "(a) Each hop takes 8 × 10^6 / 2 × 10^6 = 4 s, and three hops in sequence take **12 s**.",
      "(b) One packet: 10,000 / 2 × 10^6 = **5 ms** per hop. The second packet finishes arriving at the first switch at **10 ms**.",
      "(c) Pipelining: `(800 + 3 − 1) × 5 ms` = **4.01 s**.",
      "(d) If a bit error happens, only that small packet is retransmitted, not the whole message.",
      "(e) Each packet carries its own header, adding bits; packets may also need reassembly at the destination."
    ]
  },

  {
    id: "2-R5", chapter: 2, number: "R5", title: "Identifying a process on another host",
    prompt: "What information does a process on one host use to identify a process on another host?",
    answer: "The destination host's IP address and the process's port number.",
    solution: [
      "The IP address identifies the **host**, but a host runs many processes.",
      "The port number identifies the **socket**, and so the process, on that host. Well-known services use well-known ports, such as HTTP on 80 and SMTP on 25."
    ]
  },
  {
    id: "2-R26", chapter: 2, number: "R26–R27", title: "Sockets on a TCP server, and who must start first",
    prompt: "A TCP server serves n clients at once, each from a different host. How many sockets does it need? Why must the TCP server run before the client, while a UDP client may be started before the server?",
    answer: "n + 1 sockets. TCP needs a listening server to connect to; UDP has no connection setup.",
    solution: [
      "The server has one **welcoming** (listening) socket, and each `accept()` returns a new connection socket: n + 1 in total.",
      "A TCP client's `connect()` needs a listening socket on the server to complete the handshake, so the server must already be running.",
      "A UDP client can be started first because UDP has no connection setup, but any datagram it sends before the server binds its port is simply lost."
    ]
  },
  {
    id: "2-P4", chapter: 2, number: "P4–P5", title: "Reading an HTTP request and response",
    prompt: "A browser sends `GET /cs453/index.html HTTP/1.1` with `Host: gaia.cs.umass.edu` and `Connection: keep-alive`. The reply is `HTTP/1.1 200 OK` with `Last-Modified: Sat, 10 Dec 2005`, `Content-Length: 3874` and `Connection: Keep-Alive`. What URL was requested, which HTTP version, persistent or not, and what does each response header say?",
    answer: "`http://gaia.cs.umass.edu/cs453/index.html`, HTTP/1.1, persistent; found, modified 10 Dec 2005, 3,874 bytes, persistent accepted.",
    solution: [
      "URL = Host header + path: `http://gaia.cs.umass.edu/cs453/index.html`. The request line says **HTTP/1.1**, and `keep-alive` asks for a **persistent** connection.",
      "`200 OK`: the server found the document and is returning it. `Last-Modified` gives when the object last changed (10 December 2005), not the response time (that is `Date`).",
      "`Content-Length: 3874`: the body is 3,874 bytes. `Connection: Keep-Alive` in the reply means the server agreed to keep the connection open."
    ]
  },
  {
    id: "2-P7", chapter: 2, number: "P7", title: "DNS lookups plus one HTTP object",
    prompt: "Before reaching a server, a client needs n DNS lookups with round-trip times RTT1 … RTTn. The RTT to the server is RTT0. The page is one small object with negligible transmission time. How long from the click until the object arrives?",
    answer: "`RTT1 + … + RTTn + 2 RTT0`",
    solution: [
      "All the DNS lookups happen before the client knows the server's address: `RTT1 + … + RTTn`.",
      "Then non-persistent HTTP needs one RTT0 for the TCP handshake and one RTT0 for the request and response.",
      "Total: `RTT1 + … + RTTn + 2 RTT0`."
    ]
  },
  {
    id: "2-P13", chapter: 2, number: "P13–P14", title: "SMTP envelope vs message headers, and ending a body",
    prompt: "What is the difference between SMTP's `MAIL FROM:` and the `From:` line in a message? How do SMTP and HTTP each mark the end of a message body?",
    answer: "Envelope command vs message header. SMTP: a line with only a period; HTTP: Content-Length or chunked encoding.",
    solution: [
      "`MAIL FROM:` (and `RCPT TO:`) are SMTP **commands** in the conversation between servers: the envelope used for delivery.",
      "`From:` (and `To:`, `Subject:`) are **header lines inside the message** that the user agent shows.",
      "SMTP ends the DATA section with a line holding a single period. HTTP tells the receiver the body length with `Content-Length` (or uses chunked transfer encoding)."
    ]
  },
  {
    id: "2-P19", chapter: 2, number: "P19, P21", title: "Delegation and spotting cached DNS answers",
    prompt: "How does a DNS server delegate a query to a lower-level server? Without admin access, how could you tell whether a website was looked up from your department a few seconds ago?",
    answer: "It returns the lower-level server's name (a referral). Query your local DNS server and look for a cached answer with a reduced TTL.",
    solution: [
      "A server that is not authoritative for the name replies with the **name of the server to ask next** (NS records, with addresses in the additional section). That is the iterative 'ask this server' reply.",
      "Ask your local DNS server for the name (for example with `nslookup`). A **non-authoritative**, cached answer whose TTL is below the record's full TTL suggests someone looked it up recently."
    ]
  },
  {
    id: "2-P29", chapter: 2, number: "P28–P29", title: "Client before server, and binding the UDP client",
    prompt: "What happens if you run the TCP client before the TCP server? If the UDP client binds its socket to port 5432, does the UDP server need to change?",
    answer: "The TCP client fails to connect. No, the UDP server replies to the address in each datagram.",
    solution: [
      "With no server listening on the port, the client's connection attempt is refused and the client raises an error.",
      "The UDP server reads the sender's address with `recvfrom()` and replies to it, so it works with whatever port the client uses. Only the client's source port changes."
    ]
  },

  {
    id: "3-R7", chapter: 3, number: "R7–R8", title: "Demultiplexing UDP and TCP",
    prompt: "Host C has a UDP socket on port 6789, and Hosts A and B both send UDP segments to it. Where do they go? Then a web server on Host C, port 80, serves persistent TCP connections to A and B. Is that one socket or several?",
    answer: "UDP: the same socket. TCP: one socket per connection, all on port 80.",
    solution: [
      "A UDP socket is identified by (destination IP, destination port), so both segments reach the **same socket**. The process tells them apart by their source IP and port.",
      "A TCP socket is identified by the four-tuple. Each connection gets its **own socket**, and all of them use server port 80 because the source IP and port differ."
    ]
  },
  {
    id: "3-P1", chapter: 3, number: "P1", title: "Telnet port numbers",
    prompt: "Clients A and B open Telnet sessions to server S on port 23. What destination port do their segments use? If A and B are different hosts, can their source ports be equal? If they are the same host?",
    answer: "23. Different hosts: yes. Same host: no.",
    solution: [
      "Both connect to the server's well-known Telnet port, **23**.",
      "Different hosts: yes, because the source IP addresses already make the four-tuples different.",
      "Same host: no. With the same source IP, destination IP and destination port, the source ports are all that keep the two connections apart."
    ]
  },
  {
    id: "3-P3", chapter: 3, number: "P3–P5", title: "One's complement checksum",
    prompt: "Compute the checksum of the 8-bit words 01010011, 01100110 and 01110100. Why does UDP take the one's complement of the sum? Can a matching checksum guarantee there were no errors?",
    answer: "11010001. It makes the receiver's total all 1s. No.",
    solution: [
      "83 + 102 + 116 = 301. Wrap the carry around: 301 − 256 + 1 = 46 = `00101110`. The checksum is its complement, `11010001`.",
      "The receiver adds all words **including** the checksum. With no errors the result is all 1s (`11111111`), which is easy to check; any 0 means an error was detected.",
      "No. Opposite bit flips in the same column of two words cancel, so the sum and checksum still match. The checksum detects some errors; it never corrects them."
    ]
  },
  {
    id: "3-P7", chapter: 3, number: "P7, P12–P14", title: "Sequence numbers, ACKs and NAK-only designs",
    prompt: "Why don't rdt3.0 ACKs need sequence numbers of their own? Why does the alternating-bit protocol fail on a channel that reorders packets? For a sender that sends rarely, is a NAK-only protocol a good idea?",
    answer: "The ACK names the one outstanding packet. Old copies get mistaken for new ones. No.",
    solution: [
      "Only one packet is outstanding at a time and the ACK field already says which sequence number is acknowledged, so the ACK packet itself needs no separate sequence number.",
      "With only 0 and 1, a delayed old packet or ACK carrying the same bit can arrive later and be taken as the current one.",
      "A NAK-only receiver notices a loss only when a later packet reveals the gap. If the sender sends rarely, the loss of the last packet may go unnoticed for a long time, so ACK-based feedback is better. With lots of data and few losses, NAK-only saves feedback."
    ]
  },
  {
    id: "3-P15", chapter: 3, number: "P15", title: "Window needed for 98% utilization",
    prompt: "A link has a 30 ms RTT and 1 Gbps rate, and packets are 1,500 bytes. How many packets must be in flight to keep utilization above 98%?",
    answer: "About 2,451",
    solution: [
      "`L/R = 12,000 bits / 10^9 bits/s = 12 µs`.",
      "With N packets in flight, `U = N × (L/R) / (RTT + L/R)`. Set U ≥ 0.98:",
      "`N ≥ 0.98 × (0.03 + 0.000012) / 0.000012 ≈ 2,451` packets."
    ]
  },
  {
    id: "3-P22", chapter: 3, number: "P22–P24", title: "Window size limits for GBN and SR",
    prompt: "With a sequence number space of size k, what is the largest sender window for Go-Back-N and for Selective Repeat? How does the alternating-bit protocol relate to them?",
    answer: "GBN: k − 1. SR: k/2. It equals both with window size 1.",
    solution: [
      "**GBN**: at most k − 1, so a full window of new packets can never look like retransmissions of the previous window.",
      "**SR**: at most k/2. Otherwise, as in the lecture's 0–3 example with window 3, the receiver cannot tell a retransmitted old packet 0 from a new packet 0.",
      "The alternating-bit protocol is stop-and-wait with numbers 0 and 1, which is exactly SR or GBN with a window of 1."
    ]
  },
  {
    id: "3-R15", chapter: 3, number: "R15, P27", title: "TCP sequence and acknowledgment numbers",
    prompt: "Host A sends segments with sequence numbers 90 and 110. How many bytes are in the first? If it is lost, what ACK does B send? Separately: B has received up to byte 126; A sends an 80-byte segment with Seq = 127, then a 40-byte segment. Give the second segment's sequence number, the ACK if the first arrives first, and the ACK if the second arrives first.",
    answer: "20 bytes; ACK 90. 207; ACK 207; ACK 127.",
    solution: [
      "110 − 90 = **20 bytes**. If that segment is lost, B still expects byte 90, so its ACK number is **90**.",
      "The second segment starts at 127 + 80 = **207**. If the first arrives first, B has bytes up to 206 and ACKs **207**.",
      "If the second arrives first, bytes 127 to 206 are missing, so B sends a duplicate ACK of **127** (cumulative ACKs stop at the first missing byte)."
    ]
  },
  {
    id: "3-P31", chapter: 3, number: "P31–P33", title: "Estimating the RTT",
    prompt: "EstimatedRTT starts at 100 ms. Five SampleRTTs arrive: 106, 120, 140, 90 and 115 ms, with α = 0.125. What is EstimatedRTT after each? Why is it called an exponential moving average, and why does TCP skip SampleRTT for retransmitted segments?",
    answer: "100.75, 103.16, 107.76, 105.54, 106.72 ms.",
    solution: [
      "`EstimatedRTT = 0.875 × EstimatedRTT + 0.125 × SampleRTT`, applied five times: **100.75**, **103.16**, **107.76**, **105.54**, **106.72** ms.",
      "Each update multiplies every older sample's weight by 0.875 again, so old samples fade **exponentially**.",
      "For a retransmitted segment, the ACK could belong to the original or to the retransmission, so the sample would be ambiguous."
    ]
  },
  {
    id: "3-P28", chapter: 3, number: "P28", title: "Flow control limits the rate",
    prompt: "Host A can write into its TCP socket at 120 Mbps over a 100 Mbps link, but Host B's application reads from its receive buffer at only 50 Mbps. What is the long-run transfer rate, and why?",
    answer: "50 Mbps",
    solution: [
      "B's receive buffer fills because data arrives faster than the application reads it.",
      "B advertises a shrinking receive window (`rwnd`), and A may not have more unacknowledged bytes than that window.",
      "So TCP **flow control** holds A to B's read rate of **50 Mbps** in the long run."
    ]
  },
  {
    id: "3-P46", chapter: 3, number: "R17–R18, P46", title: "A little congestion control",
    prompt: "Two TCP connections share a bottleneck of rate R: what rate should each get? What happens to ssthresh on a timeout? A single Reno connection uses a 10 Mbps link with no buffer, 1,500-byte segments and a 150 ms round trip: what is its maximum window, and its average throughput?",
    answer: "R/2. ssthresh = cwnd/2. 125 segments; about 7.5 Mbps.",
    solution: [
      "TCP aims for a fair share, **R/2** each.",
      "On a timeout, ssthresh is set to **half the current congestion window** and cwnd restarts at 1 MSS. (The question bank's wording, 'half its previous value', is wrong; its own later answer, ssthresh 14 after a timeout at window 29, uses half of cwnd.)",
      "Maximum window = bandwidth × RTT / segment size = 10^7 × 0.15 / 12,000 = **125 segments**.",
      "Reno's window saws between W/2 and W, so it averages 0.75 W: about **7.5 Mbps**."
    ]
  }
];
