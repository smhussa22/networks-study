window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(
  {
    id: "tcp-01", topic: "tcp", pool: "quiz", source: "inclass", multi: false,
    q: "A TCP connection is open between a laptop and a server, and five routers sit on the path. What do those routers know about the connection?",
    options: [
      { id: "buffers", text: "Each router holds a copy of the connection's send and receive buffers along the path.", why: "The buffers belong to the two hosts." },
      { id: "handshake", text: "Each router takes part in the three-way handshake.", why: "The handshake is between the client and server only." },
      { id: "state", text: "Each router stores the connection's current sequence and acknowledgment numbers.", why: "Routers keep no TCP connection state." },
      { id: "nothing", correct: true, text: "Nothing; the connection lives only in the end systems.", why: "Routers only see IP datagrams; buffers and state variables live at the endpoints." },
      { id: "circuit", text: "Each router reserves a circuit for the connection.", why: "TCP is not circuit switching; nothing is reserved in the core." }
    ]
  },
  {
    id: "tcp-02", topic: "tcp", pool: "exam", source: "inclass", multi: false,
    q: "In a Telnet session, Host A sends 'C' with Seq = 42, ACK = 79. Host B echoes 'C' back with Seq = 79, ACK = 43. What does A send to acknowledge the echo?",
    options: [
      { id: "42-79", text: "Seq = 42, ACK = 79", why: "Those are A's first segment's numbers; both have moved on by one byte." },
      { id: "43-80", correct: true, text: "Seq = 43, ACK = 80", why: "A's next byte is 43, and it has now received B's byte 79, so it expects 80." },
      { id: "43-79", text: "Seq = 43, ACK = 79", why: "A has received byte 79, so it must ACK 80, the next byte it expects." },
      { id: "44-80", text: "Seq = 44, ACK = 80", why: "A has sent only one byte (42), so its next sequence number is 43." },
      { id: "80-43", text: "Seq = 80, ACK = 43", why: "This mixes up the two directions: A's sequence space is around 43, B's around 80." }
    ]
  },
  {
    id: "tcp-03", topic: "tcp", pool: "quiz", source: "inclass", multi: false,
    q: "A sender's first data byte is numbered 0 and the MSS is 1,000 bytes. What is the sequence number of the third full segment?",
    options: [
      { id: "segment-three", text: "3", why: "TCP numbers bytes, not segments." },
      { id: "2999", text: "2999", why: "That is the last byte of the third segment, not its first." },
      { id: "3000", text: "3000", why: "That is where the fourth segment starts." },
      { id: "segment-two", text: "2", why: "TCP numbers bytes, not segments." },
      { id: "2000", correct: true, text: "2000", why: "Sequence numbers count bytes: the segments start at 0, 1000 and 2000." }
    ]
  },
  {
    id: "tcp-04", topic: "tcp", pool: "quiz", source: "inclass", multi: false,
    q: "A receiver expects byte 500 next. A segment arrives carrying bytes 700 to 899. What does the receiver do right away?",
    options: [
      { id: "ack-900", text: "It sends ACK = 900.", why: "TCP ACKs are cumulative; bytes 500 to 699 are still missing." },
      { id: "ack-700", text: "It sends ACK = 700.", why: "The receiver has not received byte 500, so it cannot acknowledge past it." },
      { id: "dup-ack", correct: true, text: "It sends a duplicate ACK with ACK = 500.", why: "On an out-of-order segment the receiver immediately sends a duplicate ACK naming the next byte it expects." },
      { id: "nak", text: "It sends a NAK asking for bytes 500 to 699 to be resent.", why: "TCP has no NAKs; it uses duplicate ACKs." },
      { id: "wait-500ms", text: "It waits up to 500 ms before sending any ACK.", why: "Delayed ACKs are only for in-order segments; a gap needs an immediate ACK." }
    ]
  },
  {
    id: "tcp-05", topic: "tcp", pool: "quiz", source: "inclass", multi: true,
    q: "Host A sends Seq = 92 with 8 bytes. Host B receives it and sends ACK = 100, but that ACK is lost. Which statements are correct?",
    options: [
      { id: "ack-92", text: "Host B replies with ACK = 92 to ask for a fresh copy.", why: "B has the bytes, so it ACKs 100, the next byte it expects." },
      { id: "timeout", correct: true, text: "Host A times out and retransmits the segment with Seq = 92.", why: "A never sees the ACK, so its timer expires." },
      { id: "discard", correct: true, text: "Host B discards the retransmitted data, which it already has.", why: "B's receive state shows bytes 92 to 99 were already received." },
      { id: "deliver-twice", text: "Host B delivers the 8 bytes to its application a second time.", why: "TCP delivers each byte to the application once." },
      { id: "reack", correct: true, text: "Host B sends ACK = 100 again.", why: "Re-sending the cumulative ACK lets A move on." }
    ]
  },
  {
    id: "tcp-06", topic: "tcp", pool: "exam", source: "inclass", multi: false,
    q: "Host A sends Seq = 92 (8 bytes) and Seq = 100 (20 bytes) back to back. B receives both and sends ACK = 100 and ACK = 120, but both ACKs are delayed past A's timeout. What does A do?",
    options: [
      { id: "first-only", correct: true, text: "It resends only Seq = 92; if ACK = 120 then arrives in time, Seq = 100 is not resent.", why: "On timeout TCP retransmits the oldest unACKed segment, and the cumulative ACK 120 covers both." },
      { id: "both", text: "It resends both segments right away, since neither one has been acknowledged yet.", why: "TCP retransmits only the segment that timed out." },
      { id: "second-only", text: "It resends only Seq = 100, since that is the most recent segment it sent to Host B.", why: "The timer is for the oldest unacknowledged segment." },
      { id: "nothing", text: "It resends nothing, since the ACKs were only delayed and not actually lost.", why: "A cannot tell delay from loss when the timer fires." },
      { id: "reset", text: "It resets the connection because the ACKs are late.", why: "A timeout leads to retransmission, not a reset." }
    ]
  },
  {
    id: "tcp-07", topic: "tcp", pool: "quiz", source: "inclass", multi: false,
    q: "Host A sends Seq = 92 (8 bytes) and Seq = 100 (20 bytes). The ACK = 100 is lost, but ACK = 120 arrives before A's timer expires. What does A retransmit?",
    options: [
      { id: "seq92", text: "Seq = 92, since the ACK for that particular segment never arrived.", why: "ACK 120 means every byte below 120 was received." },
      { id: "both", text: "Both segments, after the timer expires.", why: "The timer is stopped when the outstanding data is ACKed." },
      { id: "three-dup", text: "It waits for three duplicate ACKs before deciding which segment to resend.", why: "There is nothing missing, so there is nothing to fast-retransmit." },
      { id: "nothing", correct: true, text: "Nothing; ACK = 120 covers both.", why: "A cumulative ACK covers an earlier lost ACK." },
      { id: "seq100", text: "Seq = 100, to be safe.", why: "ACK 120 already covers bytes 100 to 119." }
    ]
  },
  {
    id: "tcp-08", topic: "tcp", pool: "quiz", source: "inclass", multi: true,
    q: "The segment with Seq = 100 is lost. Later segments arrive, and Host A receives ACK = 100 four times in total before its timer expires. Which statements are correct?",
    options: [
      { id: "three-dups", correct: true, text: "The first ACK = 100 plus three duplicates makes 4 ACKs for the same data.", why: "Fast retransmit triggers on 3 duplicate ACKs." },
      { id: "after-gap", correct: true, text: "The duplicates mean later segments arrived after a missing one.", why: "Each duplicate ACK is sent when an out-of-order segment arrives." },
      { id: "resend-all", text: "Host A resends every unacknowledged segment after Seq = 100.", why: "Only the missing segment is retransmitted." },
      { id: "wait-timer", text: "Host A must still wait for the timer before resending.", why: "Fast retransmit resends before the timeout to reduce delay." },
      { id: "fast", correct: true, text: "Host A retransmits Seq = 100 at once, without waiting for the timeout.", why: "This is TCP fast retransmit." }
    ]
  },
  {
    id: "tcp-09", topic: "tcp", pool: "quiz", source: "inclass", multi: false,
    q: "EstimatedRTT is 100 ms and a new SampleRTT of 140 ms is measured, with α = 0.125. What is the new EstimatedRTT?",
    options: [
      { id: "105", correct: true, text: "105 ms", why: "(1 − 0.125) × 100 + 0.125 × 140 = 87.5 + 17.5 = 105 ms." },
      { id: "140", text: "140 ms", why: "EWMA smooths samples; it does not jump to the latest one." },
      { id: "120", text: "120 ms", why: "That is the plain average, which gives the new sample far too much weight." },
      { id: "100", text: "100 ms", why: "The new sample still moves the estimate a little." },
      { id: "135", text: "135 ms", why: "That swaps the weights: the new sample gets only 0.125." }
    ]
  },
  {
    id: "tcp-10", topic: "tcp", pool: "exam", source: "inclass", multi: false,
    q: "EstimatedRTT is 100 ms and DevRTT is 5 ms. What is TimeoutInterval, and what does the timeout become if the timer then expires?",
    options: [
      { id: "120-1s", text: "120 ms, then 1 second", why: "1 second is the initial timeout from RFC 6298; after a timeout the value doubles." },
      { id: "120-240", correct: true, text: "120 ms, then 240 ms after the timeout", why: "TimeoutInterval = EstimatedRTT + 4 × DevRTT = 120 ms, and TCP doubles the timeout after a timeout." },
      { id: "105-210", text: "105 ms, then 210 ms after the timeout", why: "The margin is 4 × DevRTT, not 1 × DevRTT." },
      { id: "100-200", text: "100 ms, then 200 ms after the timeout", why: "The timeout adds a safety margin above EstimatedRTT." },
      { id: "120-120", text: "120 ms, and it stays 120 ms", why: "TCP doubles the timeout value when a timeout occurs." }
    ]
  },
  {
    id: "tcp-11", topic: "tcp", pool: "quiz", source: "inclass", multi: true,
    q: "Which TCP receiver ACK-generation rules are correct?",
    options: [
      { id: "ooo-wait", text: "Out-of-order segment above the expected number: wait up to 500 ms in case the gap fills before ACKing.", why: "Gaps get an immediate duplicate ACK, not a delayed one." },
      { id: "fill", correct: true, text: "Segment that fills the gap from its low end: immediately send an ACK.", why: "The receiver ACKs at once so the sender can move on." },
      { id: "gap", correct: true, text: "Out-of-order segment above the expected number: immediately send a duplicate ACK.", why: "The duplicate ACK names the next byte expected." },
      { id: "pending", correct: true, text: "In-order segment with one ACK pending: immediately send one cumulative ACK.", why: "One ACK covers both in-order segments." },
      { id: "delayed", correct: true, text: "In-order segment, nothing pending: wait up to 500 ms for another segment before ACKing.", why: "This is the delayed-ACK rule." }
    ]
  },
  {
    id: "tcp-12", topic: "tcp", pool: "quiz", source: "inclass", multi: true,
    q: "A video chat app wants to send to three friends at once over TCP. Which properties of a TCP connection matter here?",
    options: [
      { id: "routers", text: "Routers copy each segment to all three friends.", why: "Routers do not know about TCP connections." },
      { id: "p2p", correct: true, text: "A connection is point-to-point: one sender and one receiver.", why: "The app needs a separate connection to each friend." },
      { id: "duplex", correct: true, text: "Each connection is full duplex, so data flows both ways at once.", why: "Each friend can send back on the same connection." },
      { id: "shared-buffer", text: "All three connections share one send buffer.", why: "Each connection has its own send and receive buffers at each end." },
      { id: "no-multicast", correct: true, text: "TCP does not support multicasting.", why: "One TCP connection cannot reach all three friends at once." }
    ]
  },
  {
    id: "tcp-13", topic: "tcp", pool: "quiz", source: "inclass", multi: false,
    q: "Why does TCP choose a random initial sequence number instead of always starting at 0?",
    options: [
      { id: "routers", text: "So that the routers along the path can tell different TCP connections apart from each other.", why: "Routers do not read TCP headers." },
      { id: "compress", text: "To compress the sequence number field.", why: "The field is always 32 bits." },
      { id: "faster", text: "Because counting from 0 slows down the handshake when many connections open at once.", why: "The starting value has no effect on speed." },
      { id: "secret", text: "To encrypt the data in the connection.", why: "TCP has no built-in security." },
      { id: "old", correct: true, text: "To avoid mixing in segments from an older connection.", why: "A random start makes stale segments unlikely to fall in the new connection's range." }
    ]
  },
  {
    id: "tcp-14", topic: "tcp", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 R15a",
    q: "Host A sends two TCP segments back to back. The first has sequence number 90 and the second 110. How many data bytes are in the first segment?",
    options: [
      { id: "10", text: "10", why: "The difference between the sequence numbers is 20." },
      { id: "110", text: "110", why: "110 is where the second segment starts." },
      { id: "90", text: "90", why: "90 is where the first segment starts, not its length." },
      { id: "20", correct: true, text: "20", why: "110 − 90 = 20 bytes." },
      { id: "21", text: "21", why: "Bytes 90 to 109 are 20 bytes." }
    ]
  },
  {
    id: "tcp-15", topic: "tcp", pool: "exam", source: "textbook", multi: false, ref: "Textbook Ch. 3 P27c",
    q: "Host B has received bytes up to 126 from A. A sends an 80-byte segment with Seq = 127, then a 40-byte segment. The second arrives first. What ACK number does B send for it?",
    options: [
      { id: "126", text: "126", why: "The ACK names the next byte expected, 127, not the last byte received." },
      { id: "127", correct: true, text: "127", why: "Bytes 127 to 206 are missing, so B ACKs 127, the next byte it expects." },
      { id: "247", text: "247", why: "TCP ACKs are cumulative; B cannot acknowledge past the gap." },
      { id: "167", text: "167", why: "That would assume the first segment carried 40 bytes." },
      { id: "207", text: "207", why: "That is the second segment's sequence number, which B cannot ACK yet." }
    ]
  },
  {
    id: "tcp-16", topic: "tcp", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 P31",
    q: "EstimatedRTT starts at 100 ms. The next SampleRTTs are 106, 120, 140, 90 and 115 ms, with α = 0.125. What is EstimatedRTT after all five?",
    options: [
      { id: "106.72", correct: true, text: "About 106.72 ms", why: "Applying the EWMA five times gives 100.75, 103.16, 107.76, 105.54, then 106.72 ms." },
      { id: "100.75", text: "About 100.75 ms", why: "That is the value after the first sample only." },
      { id: "114.2", text: "About 114.2 ms", why: "That is the plain average of the five samples, which EWMA does not use." },
      { id: "110", text: "110 ms", why: "This does not follow from the EWMA updates." },
      { id: "115", text: "115 ms", why: "That is just the last sample." }
    ]
  },
  {
    id: "tcp-17", topic: "tcp", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 P28",
    q: "Host A can write into its TCP socket at 120 Mbps, the link is 100 Mbps, and Host B's application reads from its receive buffer at only 50 Mbps. What limits the long-run transfer rate?",
    options: [
      { id: "50", correct: true, text: "50 Mbps, B's read rate, because TCP flow control holds A to what B can consume", why: "The receive window shrinks as B's buffer fills, holding A to B's pace." },
      { id: "120", text: "120 Mbps, A's write rate", why: "The link and the receiver are both slower than A." },
      { id: "100", text: "100 Mbps, the link rate, since the link is the slowest part", why: "The receiver is the bottleneck, and flow control enforces its rate." },
      { id: "25", text: "25 Mbps, half of B's read rate", why: "Flow control matches B's rate; it does not halve it." },
      { id: "170", text: "170 Mbps, since the two host rates add together end to end", why: "Rates in series do not add." }
    ]
  },
  {
    id: "tcp-18", topic: "tcp", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 R17",
    q: "Two TCP connections share a bottleneck link of rate R. Both start transferring huge files at the same time. What rate should each ideally get?",
    options: [
      { id: "quarter", text: "R/4", why: "With two connections, each fair share is half the link." },
      { id: "first-wins", text: "R for whichever started first, 0 for the other", why: "Both started together, and TCP aims to share fairly." },
      { id: "double", text: "2R", why: "No connection can exceed the bottleneck rate." },
      { id: "half", correct: true, text: "R/2", why: "TCP congestion control aims for a fair share of the bottleneck." },
      { id: "full", text: "R", why: "Two connections cannot both use the full link at once." }
    ]
  },
  {
    id: "tcp-19", topic: "tcp", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 R18",
    q: "In TCP congestion control, what happens to ssthresh when the sender's timer expires?",
    options: [
      { id: "half-prev", text: "It is set to half of the previous ssthresh value.", why: "The new ssthresh is based on the current cwnd, not on the old ssthresh." },
      { id: "doubled", text: "It is doubled to speed up recovery.", why: "Loss makes TCP more cautious, not more aggressive." },
      { id: "half-cwnd", correct: true, text: "It is set to half of the current congestion window.", why: "On timeout, ssthresh = cwnd / 2 and cwnd restarts at 1 MSS. For example, a timeout at window 29 gives ssthresh 14." },
      { id: "one", text: "It is set to 1 MSS.", why: "It is cwnd that drops to 1 MSS on a timeout." },
      { id: "unchanged", text: "It stays the same; only cwnd changes.", why: "A timeout lowers ssthresh as well." }
    ]
  },
  {
    id: "tcp-20", topic: "tcp", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 P44a",
    q: "A connection with no loss uses only additive increase: cwnd grows by 1 MSS per RTT. How long does cwnd take to grow from 6 MSS to 12 MSS?",
    options: [
      { id: "six-rtts", correct: true, text: "6 RTTs", why: "One MSS per RTT: 12 − 6 = 6 RTTs." },
      { id: "three-rtts", text: "3 RTTs", why: "That would need 2 MSS per RTT." },
      { id: "one-rtt", text: "1 RTT", why: "Doubling in one RTT is slow-start behaviour, not additive increase." },
      { id: "two-rtts", text: "2 RTTs", why: "Additive increase adds only 1 MSS per RTT." },
      { id: "twelve-rtts", text: "12 RTTs", why: "cwnd starts at 6, so it only needs 6 more." }
    ]
  },
  {
    id: "tcp-21", topic: "tcp", pool: "quiz", source: "conceptual", multi: false,
    q: "Why does TCP not take a SampleRTT from a segment that was retransmitted?",
    options: [
      { id: "every", text: "TCP measures a SampleRTT for every segment, so one fewer does not matter.", why: "TCP measures only one SampleRTT at a time." },
      { id: "priority", text: "Retransmitted segments travel at a lower priority.", why: "Routers treat them like any other datagram." },
      { id: "ambiguous", correct: true, text: "Its ACK is ambiguous: it may be for the original or the resend.", why: "Measuring it could badly misjudge the RTT, so TCP ignores retransmissions." },
      { id: "udp", text: "Retransmissions are sent over UDP.", why: "TCP retransmits over the same TCP connection." },
      { id: "never-acked", text: "Retransmitted segments are never acknowledged.", why: "They are acknowledged like any other segment." }
    ]
  },
  {
    id: "tcp-22", topic: "tcp", pool: "quiz", source: "conceptual", multi: false,
    q: "What does the acknowledgment number in a TCP segment mean?",
    options: [
      { id: "segments", text: "The number of segments received so far.", why: "TCP counts bytes, not segments." },
      { id: "any", text: "The highest byte received so far, even if some bytes before it are still missing.", why: "Cumulative ACKs stop at the first missing byte." },
      { id: "window", text: "The number of bytes the receiver is still willing to accept into its buffer.", why: "That is the receive window field." },
      { id: "next", correct: true, text: "The next byte it expects to receive.", why: "TCP ACKs are cumulative: everything before that byte has arrived." },
      { id: "last-byte", text: "The sequence number of the last byte received.", why: "It is one past the last in-order byte." }
    ]
  },
  {
    id: "tcp-23", topic: "tcp", pool: "quiz", source: "conceptual", multi: false,
    q: "Why is the TCP RTT estimator called an exponentially weighted moving average?",
    options: [
      { id: "latest", text: "It always uses only the latest sample.", why: "Old samples still count, just with less weight." },
      { id: "constant", text: "It adds the same constant amount to the estimate every time a sample arrives.", why: "The update is a weighted average." },
      { id: "exponents", text: "It raises SampleRTT to a power.", why: "The formula is a weighted sum, with no powers of SampleRTT." },
      { id: "doubles", text: "It doubles the estimate after each sample so that it reacts quickly.", why: "Doubling happens to the timeout after a timeout, not to EstimatedRTT." },
      { id: "decay", correct: true, text: "Each update multiplies the old estimate by (1 − α), so the weight of older samples decays exponentially.", why: "Every update multiplies the old estimate by (1 − α)." }
    ]
  },
  {
    id: "tcp-24", topic: "tcp", pool: "exam", source: "conceptual", multi: false,
    q: "What limits how much application data TCP puts in one segment?",
    options: [
      { id: "udp", text: "The UDP length field", why: "TCP segments have no UDP header." },
      { id: "rwnd", text: "The receive window field alone", why: "rwnd limits unacknowledged bytes, not one segment's size." },
      { id: "seq", text: "The size of the 32-bit sequence number field in the header", why: "The 32-bit field limits the byte numbering range, not segment size." },
      { id: "app-write", text: "Exactly the number of bytes passed in each `send()` call by the app", why: "TCP is a byte stream; it can split or merge the application's writes." },
      { id: "mss", correct: true, text: "The maximum segment size, which is based on the link-layer MTU (1,500 bytes for Ethernet)", why: "TCP divides send-buffer data into segments no larger than the MSS, which comes from the link MTU (1,500 bytes for Ethernet)." }
    ]
  },
  {
    id: "tcp-25", topic: "tcp", pool: "quiz", source: "conceptual", multi: true,
    q: "Which events make the TCP sender act on its timer?",
    options: [
      { id: "per-segment", text: "Each new segment: start its own separate timer.", why: "TCP uses one timer for the oldest unacknowledged segment." },
      { id: "data", correct: true, text: "Data from the application, when no timer is running: start the timer.", why: "The timer is for the oldest unacknowledged segment." },
      { id: "timeout", correct: true, text: "A timeout: retransmit the segment that caused it and restart the timer.", why: "This is TCP's basic loss recovery." },
      { id: "dup-ack", text: "Every single duplicate ACK: retransmit right away.", why: "Fast retransmit waits for three duplicate ACKs." },
      { id: "new-ack", correct: true, text: "An ACK above SendBase: update SendBase and restart the timer if data is still unacknowledged.", why: "New data has been acknowledged." }
    ]
  }
);
