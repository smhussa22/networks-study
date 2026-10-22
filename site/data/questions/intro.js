window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(
  {
    id: "intro-01", topic: "intro", pool: "quiz", source: "inclass", multi: true, ref: "Lecture discussion question",
    q: "An organization moves billing, shipping and planning onto one shared network. Which effects of this growth in network use does the lecture describe?",
    options: [
      { id: "shared-failure", correct: true, text: "A failure in one shared component can now disrupt many activities at once.", why: "Dependency grows with use: more activities rely on the same shared components, so one failure affects many of them." },
      { id: "coordination", correct: true, text: "Departments can coordinate and reach customers more easily through shared services.", why: "More connected users and services create coordination, reach and network effects. That is the value side." },
      { id: "fewer-staff", text: "The organization needs fewer networking staff once all of its departments are connected together.", why: "The lecture says growth increases the demand for skilled people to design, run and manage networks." },
      { id: "attack-surface", correct: true, text: "The set of services an attacker could target becomes larger.", why: "The lecture lists a larger attack surface as part of the fragility that comes with growth." },
      { id: "no-congestion", text: "Congestion stops being a risk because traffic is spread over more users.", why: "More users sharing the network increases congestion risk; it does not remove it." }
    ]
  },
  {
    id: "intro-02", topic: "intro", pool: "quiz", source: "inclass", multi: true, ref: "Lecture discussion question",
    q: "A new optical link doubles the raw bit rate, but file-transfer completion time barely changes. Which explanations are plausible?",
    options: [
      { id: "transport-limits", correct: true, text: "Congestion control, server limits or latency stop the transfer using the extra capacity.", why: "A TCP/IP or application explanation: the sender may not be able to fill the faster link." },
      { id: "propagation", text: "Doubling the bit rate also doubles the propagation delay of the optical link.", why: "Propagation delay depends on distance and signal speed, not on the bit rate." },
      { id: "double-header", text: "Each bit sent at the higher rate needs its own extra link-layer header.", why: "Headers are added per frame, not per bit, and a faster rate does not add headers." },
      { id: "overhead", correct: true, text: "Bit errors or signalling overhead keep the usable rate well below the raw rate.", why: "A data-communications explanation: the raw rate is not the rate the transfer actually gets." },
      { id: "bottleneck", correct: true, text: "A shared or slower access segment elsewhere on the path is the bottleneck.", why: "A packet-technology explanation: throughput is set by the slowest link, so speeding up a different link changes little." }
    ]
  },
  {
    id: "intro-03", topic: "intro", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "An application message is split into three transport segments. On one link, how many network-layer headers are normally added?",
    options: [
      { id: "six", text: "Six, since every segment gets a network header at both the sender and the receiver.", why: "The receiver removes headers; it does not add them. One network header is added per datagram." },
      { id: "three", correct: true, text: "Three, since each segment normally travels in its own datagram and frame.", why: "Each segment is normally carried in its own datagram and frame, so there are three network headers and three sets of link overhead, absent aggregation." },
      { id: "one-frame", text: "One, since the link layer merges the three segments into one frame.", why: "The link layer frames each datagram; it does not merge separate datagrams into one frame in the normal case." },
      { id: "one-message", text: "One, since the three segments belong to the same application message.", why: "The network layer does not know about application messages; it wraps each segment it is given." },
      { id: "none", text: "None, since network headers are only added later by the routers in the network core.", why: "The sending host's network layer adds Hn to form the datagram before it leaves the host." }
    ]
  },
  {
    id: "intro-04", topic: "intro", pool: "quiz", source: "inclass", multi: false,
    q: "An airline changes how passengers board at the gate. In the layering analogy, why do ticketing and baggage handling not need to change?",
    options: [
      { id: "same-layer", text: "Ticketing and baggage belong to the same layer as the gates, so they change together.", why: "They are separate layers in the analogy; if they were the same layer they would be affected." },
      { id: "transparent", correct: true, text: "Each layer's changes stay hidden behind the service it offers.", why: "Modularization: changes within one layer are transparent to the other layers as long as the service it provides stays the same." },
      { id: "last-step", text: "Boarding is the final step of a trip, so no other step can depend on it.", why: "Boarding is in the middle of the stack (unloading and baggage claim follow it), and the reason is modularity, not position." },
      { id: "no-info", text: "The gate step carries no information, so no other layer depends on it.", why: "The gate layer provides a real service (loading and unloading) to the layers around it." },
      { id: "copied", text: "Every layer runs the same procedure, so the change is copied to all layers automatically.", why: "Each layer has its own procedure (protocol); nothing copies changes between layers." }
    ]
  },
  {
    id: "intro-05", topic: "intro", pool: "quiz", source: "conceptual", multi: false,
    q: "At the sending host, what is the data unit called after each layer adds its header, from the transport layer down to the link layer?",
    options: [
      { id: "seg-frame-dgram", text: "Segment, then frame, then datagram.", why: "The network layer works before the link layer, so the datagram comes before the frame." },
      { id: "msg-msg-frame", text: "Message, then message, then frame.", why: "Message is the application-layer unit; the transport and network layers produce a segment and a datagram." },
      { id: "dgram-seg-frame", text: "Datagram, then segment, then frame.", why: "Datagram is the network-layer unit and segment is the transport-layer unit, so the first two are swapped." },
      { id: "frame-dgram-seg", text: "Frame, then datagram, then segment.", why: "This is the order from the bottom up, not the order headers are added going down." },
      { id: "seg-dgram-frame", correct: true, text: "Segment, then datagram, then frame.", why: "Transport adds Ht to M (segment), network adds Hn (datagram), link adds Hl (frame)." }
    ]
  },
  {
    id: "intro-06", topic: "intro", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 1 R23",
    q: "What is the order of the five layers of the Internet protocol stack, from top to bottom?",
    options: [
      { id: "tanpl", text: "Transport, Application, Network, Physical, Link", why: "Application is the top layer and physical is the bottom layer." },
      { id: "atnlp", correct: true, text: "Application, Transport, Network, Link, Physical", why: "This is the five-layer Internet stack as presented in lecture." },
      { id: "plnta", text: "Physical, Link, Network, Transport, Application", why: "This is the right list, but in bottom-to-top order." },
      { id: "antlp", text: "Application, Network, Transport, Link, Physical", why: "Transport sits above network: it gives process-to-process delivery on top of host-to-host delivery." },
      { id: "atlnp", text: "Application, Transport, Link, Network, Physical", why: "Network is above link: the link layer carries datagrams between neighbouring devices." }
    ]
  },
  {
    id: "intro-07", topic: "intro", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 1 R25",
    q: "In the end-to-end encapsulation view, which layers does a router process?",
    options: [
      { id: "tnl", text: "Transport, network and link", why: "Routers do not inspect transport headers; transport runs only at end systems." },
      { id: "lp", text: "Link and physical only", why: "That describes a link-layer switch, which never looks at the network header." },
      { id: "all", text: "Application, transport, network, link and physical", why: "Only end systems implement all five layers." },
      { id: "nlp", correct: true, text: "Network, link and physical", why: "A router reads the network header to forward the datagram, so it implements the bottom three layers." },
      { id: "atn", text: "Application, transport and network", why: "Routers do not run application or transport layers for the packets they forward." }
    ]
  },
  {
    id: "intro-08", topic: "intro", pool: "exam", source: "textbook", multi: false, ref: "Textbook Ch. 1 R22",
    q: "Can the same kind of function, such as error control, be implemented at more than one layer of a protocol stack?",
    options: [
      { id: "physical", text: "Only at the physical layer, where the same bits can simply be repeated on the wire.", why: "Error control is not limited to the physical layer." },
      { id: "app-only", text: "Only if the application layer turns the function off first.", why: "Layers do not need permission from the application to provide a function." },
      { id: "yes", correct: true, text: "Yes, two or more layers can perform the same kind of task.", why: "For example, error checking appears in the link layer and in UDP and TCP." },
      { id: "routers", text: "Only inside routers, since they are the only devices that run every layer of the stack.", why: "Routers implement only the bottom three layers, and duplication happens at end systems too." },
      { id: "no", text: "No, every function belongs to exactly one layer.", why: "Layers can duplicate functions; the UDP checksum exists even though many links also check errors." }
    ]
  },
  {
    id: "intro-09", topic: "intro", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 1 R3",
    q: "Why are standards important for network protocols?",
    options: [
      { id: "faster", text: "They make standard protocols run faster than non-standard ones, since vendors optimize them.", why: "Standardization is about agreement, not speed." },
      { id: "no-addresses", text: "They remove the need for addresses in packets.", why: "Standards define how addresses are used; they do not remove them." },
      { id: "no-loss", text: "They guarantee that no packet is ever lost.", why: "IP is best effort even though it is standardized." },
      { id: "interoperate", correct: true, text: "They let hardware and software built by different groups work together, because all follow the same rules.", why: "Interoperability requires both entities to follow the same rules, and a standard defines those rules." },
      { id: "one-vendor", text: "They ensure that only one approved vendor can build each protocol, which prevents conflicts.", why: "The opposite: open standards let independent implementations interoperate." }
    ]
  },
  {
    id: "intro-10", topic: "intro", pool: "quiz", source: "inclass", multi: true,
    q: "Two programs on different hosts are connected by a working link but cannot understand each other's messages. For communication to work, what must they agree on?",
    options: [
      { id: "vendor", text: "The same brand of network hardware.", why: "Standards exist precisely so different vendors' equipment can interoperate." },
      { id: "representation", correct: true, text: "How data is represented.", why: "The lecture lists data representation as one of the things both entities must agree on." },
      { id: "format", correct: true, text: "How messages are formatted.", why: "Message format is part of the protocol both sides must follow." },
      { id: "os", text: "The same operating system on both hosts.", why: "Protocols are independent of the operating system; a Mac browser talks to a Linux server." },
      { id: "procedure", correct: true, text: "How communication begins and proceeds.", why: "Both sides must follow the same sequence of steps, including what to do on errors." }
    ]
  },
  {
    id: "intro-11", topic: "intro", pool: "exam", source: "inclass", multi: false,
    q: "A company buys Internet service from a provider. A manager worries that because it is a 'public network', anyone can read the company's traffic. What does 'public' mean here?",
    options: [
      { id: "government", text: "The network is owned and run by the government.", why: "Public networks are subscription services from service providers, not necessarily government-run." },
      { id: "readable", text: "Every packet on it can be read by any other subscriber who shares the provider's links.", why: "That is the manager's misunderstanding; public does not mean the data is exposed." },
      { id: "free", text: "The service is free of charge for everyone.", why: "Public networks are subscription-based." },
      { id: "no-private", text: "The company can no longer run a private network of its own once it subscribes.", why: "Private networks are controlled by one organization and can coexist with public service." },
      { id: "availability", correct: true, text: "Anyone can subscribe to the service; 'public' says nothing about whether the data is visible to others.", why: "The lecture is explicit: public refers to availability, not data visibility." }
    ]
  },
  {
    id: "intro-12", topic: "intro", pool: "quiz", source: "conceptual", multi: true,
    q: "Which are key features of packet switching?",
    options: [
      { id: "circuit", text: "A dedicated end-to-end path is set up before sending.", why: "That is circuit switching, the approach packet switching replaced." },
      { id: "address", correct: true, text: "Each packet carries a destination address.", why: "Network devices use the address and forwarding information to deliver each packet." },
      { id: "reserved", text: "Each packet follows a path reserved during call setup.", why: "Packet switching has no call setup or reservation; each packet is forwarded independently." },
      { id: "chunks", correct: true, text: "Data is divided into small packets.", why: "Packets are the unit that is stored and forwarded." },
      { id: "share", correct: true, text: "Users share network resources.", why: "No resources are reserved per user; links are shared among all traffic." }
    ]
  },
  {
    id: "intro-13", topic: "intro", pool: "quiz", source: "conceptual", multi: false,
    q: "Which layer provides process-to-process data transfer between applications?",
    options: [
      { id: "physical", text: "Physical", why: "The physical layer moves raw bits over the medium." },
      { id: "transport", correct: true, text: "Transport", why: "Transport (TCP, UDP) delivers data between processes using network-layer services." },
      { id: "application", text: "Application", why: "The application layer defines message formats and meanings; it uses transport to move the messages." },
      { id: "network", text: "Network", why: "The network layer delivers datagrams between hosts, not between processes." },
      { id: "link", text: "Link", why: "The link layer moves frames between neighbouring devices." }
    ]
  },
  {
    id: "intro-14", topic: "intro", pool: "exam", source: "inclass", multi: true,
    q: "A frame carrying a datagram [Hn | Ht | M] passes through a link-layer switch and then a router on its way to the destination host. Which statements are correct?",
    options: [
      { id: "host-strips", correct: true, text: "The destination's transport layer removes Ht and passes M up.", why: "Each layer at the destination removes its own header, so transport strips Ht and delivers M to the application." },
      { id: "switch-net", text: "The switch adds a second network header for its own LAN.", why: "Switches do not add network headers; they work only with frames." },
      { id: "switch-link", correct: true, text: "The switch processes only the link and physical layers.", why: "A switch connects devices within a LAN and works with frames; it does not need the network header." },
      { id: "router-reframe", correct: true, text: "The router reads Hn and puts the datagram in a new link-layer frame.", why: "The router removes the incoming link header, forwards on the network header, and re-encapsulates for the next link." },
      { id: "router-port", text: "The router reads Ht to choose which outgoing port to use, then rewrites the destination port.", why: "Routers act only on network-layer fields; they do not inspect transport headers." }
    ]
  },
  {
    id: "intro-15", topic: "intro", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 1 P30",
    q: "In the airline analogy for layering, is there an equivalent of headers being added as passengers and bags move down the stack?",
    options: [
      { id: "never", text: "No, an airline never adds any extra information to passengers or their bags.", why: "Tickets, boarding passes and bag tags are exactly that kind of added information." },
      { id: "bags-only", text: "Only bags get a header; passengers move through unchanged.", why: "Passengers get tickets and boarding passes as well." },
      { id: "plane-only", text: "Only the airplane gets a header, at the routing layer.", why: "Information is added at several stages, not only one." },
      { id: "removed", text: "Yes, but they are only added at the destination airport, when passengers and bags arrive.", why: "Headers are added at the source going down and removed at the destination going up." },
      { id: "tags", correct: true, text: "Yes, boarding passes and baggage tags are added along the way.", why: "Each stage attaches information the matching stage at the destination uses, just like a header." }
    ]
  },
  {
    id: "intro-16", topic: "intro", pool: "quiz", source: "conceptual", multi: false,
    q: "Of the five key areas of networking, which one covers signals, media, encoding, bandwidth and errors?",
    options: [
      { id: "cross", text: "Cross-cutting topics", why: "That area covers performance, security, management and IoT." },
      { id: "tcpip", text: "TCP/IP internetworking", why: "That area covers addressing, routing, TCP, UDP and core protocols." },
      { id: "datacomm", correct: true, text: "Data communications", why: "Data communications studies how information travels through wired, wireless and optical media using physical signals." },
      { id: "apps", text: "Network applications", why: "That area covers how software communicates using sockets and APIs." },
      { id: "packet", text: "Packet switching", why: "Packet switching covers LANs, WANs, frames, MAC, Ethernet and Wi-Fi." }
    ]
  },
  {
    id: "intro-17", topic: "intro", pool: "exam", source: "inclass", multi: false,
    q: "A student proposes replacing the whole TCP/IP suite with one protocol that does everything. Why does the lecture favour a suite of protocols instead?",
    options: [
      { id: "functions", correct: true, text: "Each protocol handles one function within a coordinated suite.", why: "A complete, efficient system needs a set of protocols, each with a specific job, working together in a suite." },
      { id: "speed", text: "Several small protocols always run faster than one large combined protocol would.", why: "The argument is about structure and coordination, not raw speed." },
      { id: "vendors", text: "Each vendor is required to write its own protocol for the suite, so products stay distinct.", why: "Protocols are standardized so vendors interoperate; vendors do not each need their own." },
      { id: "no-headers", text: "A suite lets packets travel without any headers at all.", why: "Every layer in the suite adds its own header." },
      { id: "one-layer", text: "A suite puts all functions into a single layer, which is easier to change.", why: "The suite spreads functions over layers; a single layer would be the monolithic design being rejected." }
    ]
  },
  {
    id: "intro-18", topic: "intro", pool: "exam", source: "conceptual", multi: false,
    q: "How did telephone and telegraph networks deliver data before packet switching?",
    options: [
      { id: "tcpip", text: "They used TCP/IP over copper telephone lines.", why: "TCP/IP emerged in the 1970s, after circuit-switched telephone networks." },
      { id: "packets", text: "They split the data into small packets that shared every link along the way.", why: "That is packet switching, which arrived in the 1960s." },
      { id: "store", text: "They stored each message at every switch before forwarding it.", why: "Store-and-forward is the packet-switching method." },
      { id: "broadcast", text: "They broadcast every message to all connected users.", why: "Telephone calls used a dedicated circuit between the two parties." },
      { id: "circuit", correct: true, text: "They set up a dedicated end-to-end circuit, then transmitted.", why: "Circuit switching: establish a circuit, then transmit. Electronic switches automated it but kept the principle." }
    ]
  },
  {
    id: "intro-19", topic: "intro", pool: "quiz", source: "inclass", multi: true,
    q: "A new student says networking is confusing. Which reasons does the lecture give for why networking seems complex to beginners?",
    options: [
      { id: "one-theory", text: "One complete theory explains every component, but it is very long.", why: "The lecture says no single theory explains how all components relate." },
      { id: "no-change", text: "Network technology has stopped changing, so old books and new books disagree about how it works.", why: "Rapid technological change, not a lack of change, makes standardization hard." },
      { id: "terms", correct: true, text: "Terminology is inconsistent, and marketing labels get mixed up with technical terms.", why: "Different groups use their own terms, and product names are confused with technical ones." },
      { id: "standards", correct: true, text: "Standards from different organizations may be incompatible.", why: "The lecture lists incompatible standards as a source of confusion." },
      { id: "single-tech", text: "Every network uses the same technology, so the differences are hidden.", why: "The opposite: many technologies exist and are combined in many ways." }
    ]
  }
);
