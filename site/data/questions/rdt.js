window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(
  {
    id: "rdt-01", topic: "rdt", pool: "quiz", source: "inclass", multi: false, ref: "In-class Set 3 Q1",
    q: "A sender sends five identical copies of a message, then declares success. The channel may corrupt data. The receiver detects every corrupted copy but cannot send feedback. Which statement is correct?",
    options: [
      { id: "certain", text: "Successful receipt is certain; only the arrival order is unknown.", why: "Every copy might be corrupted, so receipt is not certain." },
      { id: "auto-request", text: "Because the receiver detects corruption, it can request another copy.", why: "The receiver cannot send feedback in this scenario, so it cannot request anything." },
      { id: "no-feedback", text: "Detecting corruption removes the need for feedback.", why: "Detection happens at the receiver; the sender still needs feedback to know the result." },
      { id: "exactly-one", text: "Reliable delivery requires exactly one transmission per message.", why: "Reliable protocols retransmit as needed; the number of transmissions is not fixed." },
      { id: "cannot-confirm", correct: true, text: "The sender cannot confirm that any uncorrupted copy arrived.", why: "Without feedback, the sender has no way to learn the receiver's state. All five copies could have been corrupted." }
    ]
  },
  {
    id: "rdt-02", topic: "rdt", pool: "quiz", source: "inclass", multi: true, ref: "In-class Set 3 Q2",
    q: "A receiver accepts an uncorrupted packet, delivers its data and sends an ACK. The sender detects corruption in the returning feedback and has no other information. Which statements are justified?",
    options: [
      { id: "app-has", correct: true, text: "The receiver's application can already have the data while the sender lacks usable confirmation.", why: "The receiver and sender only know each other's state through feedback, and this feedback was garbled." },
      { id: "consider", correct: true, text: "A correct recovery design must consider that the data was already delivered.", why: "That is why rdt2.1 adds sequence numbers: a retransmission might be a duplicate." },
      { id: "retx-dup", correct: true, text: "A retransmission may be needed, and the receiver must recognize the duplicate and not deliver it again.", why: "The sender retransmits; the receiver uses the sequence number to detect and discard the duplicate." },
      { id: "treat-ack", text: "The sender should treat the corrupted feedback as an ACK and move on to send the next new packet right away.", why: "Corrupted feedback might have been a NAK, so moving on could lose the data." },
      { id: "undo", text: "The receiver must undo its application delivery until the sender gets usable feedback.", why: "Delivery to the upper layer cannot be undone. The protocol must instead avoid delivering the data a second time." }
    ]
  },
  {
    id: "rdt-03", topic: "rdt", pool: "quiz", source: "inclass", multi: true, ref: "In-class Set 3 Q3",
    q: "A receiver delivers a packet's data and sends an ACK. It then assumes the sender knows delivery succeeded, but the ACK may be lost or corrupted. Which statements are correct?",
    options: [
      { id: "send-proves", text: "Completing the ACK send operation proves that the ACK reached the sender.", why: "udt_send only hands the ACK to an unreliable channel." },
      { id: "dup-retx", correct: true, text: "A lost ACK can make the sender retransmit data the receiver already delivered.", why: "With no ACK, the sender times out and resends, so the receiver must detect the duplicate." },
      { id: "still-waiting", correct: true, text: "The sender may still be waiting for confirmation after the receiver has delivered the data.", why: "The two sides' views can differ until feedback gets through." },
      { id: "not-proof", correct: true, text: "Sending an ACK does not prove that the sender received it uncorrupted.", why: "The channel can corrupt or lose the ACK after it leaves the receiver." },
      { id: "corrupt-ok", text: "A corrupted ACK confirms delivery just as reliably as an uncorrupted ACK.", why: "The sender cannot trust a corrupted ACK; it might have been something else." }
    ]
  },
  {
    id: "rdt-04", topic: "rdt", pool: "quiz", source: "inclass", multi: false, ref: "In-class Set 3 Q4",
    q: "An application submits one message with rdt_send. The sender transmits it three times with udt_send. The receiver gets two uncorrupted copies and one corrupted copy. Which receiver action gives the intended reliable service?",
    options: [
      { id: "one-copy", correct: true, text: "Deliver one uncorrupted copy and discard the duplicate and corrupted copies.", why: "Reliable service delivers each submitted message exactly once, uncorrupted." },
      { id: "all-three", text: "Deliver all three copies and let the application handle corruption and duplicates.", why: "Hiding corruption and duplicates is the reliable protocol's job." },
      { id: "repair", text: "Repair the corrupted copy using the checksum, then deliver it.", why: "A checksum detects errors but cannot repair them." },
      { id: "first-new", text: "Deliver the first uncorrupted copy and treat the second as a new message.", why: "The second copy is a duplicate of the same message; treating it as new would deliver it twice." },
      { id: "both", text: "Deliver both uncorrupted copies, because each arrival is a separate message.", why: "There was only one rdt_send; extra copies are retransmissions." }
    ]
  },
  {
    id: "rdt-05", topic: "rdt", pool: "quiz", source: "inclass", multi: false, ref: "In-class Set 3 Q5 (messages renamed M1 and M2)",
    q: "An application sends message M1, then message M2. Both packets arrive without corruption, but M2 arrives first. Which receiver action keeps the original delivery order without requiring retransmission?",
    options: [
      { id: "resubmit", text: "Deliver M1 when it arrives, but require a new application submission before delivering the retained M2.", why: "M2 arrived intact; asking the application to resubmit it is unnecessary." },
      { id: "buffer", correct: true, text: "Retain M2, then deliver M1 followed by M2 when M1 arrives.", why: "Buffering the out-of-order packet and delivering in order is what the Selective Repeat receiver does." },
      { id: "reject", text: "Reject M2 permanently, because receiving M1 later cannot restore the original order.", why: "Holding M2 lets the receiver restore the order with no retransmission." },
      { id: "m2-nak", text: "Deliver M2 immediately and send a NAK so the sender resends M1.", why: "Delivering M2 first breaks the order the application sent in." },
      { id: "m2-first", text: "Deliver M2 immediately, then deliver M1 and M2 together when M1 arrives.", why: "Delivering M2 first breaks the order, and delivering M2 again duplicates it." }
    ]
  },
  {
    id: "rdt-06", topic: "rdt", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "The receiving application gets every message once, in order. But a Wireshark capture shows corrupted packets and repeated transmissions. Does the capture contradict the claim of reliable service?",
    options: [
      { id: "unreliable-app", text: "It shows that the application itself must detect the repeated packets and remove the duplicates.", why: "The application received each message once, so the protocol handled them." },
      { id: "wireshark-wrong", text: "Yes, unless Wireshark itself corrupted the packets.", why: "Corruption and retransmission on the wire are normal for a reliable protocol." },
      { id: "only-tcp", text: "No, but only because TCP never retransmits.", why: "TCP does retransmit; that is part of how it is reliable." },
      { id: "yes", text: "Yes: reliable service means that no packet on the channel is ever corrupted or repeated.", why: "Reliability is an illusion built on an unreliable channel." },
      { id: "no", correct: true, text: "No; reliability is judged by what the app receives.", why: "The protocol detects corruption, retransmits and blocks duplicates while hiding these problems." }
    ]
  },
  {
    id: "rdt-07", topic: "rdt", pool: "quiz", source: "inclass", multi: true, ref: "Lecture discussion question",
    q: "A sender transmitted a packet and has received no reply yet. Which statements are correct?",
    options: [
      { id: "delayed", correct: true, text: "The data or the reply may simply still be delayed.", why: "A delayed packet looks the same as a lost one for a while." },
      { id: "reply-lost", correct: true, text: "The receiver's reply may have been lost.", why: "The receiver may have the data and its ACK was lost." },
      { id: "unjustified", correct: true, text: "Declaring the data lost right away is unjustified.", why: "The sender only observes missing feedback; it cannot tell which event happened." },
      { id: "no-data", text: "The receiver definitely does not have the data.", why: "If only the reply was lost, the receiver does have the data." },
      { id: "data-lost", correct: true, text: "The data packet may have been lost.", why: "One of the three channel events that produce silence." }
    ]
  },
  {
    id: "rdt-08", topic: "rdt", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "An rdt1.0 receiver gets the same correct packet twice because the channel unexpectedly duplicates it. Why can it not safely decide the second one is a duplicate by comparing data values?",
    options: [
      { id: "acks", text: "rdt1.0 would first need an ACK from the sender.", why: "rdt1.0 uses no ACKs or NAKs at all." },
      { id: "memory", text: "The receiver forgets each packet as soon as it is delivered, so it has nothing to compare.", why: "Memory is not the issue; even a remembered value cannot prove a duplicate." },
      { id: "same-data", correct: true, text: "The app may really send identical data twice, and rdt1.0 has no way to tell copies apart.", why: "Equal data does not separate a repeat from a new identical message; rdt1.0 has no sequence numbers." },
      { id: "checksum", text: "rdt1.0 packets have checksums that differ on every copy.", why: "rdt1.0 assumes a perfect channel and has no checksums." },
      { id: "order", text: "Duplicates always arrive out of order, and rdt1.0 rejects any packet that arrives out of order.", why: "rdt1.0 does not check ordering, and the duplicate may arrive right after the original." }
    ]
  },
  {
    id: "rdt-09", topic: "rdt", pool: "exam", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "An rdt2.1 sender gets corrupted feedback for packet 0 and retransmits the same data labelled as sequence number 1. When does this cause duplicate delivery?",
    options: [
      { id: "both-corrupt", text: "Only when both copies of the data are corrupted.", why: "Corrupted data is never delivered." },
      { id: "loss", text: "Only when the retransmitted copy itself is lost on the way, so the receiver never sees the second copy.", why: "A lost packet cannot be delivered at all." },
      { id: "already", correct: true, text: "If packet 0 was delivered and its ACK corrupted, the receiver now expects 1 and takes the copy as new.", why: "Retransmissions must keep their original sequence number." },
      { id: "nak", text: "Only when the corrupted feedback was a NAK.", why: "If it was a NAK, the receiver still expects 0 and discards the packet labelled 1 as a duplicate." },
      { id: "never", text: "Never, because any change of sequence number already marks the packet as a retransmission to the receiver.", why: "The sequence number is how the receiver tells new from old, so changing it misleads the receiver." }
    ]
  },
  {
    id: "rdt-10", topic: "rdt", pool: "quiz", source: "inclass", multi: false,
    q: "In rdt2.0, the sender receives a garbled ACK/NAK and simply retransmits the current packet. What problem does this cause, and how does rdt2.1 fix it?",
    options: [
      { id: "order-buffer", text: "Packets arrive out of order on the channel; rdt2.1 adds a receive buffer to put them back in order.", why: "rdt2.x channels deliver in order; buffering out-of-order packets is Selective Repeat." },
      { id: "loss-timer", text: "The packet may be lost; rdt2.1 adds a countdown timer.", why: "Timers arrive in rdt3.0, for lossy channels." },
      { id: "ecc", text: "ACKs can't be read reliably; rdt2.1 adds error-correcting codes to every ACK and NAK packet.", why: "Error correction was one possible fix the lecture rejects; rdt2.1 uses sequence numbers." },
      { id: "dup-seq", correct: true, text: "The receiver can't tell a resend from new data; rdt2.1 adds a 1-bit sequence number.", why: "With sequence numbers 0 and 1, the receiver detects duplicates of the last packet." },
      { id: "nak-free", text: "NAKs get lost; rdt2.1 removes NAKs entirely.", why: "rdt2.2 is the NAK-free version; rdt2.1 still uses NAKs." }
    ]
  },
  {
    id: "rdt-11", topic: "rdt", pool: "exam", source: "inclass", multi: false,
    q: "An rdt2.2 sender has sent packet 1 and is waiting for ACK1. It receives an uncorrupted ACK0. What does it do?",
    options: [
      { id: "retx-0", text: "It retransmits packet 0.", why: "Packet 0 was already acknowledged earlier." },
      { id: "ignore-wait", text: "It ignores ACK0 and keeps waiting for ACK1 without doing anything else.", why: "rdt2.2 has no timer; ignoring the ACK would stall. (rdt3.0 ignores it and relies on a timeout.)" },
      { id: "send-nak", text: "It sends a NAK back to the receiver.", why: "Senders do not send NAKs, and rdt2.2 has no NAKs at all." },
      { id: "retx-1", correct: true, text: "It resends packet 1.", why: "In rdt2.2, an ACK for the previous packet means the current one was not received correctly." },
      { id: "send-next", text: "It sends the next new packet with sequence number 0, since an ACK has arrived.", why: "Packet 1 has not been acknowledged yet." }
    ]
  },
  {
    id: "rdt-12", topic: "rdt", pool: "quiz", source: "inclass", multi: true,
    q: "In rdt3.0, ACK1 for packet 1 is only delayed, and the sender's timer goes off before it arrives. Which statements are correct?",
    options: [
      { id: "detect-dup", correct: true, text: "The receiver detects the duplicate by its sequence number and sends ACK1 again.", why: "The receiver expects 0 next, so packet 1 is a duplicate; it re-ACKs and discards it." },
      { id: "ignore-ack", correct: true, text: "Once the sender has moved on to packet 0, it ignores the extra ACK1.", why: "While waiting for ACK0, an ACK1 is ignored." },
      { id: "retx", correct: true, text: "The sender retransmits packet 1 even though it was received.", why: "A premature timeout looks the same to the sender as a loss." },
      { id: "needs-nak", text: "The protocol breaks unless NAKs are added back.", why: "rdt3.0 handles premature timeouts correctly without NAKs." },
      { id: "deliver-twice", text: "The receiver delivers packet 1 to the application twice.", why: "Sequence numbers stop duplicate delivery." }
    ]
  },
  {
    id: "rdt-13", topic: "rdt", pool: "exam", source: "inclass", multi: false,
    q: "Stop-and-wait rdt3.0 runs on a 1 Gbps link with a 30 ms RTT and 8,000-bit packets. What is the sender's utilization?",
    options: [
      { id: "0.27", text: "About 0.27", why: "The sender is idle for almost the whole RTT, so utilization is tiny." },
      { id: "one", text: "1.0", why: "Stop-and-wait leaves the sender idle while it waits for each ACK." },
      { id: "0.00081", text: "About 0.00081", why: "That is utilization with 3-packet pipelining, not stop-and-wait." },
      { id: "0.027", text: "About 0.027", why: "This is 100 times too large; check the conversion of 8 µs to ms." },
      { id: "0.00027", correct: true, text: "About 0.00027", why: "L/R = 8 µs = 0.008 ms. U = 0.008 / (30 + 0.008) ≈ 0.00027." }
    ]
  },
  {
    id: "rdt-14", topic: "rdt", pool: "quiz", source: "inclass", multi: true,
    q: "A stop-and-wait protocol is changed to a pipelined one so the sender can have several packets in flight. What does this require?",
    options: [
      { id: "sender-buf", correct: true, text: "Sender buffering of unacknowledged packets for possible retransmission.", why: "The sender must keep copies until they are ACKed." },
      { id: "no-acks", text: "Removing ACKs, since the pipeline is always full.", why: "ACKs are still needed to slide the window and confirm delivery." },
      { id: "seq-range", correct: true, text: "A larger sequence number range, so each unacknowledged packet is unique.", why: "One bit is no longer enough when several packets are outstanding." },
      { id: "recv-buf", correct: true, text: "In some designs, receiver buffering of correct out-of-order packets.", why: "Selective Repeat buffers out-of-order packets." },
      { id: "no-timers", text: "Removing timers, since with many packets in flight a loss can always be spotted by the gap instead.", why: "Losses still happen, so timers are still needed." }
    ]
  },
  {
    id: "rdt-15", topic: "rdt", pool: "quiz", source: "inclass", multi: true,
    q: "Go-Back-N with N = 4 sends packets 0 to 5. Packet 2 is lost; everything else arrives. Which statements match the lecture's example?",
    options: [
      { id: "resend-all", correct: true, text: "When packet 2's timer expires, the sender resends packets 2, 3, 4 and 5.", why: "timeout(n) retransmits packet n and all later packets in the window." },
      { id: "dup-ack", correct: true, text: "The sender ignores the duplicate ACK1s.", why: "Duplicate cumulative ACKs do not move the window." },
      { id: "only-2", text: "The sender resends only packet 2.", why: "Only Selective Repeat resends just the missing packet." },
      { id: "buffer", text: "The receiver buffers 3, 4 and 5 and delivers them right after packet 2.", why: "That is what the Selective Repeat receiver does." },
      { id: "discard", correct: true, text: "The receiver discards packets 3, 4 and 5 and sends ACK1 again for each.", why: "The GBN receiver ACKs the highest in-order packet and, in this example, discards out-of-order ones." }
    ]
  },
  {
    id: "rdt-16", topic: "rdt", pool: "exam", source: "inclass", multi: false,
    q: "Selective Repeat with N = 4: packet 2 was lost, and packets 3, 4 and 5 were buffered and ACKed. The sender resends 2, and the receiver delivers 2 to 5 and sends ACK2. What happens when ACK2 reaches the sender?",
    options: [
      { id: "cumulative", text: "ACK2 is treated as a cumulative ACK for 0 to 2 only, and 3 to 5 must be ACKed again.", why: "SR ACKs are individual, and 3 to 5's ACKs were already recorded." },
      { id: "slide-3", text: "send_base moves to 3, and packets 3 to 5 are resent.", why: "Packets 3 to 5 were already individually ACKed, so they are not resent." },
      { id: "slide-6", correct: true, text: "Packet 2 is marked ACKed; since 3 to 5 are already ACKed, send_base moves to 6.", why: "The window moves forward to the next unacknowledged packet, so new packets can be sent." },
      { id: "ignore", text: "The sender ignores ACK2 because packet 2 was a retransmission and its ACK can't be trusted.", why: "ACKs for retransmitted packets in the window are processed normally." },
      { id: "timeout", text: "The sender waits for another timeout before moving the window.", why: "The ACK for send_base moves the window immediately." }
    ]
  },
  {
    id: "rdt-17", topic: "rdt", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 R9",
    q: "Why do the reliable data transfer protocols need sequence numbers?",
    options: [
      { id: "compress", text: "To compress the data", why: "They add bits rather than removing them." },
      { id: "ip", text: "To identify the host's IP address", why: "IP addresses are in the IP header." },
      { id: "encrypt", text: "To encrypt the data", why: "Sequence numbers provide no secrecy." },
      { id: "loss", text: "To detect that a packet was lost in transit", why: "Loss is detected with timers; sequence numbers handle duplicates and order." },
      { id: "dup", correct: true, text: "To detect duplicate and out-of-order packets", why: "Sequence numbers let the receiver tell a new packet from a retransmission." }
    ]
  },
  {
    id: "rdt-18", topic: "rdt", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 R11",
    q: "The round-trip delay is constant and known to the sender, and packets can be lost. Is a timer still needed in rdt3.0?",
    options: [
      { id: "no-loss", text: "No: packet losses cannot happen on a channel whose round-trip time is constant and known.", why: "Known delay says nothing about loss." },
      { id: "receiver", text: "Only at the receiver, not at the sender.", why: "The sender is the one that must retransmit after a loss." },
      { id: "nak", text: "Only if the receiver sends NAKs.", why: "A lost packet produces no NAK at all." },
      { id: "no-wait", text: "No: the sender can simply wait one known RTT and then assume the packet arrived.", why: "If the packet was lost, assuming success loses data." },
      { id: "yes", correct: true, text: "Yes, to detect losses.", why: "Knowing the RTT tells you how long to wait; something must still fire when the wait is over." }
    ]
  },
  {
    id: "rdt-19", topic: "rdt", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 P13",
    q: "Why does the alternating-bit protocol fail on a channel that can reorder messages?",
    options: [
      { id: "no-ack", text: "The receiver cannot send ACKs on a reordering channel, so the sender never learns anything.", why: "ACKs can be sent; they can also be reordered." },
      { id: "unused", text: "Sequence bits are not used at all when packets are reordered, so the receiver ignores them.", why: "The bits are used; there are just too few of them." },
      { id: "timer", text: "Timers stop working when packets are reordered.", why: "Timers still fire; the problem is matching old copies to new data." },
      { id: "lost", text: "Reordering always causes data to be lost.", why: "Reordered packets still arrive; the danger is misidentifying them." },
      { id: "old", correct: true, text: "A late old copy looks like a new one.", why: "With only 0 and 1, a delayed old copy is indistinguishable from the current one." }
    ]
  },
  {
    id: "rdt-20", topic: "rdt", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 P14",
    q: "A sender only sends data occasionally. Which works better: a NAK-only protocol or an ACK-based protocol?",
    options: [
      { id: "nak-loss", text: "NAK-only, because NAK packets are never lost or corrupted on the way back to the sender.", why: "Any packet can be lost." },
      { id: "ack", correct: true, text: "ACK-based: a NAK-only receiver can't notice a lost last packet when nothing follows it.", why: "A NAK-only receiver detects a gap only when a later packet arrives." },
      { id: "same", text: "They are always equivalent.", why: "They behave very differently with sparse traffic." },
      { id: "neither", text: "Neither works for occasional senders.", why: "ACK-based protocols work fine with sparse traffic." },
      { id: "nak-fewer", text: "NAK-only, because it sends far fewer feedback messages when traffic is light and sparse.", why: "Fewer messages does not help if losses go unnoticed." }
    ]
  },
  {
    id: "rdt-21", topic: "rdt", pool: "exam", source: "textbook", multi: false, ref: "Textbook Ch. 3 P15",
    q: "A link has a 30 ms RTT and 1 Gbps rate, and packets are 1,500 bytes. About how many packets must be in flight to keep utilization above 98 percent?",
    options: [
      { id: "2451", correct: true, text: "About 2,451", why: "L/R = 12,000 bits / 1 Gbps = 12 µs. N ≥ 0.98 × (30 ms + 12 µs) / 12 µs ≈ 2,451." },
      { id: "24510", text: "About 24,510", why: "This is 10 times too large." },
      { id: "2501", text: "About 2,501", why: "That is the window for 100 percent utilization; 98 percent needs about 2,451." },
      { id: "245", text: "About 245", why: "This is 10 times too small; check that L/R is 12 µs." },
      { id: "25", text: "About 25", why: "Far too few packets to fill a 30 ms pipe at 1 Gbps." }
    ]
  },
  {
    id: "rdt-22", topic: "rdt", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 P24",
    q: "Which statement about the alternating-bit protocol is true?",
    options: [
      { id: "sr-2", text: "It is the same as Selective Repeat with a window size of 2, and not like Go-Back-N.", why: "A window of 2 allows two outstanding packets, unlike stop-and-wait." },
      { id: "never-gbn", text: "It is never the same as Go-Back-N, because GBN always uses a window larger than one.", why: "GBN with N = 1 behaves exactly like the alternating-bit protocol." },
      { id: "window-4", text: "It uses a window size of 4.", why: "It is stop-and-wait: one packet at a time." },
      { id: "window-1", correct: true, text: "It matches Selective Repeat with window size 1 and Go-Back-N with window size 1.", why: "With one outstanding packet and sequence numbers 0 and 1, all three behave the same." },
      { id: "no-seq", text: "It uses no sequence numbers at all.", why: "It alternates between sequence numbers 0 and 1." }
    ]
  },
  {
    id: "rdt-23", topic: "rdt", pool: "quiz", source: "conceptual", multi: false,
    q: "What does rdt1.0 assume about the underlying channel?",
    options: [
      { id: "errors", text: "It can flip bits inside packets, but it never loses any packets.", why: "That is rdt2.x's channel model." },
      { id: "acks", text: "It delivers ACKs reliably but not data.", why: "rdt1.0 uses no ACKs at all." },
      { id: "reorder", text: "It can reorder packets but never corrupts or loses any of them.", why: "None of rdt1.0 to rdt3.0 assumes reordering." },
      { id: "lossy", text: "It can lose packets and flip bits.", why: "That is rdt3.0's channel model." },
      { id: "perfect", correct: true, text: "It is perfectly reliable: no bit errors and no packet loss.", why: "So the sender just sends and the receiver just delivers." }
    ]
  },
  {
    id: "rdt-24", topic: "rdt", pool: "quiz", source: "conceptual", multi: true,
    q: "Which descriptions of the rdt interface functions are correct?",
    options: [
      { id: "rdt-rcv", correct: true, text: "`rdt_rcv()` is called when a packet arrives at the receiver's channel.", why: "It is the event that drives the receiver's FSM." },
      { id: "rdt-send", correct: true, text: "`rdt_send()` is called from above to pass data for delivery.", why: "The application hands its data to the reliable protocol." },
      { id: "deliver", correct: true, text: "`deliver_data()` is called by rdt to give data to the upper layer.", why: "Delivery goes up to the receiving process." },
      { id: "deliver-sender", text: "`deliver_data()` is called by the sender's app to submit new data.", why: "Submitting data is rdt_send(); deliver_data() is the receiver side." },
      { id: "udt-send", correct: true, text: "`udt_send()` is called by rdt to put a packet on the unreliable channel.", why: "udt means unreliable data transfer." }
    ]
  },
  {
    id: "rdt-25", topic: "rdt", pool: "quiz", source: "conceptual", multi: true,
    q: "Which statements describe the Go-Back-N sender?",
    options: [
      { id: "cumulative", correct: true, text: "ACK(n) is cumulative and confirms all packets up to n.", why: "The window then slides to n + 1." },
      { id: "one-timer", correct: true, text: "It uses one timer for the oldest unacknowledged packet.", why: "On timeout it resends that packet and all later ones in the window." },
      { id: "window", correct: true, text: "It allows at most N unacknowledged packets in flight.", why: "N is the window size." },
      { id: "individual", text: "Each packet is acknowledged individually and out of order.", why: "Individual ACKs belong to Selective Repeat." },
      { id: "per-packet", text: "Each packet has its own logical timer.", why: "Per-packet timers belong to Selective Repeat." }
    ]
  },
  {
    id: "rdt-26", topic: "rdt", pool: "quiz", source: "conceptual", multi: true,
    q: "Which statements describe Selective Repeat?",
    options: [
      { id: "individual", correct: true, text: "Each correctly received packet is acknowledged individually.", why: "SR uses selective ACKs." },
      { id: "goback", text: "A timeout resends every packet in the window.", why: "That is Go-Back-N; SR resends only the timed-out packet." },
      { id: "reack", correct: true, text: "The receiver re-ACKs packets in [rcv_base − N, rcv_base − 1] it already received.", why: "This covers ACKs that were lost." },
      { id: "only-lost", correct: true, text: "Only lost or corrupted packets are retransmitted.", why: "That is SR's improvement over GBN." },
      { id: "buffer", correct: true, text: "The receiver buffers out-of-order packets until the missing ones arrive.", why: "It then delivers them in order." }
    ]
  },
  {
    id: "rdt-27", topic: "rdt", pool: "exam", source: "conceptual", multi: false,
    q: "Selective Repeat uses sequence numbers 0 to 3 with a window of 3. In one run all ACKs are lost; in another all arrive. The receiver behaves the same and accepts a packet numbered 0 as new data. What rule prevents this?",
    options: [
      { id: "half", correct: true, text: "The window size must be at most half the size of the sequence number space, here at most 2.", why: "With 4 numbers, the window must be at most 2, so old and new windows never overlap." },
      { id: "k-minus-1", text: "The window size must be at most one less than the sequence number space.", why: "That is the Go-Back-N limit; a window of 3 here already meets it and still fails." },
      { id: "equal", text: "The window size must equal the sequence number space so every number is in use.", why: "A bigger window makes the ambiguity worse." },
      { id: "nak", text: "The receiver must send NAKs instead of ACKs.", why: "Lost NAKs would cause the same confusion." },
      { id: "timer", text: "The receiver must use a longer timer.", why: "The receiver cannot see the sender's side; timers do not remove the ambiguity." }
    ]
  },
  {
    id: "rdt-28", topic: "rdt", pool: "quiz", source: "conceptual", multi: false,
    q: "In the lecture's summary table, which is the first protocol that handles packet loss?",
    options: [
      { id: "rdt21", text: "rdt2.1", why: "rdt2.1 adds sequence numbers for corrupted ACK/NAKs but not loss." },
      { id: "rdt10", text: "rdt1.0", why: "rdt1.0 assumes a perfect channel." },
      { id: "rdt22", text: "rdt2.2", why: "rdt2.2 handles bit errors with duplicate ACKs but not loss." },
      { id: "rdt20", text: "rdt2.0", why: "rdt2.0 handles bit errors only." },
      { id: "rdt30", correct: true, text: "rdt3.0", why: "rdt3.0 adds timeout-based retransmission to handle lossy channels." }
    ]
  }
);
