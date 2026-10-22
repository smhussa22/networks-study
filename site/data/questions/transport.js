window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(
  {
    id: "transport-01", topic: "transport", pool: "quiz", source: "inclass", multi: false, ref: "In-class Set 2 Q4",
    q: "Two UDP services run on one host. What lets a datagram reach the intended service?",
    options: [
      { id: "source-only", text: "The sender's source port without a destination port.", why: "The source port is a return address; the receiver demultiplexes on the destination port." },
      { id: "client-recv", text: "The source port used by the client's receiving socket.", why: "That is where replies go; it does not choose the server's service." },
      { id: "length", text: "The length field in the UDP header.", why: "The length field gives the segment's size, not which service should get it." },
      { id: "dest-port-ip", correct: true, text: "The destination port together with the host's IP address.", why: "A UDP socket is identified by (destination IP, destination port): the IP picks the host, the port picks the service." },
      { id: "source-ip-port", text: "The source IP address and source port alone.", why: "Datagrams from many sources reach the same socket; the source fields do not choose the service." }
    ]
  },
  {
    id: "transport-02", topic: "transport", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "A client switches from UDP to TCP and tries to connect, but the server still uses only a UDP socket. IP datagrams still travel between the two hosts. Can they exchange application messages?",
    options: [
      { id: "yes-port", text: "Yes, as long as both use the same port number.", why: "A TCP port and a UDP port are separate namespaces; matching numbers do not help." },
      { id: "yes-ip", text: "Yes, because IP datagrams still reach the server's host.", why: "Reaching the host is not enough; the transport protocols must match." },
      { id: "after-retry", text: "Only after the client retransmits its SYN enough times for the server to notice it.", why: "Retrying cannot work while the server has no TCP listening socket." },
      { id: "no", correct: true, text: "No, the transport protocols do not match.", why: "IP connectivity gets packets to the host, but both applications must use compatible transport protocols." },
      { id: "router", text: "Yes, because routers on the path convert the client's TCP segments into UDP segments.", why: "Routers do not inspect or convert transport headers." }
    ]
  },
  {
    id: "transport-03", topic: "transport", pool: "exam", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "A TCP server has three connections: (A, 9157, B, 80), (C, 5775, B, 80) and (C, 9157, B, 80), each written as (source IP, source port, destination IP, destination port). A segment arrives with (A, 5775, B, 80). Where does it go?",
    options: [
      { id: "any", text: "To any of the three, since all three connections use the same destination port 80 on B.", why: "TCP demultiplexes on the full four-tuple, not only the destination port." },
      { id: "none", correct: true, text: "It matches none of them, since all four values must match one connection.", why: "Source IP A matches the first connection and port 5775 matches the second, but TCP cannot combine values from different connections." },
      { id: "first-conn", text: "To the first connection, since its source IP is host A.", why: "The source port 5775 does not match the first connection's 9157." },
      { id: "second-conn", text: "To the second connection, since the source port 5775 matches that connection's port.", why: "The source IP A does not match the second connection's C." },
      { id: "both", text: "To both the first and second connections.", why: "A segment goes to at most one socket, and here none matches." }
    ]
  },
  {
    id: "transport-04", topic: "transport", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "One client process connects to two server processes on different hosts using TCP. How many connections and client sockets does it need?",
    options: [
      { id: "one-one", text: "One connection and one socket shared by both servers.", why: "A TCP connection is point-to-point between exactly two endpoints." },
      { id: "two-one", text: "Two connections over a single client socket.", why: "Each connection is identified by its own four-tuple and needs its own socket." },
      { id: "two-process", text: "Two connections, but only if the client runs two processes, one for each server.", why: "One process can hold several connected sockets." },
      { id: "two-two", correct: true, text: "Two connections and two client sockets.", why: "Each server gets its own connection; one process can manage both sockets." },
      { id: "three", text: "Three sockets: two connected sockets plus one listening socket for the servers' replies.", why: "The client initiates; it does not need a listening socket." }
    ]
  },
  {
    id: "transport-05", topic: "transport", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "Does that client need a listening socket to talk with the two servers?",
    options: [
      { id: "no", correct: true, text: "No; it never accepts connections.", why: "Listening sockets accept incoming connections, which is the server side's job." },
      { id: "yes-each", text: "Yes, one listening socket per server.", why: "The client never accepts connections in this scenario." },
      { id: "os", text: "Yes, but the operating system creates it automatically when the client calls connect().", why: "No listening socket is created for a client that only connects." },
      { id: "yes-replies", text: "Yes, to receive the servers' replies.", why: "Replies arrive on the same connected socket the client used to connect." },
      { id: "udp", text: "Only if it switches both connections to UDP, which needs a listening socket for replies.", why: "UDP has no listening sockets at all." }
    ]
  },
  {
    id: "transport-06", topic: "transport", pool: "exam", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "A server has one listening socket and has accepted two TCP connections that are both still open. How many sockets does it have?",
    options: [
      { id: "four", text: "Four: two listening sockets and two connected sockets, one pair per client.", why: "One listening socket can accept any number of connections." },
      { id: "one", text: "One, since every accepted connection shares the server's single listening socket.", why: "Accepted connections get their own sockets." },
      { id: "three", correct: true, text: "Three: one listening socket and two connected sockets.", why: "Each accept() returns a separate connected socket, and the listening socket stays available." },
      { id: "six", text: "Six: three on each side of each connection.", why: "The question asks about the server only." },
      { id: "two", text: "Two, since the listening socket turns into the first connection.", why: "The listening socket keeps listening; it does not become a connection socket." }
    ]
  },
  {
    id: "transport-07", topic: "transport", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "Must a TCP server create a new process for every connection it accepts?",
    options: [
      { id: "yes", text: "Yes, TCP allows only one socket per process.", why: "A process can hold many sockets." },
      { id: "yes-port", text: "Yes, because each process must own a different port.", why: "All connection sockets share the server port; four-tuples tell them apart." },
      { id: "udp-only", text: "Only UDP servers can handle several clients from a single process; TCP servers cannot.", why: "TCP servers can too." },
      { id: "no", correct: true, text: "No, one process can handle many connected sockets.", why: "Both designs are possible; neither is required by TCP." },
      { id: "os", text: "Yes, the operating system forks a new process automatically every time accept() returns.", why: "accept() returns a socket; it does not create processes." }
    ]
  },
  {
    id: "transport-08", topic: "transport", pool: "quiz", source: "inclass", multi: true, ref: "Lecture discussion question",
    q: "Two clients connect to a TCP server on port 80, giving (A, 9157, B, 80), (C, 5775, B, 80) and (C, 9157, B, 80). Which statements are correct?",
    options: [
      { id: "port80", correct: true, text: "All three connections can use server port 80.", why: "The server does not need a different port per connection." },
      { id: "four-fields", correct: true, text: "TCP tells them apart using all four fields.", why: "The complete four-tuple must differ for each connection." },
      { id: "c-share", text: "C's two connections may share a source port, because the server tells them apart by destination port.", why: "C's connections are told apart only by their source ports, so those must differ." },
      { id: "share-9157", correct: true, text: "Host A and Host C can both use source port 9157, since their IPs differ.", why: "Different source IPs make the four-tuples different." },
      { id: "port81", text: "The second client must be moved to server port 81.", why: "Port 80 serves every connection." }
    ]
  },
  {
    id: "transport-09", topic: "transport", pool: "exam", source: "inclass", multi: false,
    q: "In the lecture's analogy, two houses on opposite coasts each have many kids. Ann and Bill collect and hand out the letters in their homes, and the postal service carries letters between houses. What do Ann and Bill represent?",
    options: [
      { id: "transport", correct: true, text: "The transport layer, which gives process-to-process delivery inside each host", why: "The kids are processes; Ann and Bill do multiplexing and demultiplexing at the end systems." },
      { id: "apps", text: "The application processes that write the letters", why: "The kids writing letters are the processes." },
      { id: "routers", text: "Routers in the network core", why: "Ann and Bill stay inside the houses, which are the end systems." },
      { id: "network", text: "The network layer, which moves letters from house to house across the country", why: "That is the postal service's role." },
      { id: "link", text: "The link layer, which carries letters between neighbouring post offices on the way", why: "Ann and Bill never leave the house." }
    ]
  },
  {
    id: "transport-10", topic: "transport", pool: "quiz", source: "inclass", multi: false,
    q: "A router on the path receives a datagram carrying a TCP segment. Which fields does it use to forward the datagram?",
    options: [
      { id: "payload", text: "The application message inside the segment", why: "Routers do not read application data." },
      { id: "ports", text: "The TCP source and destination ports", why: "Ports are for demultiplexing at the receiving end system." },
      { id: "network", correct: true, text: "Only network-layer fields in the datagram header", why: "Routers do not inspect transport-layer headers." },
      { id: "all", text: "Every header field from application down to link", why: "Routers process only the network, link and physical layers." },
      { id: "seq", text: "The TCP sequence number", why: "Sequence numbers are used by the TCP endpoints." }
    ]
  },
  {
    id: "transport-11", topic: "transport", pool: "quiz", source: "inclass", multi: true,
    q: "The network layer underneath gives no delay or bandwidth guarantees and can lose packets. Which statements about the transport layer above it are correct?",
    options: [
      { id: "security", text: "It cannot add encryption unless the network layer encrypts first.", why: "Transport can offer security services even when the network layer does not." },
      { id: "reserve", text: "It can guarantee bandwidth by reserving capacity in routers.", why: "Transport runs on end systems and cannot reserve router capacity." },
      { id: "reliable", correct: true, text: "It can still provide reliable data transfer.", why: "Transport can handle loss, corruption and duplication on its own." },
      { id: "no-delay", correct: true, text: "It cannot guarantee delay or bandwidth that the network does not provide.", why: "Transport services are limited by what the network layer offers." },
      { id: "ip-reliable", text: "Running TCP makes IP itself a reliable service.", why: "IP stays best effort; TCP builds reliability on top of it." }
    ]
  },
  {
    id: "transport-12", topic: "transport", pool: "quiz", source: "inclass", multi: false,
    q: "Hosts A and C both send UDP segments to port 6428 on host B, where one socket is bound to that port. What does B's transport layer do?",
    options: [
      { id: "handshake", text: "It asks each sender to perform a handshake first.", why: "UDP is connectionless." },
      { id: "drop-second", text: "It drops whichever segment arrives second.", why: "Both are delivered, and the process can tell them apart by source address." },
      { id: "by-source", text: "It routes each segment to a process chosen by its source port.", why: "Demultiplexing uses the destination port." },
      { id: "two-sockets", text: "It creates a second socket for the second sender.", why: "UDP does not create sockets per sender; that is a TCP accept() behaviour." },
      { id: "same-socket", correct: true, text: "It delivers both segments to the same socket.", why: "A UDP socket is identified by destination IP and port only, so different sources reach the same socket." }
    ]
  },
  {
    id: "transport-13", topic: "transport", pool: "quiz", source: "inclass", multi: false,
    q: "On a sending host, the transport layer gathers data from several sockets, adds a header with port numbers to each chunk, and passes the segments to the network layer. What is this called?",
    options: [
      { id: "routing", text: "Routing", why: "Routing chooses paths between hosts in the network core." },
      { id: "encap-link", text: "Link-layer framing", why: "Framing is done later by the link layer." },
      { id: "handshaking", text: "Handshaking", why: "Handshaking sets up connection parameters; it does not combine socket data." },
      { id: "mux", correct: true, text: "Multiplexing", why: "Multiplexing at the sender combines data from sockets and adds headers that later allow demultiplexing." },
      { id: "demux", text: "Demultiplexing", why: "Demultiplexing happens at the receiver, directing segments to the right socket." }
    ]
  },
  {
    id: "transport-14", topic: "transport", pool: "quiz", source: "inclass", multi: false,
    q: "How are UDP and TCP sockets identified when segments arrive?",
    options: [
      { id: "process-id", text: "Both by the ID number of the receiving process, which the OS writes into the header.", why: "Sockets are found from header fields, not OS process IDs." },
      { id: "both-two", text: "Both by (destination IP, destination port).", why: "TCP also uses the source IP and port, so each connection gets its own socket." },
      { id: "two-four", correct: true, text: "UDP by destination IP and port; TCP by source and destination IP and port.", why: "UDP uses a two-tuple; TCP uses the stricter four-tuple." },
      { id: "both-four", text: "Both by the full four-tuple.", why: "A UDP socket accepts segments from any source." },
      { id: "four-two", text: "UDP by the full four-tuple; TCP by (destination IP, destination port) only.", why: "This swaps the two protocols." }
    ]
  },
  {
    id: "transport-15", topic: "transport", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 R1a",
    q: "The network layer delivers segments to a host running many applications. What is the minimum information the transport layer needs to deliver data to the right process?",
    options: [
      { id: "checksum", text: "The segment's checksum only", why: "The checksum detects errors; it does not identify a process." },
      { id: "mac", text: "The destination MAC address", why: "MAC addresses are link-layer identifiers for network interfaces." },
      { id: "port", correct: true, text: "A port number for each process", why: "The destination port picks the socket, and so the process." },
      { id: "hostname", text: "The host's DNS name", why: "The segment has already reached the host; the port picks the process." },
      { id: "speed", text: "The physical link speed", why: "Link speed has nothing to do with choosing a process." }
    ]
  },
  {
    id: "transport-16", topic: "transport", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 R2",
    q: "In the house-and-family mail analogy, what corresponds to a port number?",
    options: [
      { id: "envelope", text: "The envelope", why: "The envelope is like the segment that carries the letter." },
      { id: "carrier", text: "The postal carrier who brings letters to the house", why: "The postal service plays the network layer." },
      { id: "stamp", text: "The postage stamp", why: "Nothing in the analogy maps the stamp to a port." },
      { id: "name", correct: true, text: "The name of the family member inside the house who should get the letter", why: "The house address picks the host; the person's name picks the process." },
      { id: "street", text: "The house's street address written on the envelope", why: "That corresponds to the IP address." }
    ]
  },
  {
    id: "transport-17", topic: "transport", pool: "exam", source: "textbook", multi: false, ref: "Textbook Ch. 3 R3",
    q: "Segments from Host A to Host B on a TCP connection use source port x and destination port y. What ports do segments from B to A use?",
    options: [
      { id: "x-y", text: "Source x, destination y", why: "Those are the A-to-B ports." },
      { id: "y-y", text: "Source y, destination y", why: "Segments to A must go to A's port, x." },
      { id: "plus-one", text: "Source x + 1, destination y + 1", why: "Ports do not change between directions; they swap." },
      { id: "zero", text: "Source 0, destination 0", why: "Port 0 is not used for an established connection." },
      { id: "y-x", correct: true, text: "Source y, destination x", why: "The ports reverse direction for the reply traffic." }
    ]
  },
  {
    id: "transport-18", topic: "transport", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 R7",
    q: "Host C has a UDP socket on port 6789. Hosts A and B each send a UDP segment to Host C, port 6789. What happens?",
    options: [
      { id: "drop", text: "The second segment is dropped.", why: "Both segments are delivered to the socket." },
      { id: "merge", text: "UDP merges the two segments into one message, since they share a destination port.", why: "UDP never combines messages; each datagram stays separate." },
      { id: "two", text: "Host C creates two sockets on port 6789.", why: "One UDP socket receives from any number of senders." },
      { id: "same", correct: true, text: "Both reach the same socket; the process tells them apart by source IP and port.", why: "UDP demultiplexes on destination IP and port; the source fields identify the senders." },
      { id: "different", text: "The two segments go to two different processes, one for each sending host.", why: "One socket belongs to one process here." }
    ]
  },
  {
    id: "transport-19", topic: "transport", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 3 P1f",
    q: "Two Telnet clients run on the same host and both connect to server S on port 23. Can they use the same source port number?",
    options: [
      { id: "udp", text: "Only if they use UDP.", why: "Telnet uses TCP, and the question is about TCP four-tuples." },
      { id: "no", correct: true, text: "No: with the same source IP and server port, their source ports must differ.", why: "Otherwise both connections would have the same four-tuple." },
      { id: "ipv6", text: "Only if both connections use IPv6 addresses, which allow repeated port numbers.", why: "IP version does not change the four-tuple rule." },
      { id: "server-port", text: "Yes, as long as the server gives each of the two connections a different server port.", why: "The server port stays 23 for both connections." },
      { id: "yes", text: "Yes, always.", why: "Identical four-tuples would make the connections impossible to tell apart." }
    ]
  },
  {
    id: "transport-20", topic: "transport", pool: "quiz", source: "conceptual", multi: false,
    q: "Which terminology does the lecture recommend for transport and network packets?",
    options: [
      { id: "message", text: "Message for every layer's packet.", why: "Message is the application-layer term." },
      { id: "packet", text: "Packet for TCP only, while UDP data units have no special name in the lecture.", why: "Both have names: segment, per the lecture." },
      { id: "frame", text: "Frame for TCP and segment for UDP.", why: "Frame is the link-layer term." },
      { id: "datagram", text: "Datagram for both TCP and UDP, while segment is kept for network-layer packets.", why: "This swaps the terms." },
      { id: "segment", correct: true, text: "Segment for both TCP and UDP; datagram is kept for network-layer packets.", why: "This avoids the confusion of calling UDP packets datagrams." }
    ]
  },
  {
    id: "transport-21", topic: "transport", pool: "exam", source: "conceptual", multi: false,
    q: "What range is reserved for well-known ports?",
    options: [
      { id: "1-80", text: "1 to 80", why: "The reserved range goes up to 1023." },
      { id: "1024-49151", text: "1024 to 49151", why: "That range is above the well-known ports." },
      { id: "0-1023", correct: true, text: "0 to 1023", why: "Well-known ports (0–1023) are reserved for common protocols such as HTTP 80 and FTP 21." },
      { id: "49152-up", text: "49152 to 65535", why: "Those high ports are typical for temporary client ports." },
      { id: "0-65535", text: "0 to 65535", why: "That is the full port range." }
    ]
  },
  {
    id: "transport-22", topic: "transport", pool: "quiz", source: "conceptual", multi: true,
    q: "Which services do both UDP and TCP add on top of IP?",
    options: [
      { id: "cc", text: "Congestion control that regulates the sending rate.", why: "UDP traffic is unregulated; only TCP has congestion control." },
      { id: "handshake", text: "A handshake before data is sent.", why: "UDP is connectionless." },
      { id: "mux", correct: true, text: "Process-to-process delivery through multiplexing and demultiplexing.", why: "Both extend IP's host-to-host delivery to processes." },
      { id: "error-check", correct: true, text: "Error checking with an error-detection field in the header.", why: "Both headers carry a checksum." },
      { id: "reliable", text: "Reliable, in-order delivery.", why: "Only TCP provides that." }
    ]
  },
  {
    id: "transport-23", topic: "transport", pool: "quiz", source: "conceptual", multi: false,
    q: "A program creates a UDP socket and never calls `bind()`. When does it get a local port?",
    options: [
      { id: "wk", text: "It always gets well-known port 53.", why: "Port 53 belongs to DNS servers." },
      { id: "never", text: "Never, so the socket cannot send until bind() is called explicitly.", why: "Unbound UDP sockets can send; the OS assigns a port." },
      { id: "first-send", correct: true, text: "The OS assigns a free temporary port when the socket first sends.", why: "Without explicit binding, the OS picks a port from its own range." },
      { id: "port-zero", text: "It sends everything from port 0.", why: "A real port is assigned at first send." },
      { id: "server-assigns", text: "The server assigns one to the client in its first reply datagram.", why: "The client's OS chooses the client port." }
    ]
  },
  {
    id: "transport-24", topic: "transport", pool: "exam", source: "assignment", multi: false, ref: "Assignment 1 Q4",
    q: "In the assignment's HTTP trace, the server side of the TCP handshake uses port 80 and the client uses port 53124. Why does the server use a well-known port while the client uses an ephemeral one?",
    options: [
      { id: "dns", text: "DNS returns port 80 to the client along with the server's IP address in the A record.", why: "DNS does not return port numbers." },
      { id: "known", correct: true, text: "Clients must know the server's port in advance; the client's just has to be unique.", why: "The server binds a well-known port clients can find; the client's OS picks a free temporary port." },
      { id: "random-server", text: "The server picks a random port and tells the client which one to use in the SYN-ACK.", why: "The client's SYN already targets port 80; the server does not choose it during the handshake." },
      { id: "same", text: "Both are well-known ports, chosen by the IETF.", why: "53124 is an ephemeral port chosen by the client OS." },
      { id: "faster", text: "Well-known ports are faster, and servers need the speed.", why: "Port numbers do not affect speed." }
    ]
  }
);
