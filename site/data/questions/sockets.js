window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(
  {
    id: "sockets-01", topic: "sockets", pool: "quiz", source: "inclass", multi: false, ref: "In-class Set 2 Q1",
    q: "A new proprietary service needs a server port. Which choice follows the design guidance?",
    options: [
      { id: "outside-wk", correct: true, text: "Use an available port outside the well-known ports.", why: "Proprietary apps should avoid well-known ports, which are reserved for standard protocols such as HTTP on 80." },
      { id: "client-port", text: "Use the client's automatically selected port.", why: "The client's port is ephemeral and chosen by the OS; clients must know the server port in advance." },
      { id: "after-request", text: "Choose the service port only after receiving the first request.", why: "A request can only arrive at a port the server is already bound to." },
      { id: "port-80", text: "Use port 80 so the service looks like ordinary web traffic.", why: "Port 80 is assigned to HTTP; a proprietary protocol should not reuse it." },
      { id: "same-wk", text: "Use the same well-known port as any TCP service.", why: "Well-known ports belong to the RFC-defined protocol assigned to them." }
    ]
  },
  {
    id: "sockets-02", topic: "sockets", pool: "quiz", source: "inclass", multi: true, ref: "In-class Set 2 Q2",
    q: "Which responsibilities belong mainly to the application developer?",
    options: [
      { id: "route", text: "Choose the network route for every server reply.", why: "Routing is done by the network layer and routers, not by the application." },
      { id: "client-server", correct: true, text: "Implement the client and server behaviour.", why: "The developer's core job is writing both the client and the server code." },
      { id: "handshake", text: "Implement TCP's three-way handshake inside the client.", why: "The handshake is managed by the operating system's TCP; the app just calls connect()." },
      { id: "port", correct: true, text: "Pick a server port for a proprietary application.", why: "For proprietary apps the developer chooses a port outside the well-known range." },
      { id: "transport", correct: true, text: "Choose the transport service for the application.", why: "Choosing TCP or UDP is an early design decision the developer makes." }
    ]
  },
  {
    id: "sockets-03", topic: "sockets", pool: "quiz", source: "inclass", multi: true, ref: "In-class Set 2 Q3",
    q: "Which differences between TCP and UDP sockets are correct?",
    options: [
      { id: "tcp-tuple", text: "TCP requires a destination tuple on every connected write.", why: "Once connected, a TCP socket writes bytes without naming the destination again." },
      { id: "tcp-conn", correct: true, text: "TCP establishes a connection before exchanging application data.", why: "TCP does a three-way handshake before data flows." },
      { id: "udp-addr", correct: true, text: "UDP senders address each datagram.", why: "With UDP, every sendto() names the destination IP and port." },
      { id: "tcp-stream", correct: true, text: "TCP provides an ordered byte stream.", why: "TCP gives a reliable, ordered, bidirectional byte stream like a pipe." },
      { id: "udp-retx", text: "UDP retransmits lost datagrams, while TCP does not.", why: "The reverse: TCP retransmits, UDP is best effort." }
    ]
  },
  {
    id: "sockets-04", topic: "sockets", pool: "quiz", source: "inclass", multi: true,
    code: "from socket import *\nserverName = 'hostname'\nserverPort = 12000\nclientSocket = socket(AF_INET, SOCK_DGRAM)\nmessage = input('Input lowercase sentence:')\nclientSocket.sendto(message.encode(), (serverName, serverPort))\nmodifiedMessage, serverAddress = clientSocket.recvfrom(2048)\nprint(modifiedMessage.decode())\nclientSocket.close()",
    q: "Read this UDP client. Which statements are correct?",
    options: [
      { id: "sender-addr", correct: true, text: "`recvfrom()` returns both the data and the sender's address.", why: "The receiver learns the sender's IP and port from the arriving datagram." },
      { id: "dest-each", correct: true, text: "`sendto()` must name the server's address and port.", why: "UDP has no connection, so the destination is attached to each datagram." },
      { id: "exact-2048", text: "`recvfrom(2048)` waits until exactly 2048 bytes have arrived.", why: "2048 is the buffer size limit; recvfrom returns one datagram of whatever size it is." },
      { id: "connect", text: "The client must call `connect()` before `sendto()` will work, because UDP needs a handshake first.", why: "UDP needs no handshake; the code works without connect()." },
      { id: "os-port", correct: true, text: "The OS picks the client's source port, because the socket is never bound.", why: "Without bind(), the system assigns a temporary port when the socket first sends." }
    ]
  },
  {
    id: "sockets-05", topic: "sockets", pool: "quiz", source: "inclass", multi: true,
    code: "serverSocket = socket(AF_INET, SOCK_STREAM)\nserverSocket.bind(('', serverPort))\nserverSocket.listen(1)\nwhile True:\n    connectionSocket, addr = serverSocket.accept()\n    sentence = connectionSocket.recv(1024).decode()\n    connectionSocket.send(sentence.upper().encode())\n    connectionSocket.close()",
    q: "Read this TCP server. Which statements are correct?",
    options: [
      { id: "accept-new", correct: true, text: "`accept()` returns a new socket dedicated to one client.", why: "The welcoming socket stays separate; each accepted connection gets its own connection socket." },
      { id: "send-addr", text: "Each `send()` must include the client's address.", why: "A connected TCP socket already knows its peer; send() needs no address." },
      { id: "close-one", correct: true, text: "`connectionSocket.close()` ends only that client's connection.", why: "The code closes the connection socket, not the welcoming socket." },
      { id: "welcome-data", text: "The welcoming socket carries the client's data.", why: "Data flows over the connection socket returned by accept()." },
      { id: "keeps-listening", correct: true, text: "The server can accept another client after closing a connection.", why: "serverSocket keeps listening, so the loop goes back to accept()." }
    ]
  },
  {
    id: "sockets-06", topic: "sockets", pool: "exam", source: "inclass", multi: false,
    code: "s.settimeout(30)\ns.settimeout(10)\ndata = s.recv(1024)",
    q: "No data ever arrives on socket s. What happens?",
    options: [
      { id: "forty", text: "After 40 seconds, because the two timeouts add up.", why: "Timeouts replace each other; they do not accumulate." },
      { id: "forever", text: "`recv()` waits forever, because settimeout only applies to `send()` and `connect()` calls.", why: "The timeout applies to all socket operations, including recv()." },
      { id: "thirty", text: "After 30 seconds, because the first timeout set on a socket is the one that always applies.", why: "The later settimeout(10) replaced the earlier value." },
      { id: "empty", text: "`recv()` returns an empty bytes object immediately.", why: "recv() blocks until data, close or timeout; a timeout raises an exception." },
      { id: "ten", correct: true, text: "After 10 seconds, with a timeout exception.", why: "settimeout applies to all future operations; the second call replaced 30 with 10." }
    ]
  },
  {
    id: "sockets-07", topic: "sockets", pool: "exam", source: "inclass", multi: false,
    code: "counter = 0\nwhile counter < 4:\n    connectionSocket, addr = serverSocket.accept()\n    connectionSocket.settimeout(15)\n    try:\n        alert_line = connectionSocket.recv(1024).decode()\n        notify_technician(alert_line)\n        connectionSocket.send('technician notified'.encode())\n    except timeout:\n        counter += 1\n    connectionSocket.close()",
    q: "Three sensors connect one after another and send nothing. A fourth connects and sends an alert after 5 seconds. What happens?",
    options: [
      { id: "never", text: "`notify_technician` never runs, because counter reached 4 first.", why: "Only three timeouts happen before the alert, so counter is 3." },
      { id: "stops", text: "`notify_technician` runs once, and then the loop ends because four clients connected.", why: "The loop counts timeouts, not clients." },
      { id: "four-calls", text: "`notify_technician` runs four times, once per connection.", why: "It only runs when data arrives; the first three connections timed out." },
      { id: "once-keep", correct: true, text: "`notify_technician` runs once; the server returns to `accept()` with counter 3.", why: "Three timeouts raise counter to 3. The alert arrives before the 15 s timeout, so counter stays 3 and the loop continues." },
      { id: "crash", text: "The server crashes with an unhandled timeout on the first sensor.", why: "The except clause catches the timeout." }
    ]
  },
  {
    id: "sockets-08", topic: "sockets", pool: "quiz", source: "inclass", multi: true,
    q: "A client must handle either a reply arriving on its socket or a timer expiring, and later must also watch replies on several sockets. Which approaches does the lecture describe?",
    options: [
      { id: "next-only", text: "Call settimeout before every recv, since it lasts one call.", why: "A timeout applies to all future operations on the socket until changed." },
      { id: "select", correct: true, text: "Use `select()` or threads to wait on several sockets.", why: "The lecture names select() or threads for replies that may come on several sockets." },
      { id: "empty-string", text: "Check whether `recv()` returned the string 'timeout'.", why: "A timeout raises an exception; recv() does not return a special string." },
      { id: "settimeout", correct: true, text: "Set a socket timeout and catch the timeout exception.", why: "Python raises a timeout exception when no data arrives before the deadline." },
      { id: "udp-retx", text: "Rely on UDP to retransmit if the reply is late.", why: "UDP never retransmits." }
    ]
  },
  {
    id: "sockets-09", topic: "sockets", pool: "quiz", source: "inclass", multi: false,
    q: "Why can Chrome exchange pages with an Apache server even though different teams wrote them?",
    options: [
      { id: "same-os", text: "Both must run on the same operating system.", why: "Interoperability comes from the protocol, not the OS." },
      { id: "same-team", text: "Apache and Chrome share one private, unpublished protocol.", why: "That describes a proprietary app, where one team controls both ends." },
      { id: "rfc", correct: true, text: "Both follow the same public protocol specification, an RFC.", why: "Open, standardized protocols let independent implementations interoperate." },
      { id: "udp", text: "Both use UDP, which needs no agreed message format.", why: "HTTP/1.1 and HTTP/2 run over TCP, and every protocol needs an agreed format." },
      { id: "routers", text: "Routers translate between Chrome's and Apache's formats.", why: "Routers do not translate application messages." }
    ]
  },
  {
    id: "sockets-10", topic: "sockets", pool: "exam", source: "inclass", multi: false,
    q: "A UDP client sends its first datagram to port 12000 before the server program has started. A moment later the server binds port 12000. What happens to that first datagram?",
    options: [
      { id: "redirect", text: "The server's OS hands it to another process listening on a nearby port so it is not wasted.", why: "Demultiplexing uses the exact destination port." },
      { id: "handshake", text: "The client's OS performs a handshake that fails, so nothing is sent.", why: "UDP sends without any handshake." },
      { id: "lost", correct: true, text: "It is not delivered, because no socket was bound to port 12000 when it arrived.", why: "UDP has no setup and no retransmission, so the server must be running before the client sends." },
      { id: "queued", text: "It waits in a router's queue until the server binds the port, then it is delivered.", why: "Routers do not hold datagrams for sockets that do not exist yet." },
      { id: "retried", text: "UDP retransmits it automatically once the server is ready.", why: "UDP provides no retransmission." }
    ]
  },
  {
    id: "sockets-11", topic: "sockets", pool: "quiz", source: "inclass", multi: false,
    code: "clientSocket = socket(AF_INET, SOCK_STREAM)\nclientSocket.connect((serverName, serverPort))\nclientSocket.send(sentence.encode())",
    q: "Unlike the UDP client, this TCP client calls `send()` without any server address. Why?",
    options: [
      { id: "broadcast", text: "TCP broadcasts every write to all hosts on the network.", why: "TCP is point-to-point: one sender, one receiver." },
      { id: "dns", text: "`send()` looks up the server's name in DNS again on every call and adds the address itself.", why: "The connection already has the server's address; no lookup happens per send." },
      { id: "connected", correct: true, text: "`connect()` already fixed the peer for every write.", why: "Once connected, each side writes bytes to its socket without naming the destination." },
      { id: "error", text: "The code is missing the address and will fail.", why: "It is correct TCP client code from the lecture." },
      { id: "header", text: "The server's address is stored inside the sentence string, which TCP reads before sending.", why: "The application data does not carry addressing for TCP." }
    ]
  },
  {
    id: "sockets-12", topic: "sockets", pool: "exam", source: "textbook", multi: false, ref: "Textbook Ch. 2 R26",
    q: "A TCP server is serving n clients at the same time, each from a different host. How many sockets does it need?",
    options: [
      { id: "2n", text: "2n", why: "Each client needs one connection socket on the server, not two." },
      { id: "one", text: "1", why: "One socket for everyone describes a UDP server; TCP gives each accepted connection its own socket." },
      { id: "n", text: "n", why: "That forgets the welcoming socket that keeps accepting new clients." },
      { id: "n-minus-1", text: "n − 1", why: "Every client needs its own connection socket." },
      { id: "n-plus-1", correct: true, text: "n + 1", why: "One welcoming socket plus one connection socket per client: each accept() returns a separate connection socket, and the listening socket remains." }
    ]
  },
  {
    id: "sockets-13", topic: "sockets", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 2 R27",
    q: "Why must a TCP server program be running before the client program starts its connection?",
    options: [
      { id: "doesnt", text: "It does not matter in TCP.", why: "It does: with no listening socket, the connection attempt fails." },
      { id: "client-listen", text: "The client must listen on a port first, so the server knows where to connect.", why: "Clients initiate; it is the server that listens." },
      { id: "listening", correct: true, text: "The server must already be listening before the client can open a connection.", why: "connect() needs a welcoming socket on the server to complete the handshake." },
      { id: "dns", text: "The server must first register its port number in DNS so the client can find it.", why: "DNS does not store port numbers." },
      { id: "udp", text: "UDP requires the server to run first.", why: "The question is about TCP; UDP has no connection setup." }
    ]
  },
  {
    id: "sockets-14", topic: "sockets", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 2 P29",
    q: "The UDP client is changed to bind its socket to port 5432. Does the UDP server need to change?",
    options: [
      { id: "no", correct: true, text: "No; it replies to the datagram's source.", why: "The server reads the client address from recvfrom() and replies to it." },
      { id: "tcp", text: "Only if the server uses TCP instead of UDP.", why: "The UDP server code works unchanged." },
      { id: "rebind", text: "Yes, the server must bind to 5432 as well.", why: "The server keeps its own port; 5432 is only the client's source port." },
      { id: "same-port", text: "Yes, the client and server must now use the same port number for every datagram.", why: "Client and server ports are independent." },
      { id: "yes-port", text: "Yes, the server must be told the new client port before it can send any replies back.", why: "The client's port arrives in each datagram, so the server learns it automatically." }
    ]
  },
  {
    id: "sockets-15", topic: "sockets", pool: "quiz", source: "conceptual", multi: false,
    q: "What is a socket?",
    options: [
      { id: "segment", text: "The header that the transport layer adds to each segment before passing it down.", why: "That is the transport header, not a socket." },
      { id: "router", text: "A port on a router that connects two different networks to each other.", why: "Router interfaces are network-layer hardware, not sockets." },
      { id: "interface", correct: true, text: "The interface between an application process and the transport layer, like a door the messages pass through.", why: "A socket is the door through which a process sends and receives messages." },
      { id: "dns", text: "A DNS record that maps a name to a port.", why: "DNS records do not hold ports." },
      { id: "cable", text: "The physical connector on a network cable.", why: "The lecture's socket is a software endpoint." }
    ]
  },
  {
    id: "sockets-16", topic: "sockets", pool: "quiz", source: "conceptual", multi: false,
    q: "In Python, which call creates an IPv4 UDP socket?",
    options: [
      { id: "inet6", text: "`socket(AF_INET6, SOCK_STREAM)`", why: "That is an IPv6 TCP socket." },
      { id: "udp-arg", text: "`socket(UDP, PORT_12000)`", why: "Python's socket() takes an address family and a type, not these names." },
      { id: "dgram", correct: true, text: "`socket(AF_INET, SOCK_DGRAM)`", why: "SOCK_DGRAM is the datagram (UDP) socket type." },
      { id: "listen", text: "`socket(AF_INET, LISTEN)`", why: "There is no LISTEN socket type; listen() is a method on TCP sockets." },
      { id: "stream", text: "`socket(AF_INET, SOCK_STREAM)`", why: "SOCK_STREAM creates a TCP socket." }
    ]
  },
  {
    id: "sockets-17", topic: "sockets", pool: "quiz", source: "assignment", multi: false, ref: "Assignment 2 Q1",
    q: "In the ping/pong assignment, the server never calls `connect()` and does not know the client in advance. How does it know where to send each PONG?",
    options: [
      { id: "dns", text: "It looks up the client's hostname in DNS before replying, using the name in the PING text.", why: "The server never needs the client's name; recvfrom() gives the address directly." },
      { id: "recvfrom", correct: true, text: "`recvfrom()` returns the sender's IP and port, and the server replies to that address.", why: "The source IP and port in the arriving datagram form the return address." },
      { id: "same-port", text: "It sends to its own primary port, which the client also binds so that it can hear replies.", why: "The client must not bind the server's port; the OS picks the client port." },
      { id: "broadcast", text: "It broadcasts the PONG to every host on campus.", why: "UDP replies go to one address, the one recvfrom() returned." },
      { id: "tcp", text: "It opens a TCP connection back to the client.", why: "The assignment forbids TCP; the reply is one UDP datagram." }
    ]
  },
  {
    id: "sockets-18", topic: "sockets", pool: "quiz", source: "assignment", multi: false, ref: "Assignment 2 Q4",
    q: "In the assignment capture, the server's port is the assigned primary port and the client's port is a high number such as 54213. Who chose each port?",
    options: [
      { id: "router", text: "A router on the path assigned both ports.", why: "Routers do not assign transport ports." },
      { id: "split", correct: true, text: "The server's bind() and the client's OS", why: "The client does not bind, so the OS assigns a temporary source port when it first sends." },
      { id: "both-client", text: "The client chose both ports in its `sendto()` call, along with the server's hostname.", why: "sendto() names the destination port; the source port comes from the client's OS." },
      { id: "wireshark", text: "Wireshark assigned the client port while capturing.", why: "Wireshark only observes packets; it does not change them." },
      { id: "both-server", text: "The server chose both ports when the client first connected to it with the PING request.", why: "UDP has no connection setup, and the server cannot choose the client's port." }
    ]
  },
  {
    id: "sockets-19", topic: "sockets", pool: "exam", source: "assignment", multi: false, ref: "Assignment 2 client rules",
    q: "The client sends PING 7 at t = 0. At t = 0.4 s a late PONG 6 arrives. No other datagram arrives. What should the client do?",
    options: [
      { id: "restart", text: "Ignore PONG 6 and restart the one-second timer at t = 0.4 s, so the server has a full second.", why: "The deadline is measured from just before sending and is not restarted." },
      { id: "ignore", correct: true, text: "Ignore PONG 6, keep waiting until t = 1.0 s, then report TIMEOUT for probe 7.", why: "Mismatched PONGs are ignored and the original one-second deadline is not restarted." },
      { id: "retry", text: "Resend PING 7 immediately.", why: "The client must not retry any request." },
      { id: "error", text: "Print ERROR and move on to PING 8.", why: "ERROR is only for the exact reply 'ERROR invalid request'." },
      { id: "accept", text: "Count PONG 6 as the reply to PING 7, since it arrived before the one-second deadline.", why: "Only the exact text PONG 7 counts as a match." }
    ]
  },
  {
    id: "sockets-20", topic: "sockets", pool: "quiz", source: "assignment", multi: true, ref: "Assignment 2 Q2",
    q: "The ten-probe capture shows PING 5 and PING 10 with no matching PONG. Which statements are correct?",
    options: [
      { id: "timeout", correct: true, text: "The client reports TIMEOUT for those probes after one second.", why: "No matching PONG arrives before the deadline." },
      { id: "proves-loss", text: "A timeout always proves a datagram was dropped by a router.", why: "A timeout only shows that no matching reply arrived in time." },
      { id: "udp-retx", text: "UDP will retransmit PING 5 until a PONG arrives.", why: "UDP never retransmits, and the client must not retry." },
      { id: "omit", correct: true, text: "The server deliberately sends nothing for numbers divisible by 5.", why: "The omission rule is part of the server's specification." },
      { id: "not-loss", correct: true, text: "The missing replies alone are not evidence that the network lost datagrams.", why: "The server sent nothing, so there was nothing to lose." }
    ]
  },
  {
    id: "sockets-21", topic: "sockets", pool: "quiz", source: "assignment", multi: true, ref: "Assignment 2 protocol",
    q: "Which requests must the assignment server answer with exactly 'ERROR invalid request'?",
    options: [
      { id: "lower", correct: true, text: "`ping 3`", why: "Commands are case sensitive, so lowercase ping is invalid." },
      { id: "zero", correct: true, text: "`PING 0`", why: "The number must be from 1 to 9999." },
      { id: "extra", correct: true, text: "`PING 3 extra`", why: "Nothing may follow the number." },
      { id: "leading-zero", correct: true, text: "`PING 03`", why: "The number may not have a leading zero." },
      { id: "valid", text: "`PING 42`", why: "This is a valid request; the server replies PONG 42 since 42 is not divisible by 5." }
    ]
  }
);
