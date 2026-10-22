window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(
  {
    id: "internet-01", topic: "internet", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "A company uses Ethernet inside each office and leased circuits between cities. Why could replacing both with one technology make the system worse, even if that technology can span both distances?",
    options: [
      { id: "routers-fail", text: "Routers cannot forward traffic between two sites that use the same technology.", why: "Routers can connect networks of the same or different technologies." },
      { id: "illegal", text: "Using one technology for both local and long-distance links is not allowed by Internet standards.", why: "Nothing forbids it; the problem is that it may be a poor fit for both environments." },
      { id: "no-wan", text: "Ethernet is the only technology that can carry IP datagrams across a city.", why: "Many technologies carry IP datagrams; that is the point of internetworking." },
      { id: "no-addresses", text: "A single technology would leave the company without any IP addresses to assign to its hosts.", why: "Addressing comes from IP, not from the choice of physical network." },
      { id: "not-optimized", correct: true, text: "One technology may suit neither setting, losing cheap fast LANs or long-distance guarantees.", why: "Each technology is built for specific constraints. Universal service needs interoperability, not identical physical networks." }
    ]
  },
  {
    id: "internet-02", topic: "internet", pool: "exam", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "A designer says: 'If two networks cannot exchange native frames, they cannot be part of one internet.' How should this statement be evaluated?",
    options: [
      { id: "bridge", text: "It is right, but a bridge can convert any frame type into any other.", why: "The lecture says bridging cannot be applied to heterogeneous technologies." },
      { id: "correct", text: "It is right: two networks must use the same frame format before a router is able to join them.", why: "Routers exist precisely to connect networks with different frame formats." },
      { id: "wan-only", text: "It is wrong only for WANs, because LANs always share one frame format.", why: "Different LAN technologies also have their own frame formats; the reasoning applies to any heterogeneous networks." },
      { id: "app-layer", text: "It is wrong because applications rewrite their frames for each different network the data crosses.", why: "Applications do not handle frames; routers and the network layer handle re-encapsulation." },
      { id: "confuses", correct: true, text: "It is wrong: routers carry a common internet packet, re-encapsulated in each link's own frame.", why: "The statement confuses link-level compatibility with internetwork communication. The networks stay different while routers re-frame the common packet." }
    ]
  },
  {
    id: "internet-03", topic: "internet", pool: "quiz", source: "inclass", multi: true,
    q: "One commercial router could connect all four of an organization's networks. Why do organizations usually deploy several routers instead?",
    options: [
      { id: "redundancy", correct: true, text: "To avoid a single point of failure.", why: "Redundancy protects against one router taking every network down." },
      { id: "reroute", correct: true, text: "So protocol software can reroute traffic when a router or network fails.", why: "Routing software monitors connections and reroutes around failures, which needs alternate routers." },
      { id: "two-only", text: "Because a router can connect at most two networks.", why: "Commercial routers can connect more than two networks; one could connect all four." },
      { id: "circuits", text: "Because each router must turn incoming frames into circuits, and one router cannot hold enough circuits.", why: "Routers forward packets; they do not create circuits." },
      { id: "load", correct: true, text: "To balance load and improve performance.", why: "The lecture lists load balancing and improved performance as one reason." }
    ]
  },
  {
    id: "internet-04", topic: "internet", pool: "quiz", source: "inclass", multi: false,
    q: "An engineer tries to join a LAN and a WAN that use different technologies by wiring them together with a bridge-like extension device. Why does this fail?",
    options: [
      { id: "format", correct: true, text: "Their frame formats and addresses are incompatible.", why: "Incompatibilities prevent building a large network by connecting wires; heterogeneous networks need routers and internet protocols." },
      { id: "ip", text: "Bridges remove the IP header from every frame they forward.", why: "Bridges work with frames and do not strip IP headers; the issue is mismatched formats." },
      { id: "power", text: "The WAN uses a different electrical power standard than the LAN, so the bridge cannot connect them.", why: "The problem is packet format and addressing, not power." },
      { id: "speed", text: "The LAN is always faster than the WAN, so the bridge drops every frame it cannot forward in time.", why: "Speed differences are not the reason; the frame formats and addresses are incompatible." },
      { id: "distance", text: "Bridges only work over distances shorter than one metre.", why: "Distance is not the issue the lecture identifies." }
    ]
  },
  {
    id: "internet-05", topic: "internet", pool: "quiz", source: "inclass", multi: true,
    q: "The Internet is described as a virtual network. Which details does Internet software hide from users and application programs?",
    options: [
      { id: "phys-addr", correct: true, text: "The physical addresses on each network.", why: "Internet protocols resolve differences in physical addresses so applications never see them." },
      { id: "dest-process", text: "Which application on the other host gets the data.", why: "Applications choose the destination port themselves; this is not hidden from them." },
      { id: "connections", correct: true, text: "The physical network connections.", why: "Users are not expected to know how the underlying networks are physically connected." },
      { id: "routing", correct: true, text: "The routing information routers use.", why: "Routing details are concealed; the internet looks like one seamless system." },
      { id: "ip-addr", text: "The IP address of the destination host.", why: "Applications use the destination IP address (often via DNS) to send data, so it is not hidden." }
    ]
  },
  {
    id: "internet-06", topic: "internet", pool: "quiz", source: "inclass", multi: true,
    q: "Why has the line between an organization's intranet and the global Internet become blurred?",
    options: [
      { id: "owner", text: "The Internet is now owned by a single private organization.", why: "The Internet is a network of networks owned by many organizations." },
      { id: "gateways", correct: true, text: "Intranets often connect to the Internet through gateways.", why: "Most intranets have a gateway link to the global Internet." },
      { id: "same-gear", correct: true, text: "Organizations use the same equipment and protocol software as ISPs.", why: "Intranets are built from the same routers and TCP/IP software used on the Internet." },
      { id: "format", text: "Intranets now use a packet format that the Internet also accepts.", why: "Intranets already use the same IP packet format; that did not change." },
      { id: "public", text: "Intranets have become open to anyone on the Internet.", why: "An intranet is still owned by and intended for one organization's employees." }
    ]
  },
  {
    id: "internet-07", topic: "internet", pool: "quiz", source: "inclass", multi: false,
    q: "Neighbours on cable Internet notice slowdowns every evening, while a friend on DSL does not. What best explains the difference?",
    options: [
      { id: "shared", correct: true, text: "Cable access is shared by many homes; DSL lines are dedicated.", why: "Cable access is shared among homes; DSL rates are dedicated per subscriber line." },
      { id: "upstream", text: "Cable is symmetric, so evening uploads use up all the download capacity.", why: "HFC is asymmetric, with much higher downstream than upstream rates." },
      { id: "dsl-faster", text: "DSL always has higher downstream rates than any cable connection.", why: "HFC downstream can reach 1.2 Gbps, while DSL downstream is 24 to 52 Mbps." },
      { id: "wireless", text: "Cable is a wireless technology, so it suffers from more radio interference in the evening.", why: "HFC uses fibre and coaxial cable, which are guided media." },
      { id: "fdm", text: "DSL uses frequency division multiplexing, while cable sends all channels on one frequency.", why: "Cable access uses FDM: each channel has its own frequency band." }
    ]
  },
  {
    id: "internet-08", topic: "internet", pool: "quiz", source: "inclass", multi: false,
    q: "A host sends a 1,500-byte packet into a 10 Mbps link. What is the packet transmission delay?",
    options: [
      { id: "12ms", text: "12 ms", why: "This is off by a factor of 10: 12,000 bits at 10 Mbps is 0.0012 s." },
      { id: "1.2ms", correct: true, text: "1.2 ms", why: "Transmission delay = L/R = (1,500 × 8 bits) / (10 × 10^6 bits/s) = 1.2 ms." },
      { id: "120ms", text: "120 ms", why: "This is 100 times too large; check the powers of ten." },
      { id: "0.15ms", text: "0.15 ms", why: "This divides bytes by bits per second; the 1,500 bytes must first be converted to 12,000 bits." },
      { id: "0.12ms", text: "0.12 ms", why: "This is 10 times too small; 12,000 / 10,000,000 = 0.0012 s." }
    ]
  },
  {
    id: "internet-09", topic: "internet", pool: "exam", source: "inclass", multi: true,
    q: "An office connects 20 PCs to one device and connects the office to its ISP through another device. Which statements are correct?",
    options: [
      { id: "router-local", text: "Two PCs on the same LAN must go through the router to exchange data.", why: "PCs on the same LAN reach each other through the switch; the router is needed to reach other networks." },
      { id: "both-packet", correct: true, text: "Both devices are packet switches that forward data in chunks.", why: "Routers and switches are the two common types of packet switch." },
      { id: "router-nets", correct: true, text: "The device linking the office to the ISP is a router joining networks.", why: "A router connects multiple networks together." },
      { id: "switch-path", text: "The switch picks the path packets take across the ISP's network.", why: "Path selection across networks is the router's job; the switch works inside the LAN." },
      { id: "switch-lan", correct: true, text: "The device joining the 20 PCs is a switch connecting devices within a LAN.", why: "A switch connects devices within a LAN." }
    ]
  },
  {
    id: "internet-10", topic: "internet", pool: "exam", source: "inclass", multi: false,
    q: "A video call over a geostationary satellite link feels much laggier than one over a low-Earth-orbit system such as Starlink. Why?",
    options: [
      { id: "bandwidth", text: "Geostationary links cannot carry more than one bit at a time.", why: "Satellite links carry many bits in flight; the delay comes from distance." },
      { id: "half", text: "Low-Earth-orbit links are full duplex, while geostationary links can only send one way at a time.", why: "Duplex mode is not what the lecture contrasts; it contrasts delay." },
      { id: "distance", correct: true, text: "The geostationary satellite is much farther away, so propagation delay is much higher.", why: "GEO satellites orbit about 36,000 km up, so each hop adds far more propagation delay than LEO." },
      { id: "wifi", text: "Starlink uses Wi-Fi, which has lower delay than satellite radio.", why: "Starlink is itself a satellite system; it is lower delay because its satellites are much closer." },
      { id: "guided", text: "Geostationary links use guided media such as undersea cable, which are slower than radio.", why: "Both are wireless (unguided); the difference is distance." }
    ]
  },
  {
    id: "internet-11", topic: "internet", pool: "quiz", source: "inclass", multi: true,
    q: "A building is choosing between Wi-Fi and cabling. Which statements about wireless radio as a physical medium are correct?",
    options: [
      { id: "pulses", text: "Each pulse of light it carries represents one bit.", why: "Light pulses describe fibre optics; radio uses electromagnetic waves." },
      { id: "shared", correct: true, text: "It is usually a shared, half-duplex medium.", why: "The lecture describes wireless radio as usually shared and half-duplex." },
      { id: "immune", text: "It is immune to electromagnetic noise.", why: "Immunity to electromagnetic noise is a property of fibre, not radio." },
      { id: "guided", text: "It is a guided medium, like twisted pair.", why: "Radio is unguided: signals travel freely through space." },
      { id: "reflection", correct: true, text: "Reflection, obstructions, interference and noise affect it.", why: "Radio signals are affected by reflection, physical obstructions, interference and noise." }
    ]
  },
  {
    id: "internet-12", topic: "internet", pool: "quiz", source: "conceptual", multi: false,
    q: "What is an access network?",
    options: [
      { id: "edge-router", correct: true, text: "The network that links an end system to the first router, the edge router, on its path to distant end systems.", why: "The access network connects end systems to the edge router." },
      { id: "core", text: "The mesh of routers and links that interconnects the Internet's end systems across many ISPs.", why: "That is the network core." },
      { id: "datacenter", text: "The high-bandwidth links that connect hundreds of servers to each other inside a data centre.", why: "That is a data centre network." },
      { id: "isp-isp", text: "The links that connect one national ISP to another.", why: "ISP-to-ISP links are part of the core, not the access network." },
      { id: "dns", text: "The set of servers that translate names into addresses.", why: "That is DNS, an application-layer service." }
    ]
  },
  {
    id: "internet-13", topic: "internet", pool: "quiz", source: "conceptual", multi: false,
    q: "What is the network core?",
    options: [
      { id: "mesh", correct: true, text: "The interconnected mesh of packet switches and links, a network of networks, that connects end systems.", why: "The core is interconnected routers, a network of networks." },
      { id: "wifi", text: "The wireless access points inside a building.", why: "Access points are part of wireless access networks." },
      { id: "apps", text: "The application processes that exchange messages.", why: "Applications run at the edge, not in the core." },
      { id: "hosts", text: "The clients and servers at the edge of the Internet that run all the application programs.", why: "Hosts make up the network edge." },
      { id: "first-link", text: "The single link between a home and its first router, also called the edge router.", why: "That link is part of the access network." }
    ]
  },
  {
    id: "internet-14", topic: "internet", pool: "exam", source: "conceptual", multi: true,
    q: "Which properties belong to fibre optic cable?",
    options: [
      { id: "free-space", text: "Signals that travel freely through space.", why: "That describes unguided media such as radio." },
      { id: "fast", correct: true, text: "High-speed point-to-point transmission of tens to hundreds of Gbps.", why: "Fibre supports very high-speed point-to-point links." },
      { id: "low-error", correct: true, text: "A low error rate, so repeaters can be spaced far apart.", why: "Low error rate means repeaters are spaced far apart." },
      { id: "immune", correct: true, text: "Immunity to electromagnetic noise.", why: "Light in glass is not affected by electromagnetic noise." },
      { id: "coax", text: "Two concentric copper conductors.", why: "That describes coaxial cable." }
    ]
  },
  {
    id: "internet-15", topic: "internet", pool: "quiz", source: "conceptual", multi: false,
    q: "Which physical medium is unguided?",
    options: [
      { id: "coax", text: "Coaxial cable", why: "Coax is guided." },
      { id: "cat6", text: "Category 6 Ethernet cable", why: "Cat 6 is twisted pair, which is guided." },
      { id: "twisted", text: "Twisted-pair copper", why: "Twisted pair is guided: signals travel through solid copper." },
      { id: "fibre", text: "Fibre optic cable", why: "Fibre is guided: light travels through glass." },
      { id: "radio", correct: true, text: "Wireless radio", why: "Unguided media carry signals freely through space, as radio waves do." }
    ]
  },
  {
    id: "internet-16", topic: "internet", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 1 R1",
    q: "In the textbook's terminology, how are 'host' and 'end system' related?",
    options: [
      { id: "wireless", text: "Hosts exist only in wireless networks.", why: "Hosts include wired PCs and servers as well." },
      { id: "same", correct: true, text: "They are two names for the same thing.", why: "End systems are called hosts because they host application programs." },
      { id: "link", text: "An end system is a router and a host is a link.", why: "Neither is a router or a link." },
      { id: "server", text: "A host is always a server and an end system is always a client.", why: "Both clients and servers are hosts and end systems." },
      { id: "router", text: "A host is a router and an end system is a switch.", why: "Routers and switches are packet switches, not end systems." }
    ]
  },
  {
    id: "internet-17", topic: "internet", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 1 R5",
    q: "Which statement about the downstream channel in an HFC network is correct?",
    options: [
      { id: "shared-no-coll", correct: true, text: "It is shared, but collisions cannot happen because only the headend sends downstream.", why: "Many homes share the downstream channel, but only the headend sends on it, so there are no collisions." },
      { id: "dedicated-coll", text: "It is dedicated to each user, and collisions can happen.", why: "The HFC downstream channel is shared, not dedicated." },
      { id: "wireless", text: "It is a wireless channel that each home tunes to in turn.", why: "HFC uses fibre and coax, not wireless radio." },
      { id: "shared-coll", text: "It is shared among users, and collisions can happen when two homes transmit downstream together.", why: "Users do not transmit downstream, so there is nothing to collide with." },
      { id: "dedicated-no", text: "It is dedicated to each home, and collisions cannot happen because each home has its own channel.", why: "Dedicated per-user lines describe DSL, not HFC." }
    ]
  },
  {
    id: "internet-18", topic: "internet", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 1 R11",
    q: "A single store-and-forward switch sits between a sender (link rate R1) and a receiver (link rate R2). Ignoring queuing, propagation and processing, how long does it take to send one packet of length L?",
    options: [
      { id: "product", text: "L × R1 × R2", why: "Delay is bits divided by rate, not multiplied by it." },
      { id: "single", text: "L/R1 only", why: "That ignores the second transmission from the switch to the receiver." },
      { id: "max", text: "max(L/R1, L/R2)", why: "Store-and-forward means both transmissions happen one after the other, so the times add." },
      { id: "sum", correct: true, text: "L/R1 + L/R2", why: "The switch must receive the whole packet (L/R1) before it sends it on the second link (L/R2)." },
      { id: "combined", text: "L/(R1 + R2)", why: "The links are in series, not in parallel, so their rates do not add." }
    ]
  },
  {
    id: "internet-19", topic: "internet", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 1 R13a",
    q: "Users share a 2 Mbps link. Each user transmits at 1 Mbps when active, but only 20 percent of the time. With circuit switching, how many users can be supported?",
    options: [
      { id: "two", correct: true, text: "2", why: "Circuit switching reserves 1 Mbps per user regardless of activity: 2 Mbps / 1 Mbps = 2 users." },
      { id: "ten", text: "10", why: "That counts the average rate of 0.2 Mbps, but circuit switching must reserve the full 1 Mbps." },
      { id: "one", text: "1", why: "The link has room for two 1 Mbps circuits." },
      { id: "five", text: "5", why: "Five comes from 1 / 0.2; it ignores the 2 Mbps link rate and the reservation rule." },
      { id: "four", text: "4", why: "Four would need 4 Mbps of reserved capacity." }
    ]
  },
  {
    id: "internet-20", topic: "internet", pool: "exam", source: "textbook", multi: false, ref: "Textbook Ch. 1 R13d",
    q: "Three users share a packet-switched link. Each transmits independently 20 percent of the time. What is the probability that all three are transmitting at once?",
    options: [
      { id: "0.008", correct: true, text: "0.008", why: "Independent events multiply: 0.2 × 0.2 × 0.2 = 0.008." },
      { id: "0.024", text: "0.024", why: "That multiplies 0.008 by 3, which counts the same event three times." },
      { id: "0.2", text: "0.2", why: "That is the probability for one user." },
      { id: "0.6", text: "0.6", why: "Probabilities of independent events multiply; they do not add." },
      { id: "0.512", text: "0.512", why: "That is 0.8 cubed, the probability that none of the three is transmitting." }
    ]
  },
  {
    id: "internet-21", topic: "internet", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 1 R18",
    q: "A 1,000-byte packet travels over a 2,500 km link with propagation speed 2.5 × 10^8 m/s and transmission rate 2 Mbps. What is the propagation delay?",
    options: [
      { id: "10ms", correct: true, text: "10 ms", why: "d/s = 2.5 × 10^6 m / 2.5 × 10^8 m/s = 0.01 s. Packet length does not matter." },
      { id: "1ms", text: "1 ms", why: "Check the conversion: 2,500 km is 2.5 × 10^6 m." },
      { id: "4ms", text: "4 ms", why: "That is the transmission delay L/R = 8,000 bits / 2 Mbps." },
      { id: "14ms", text: "14 ms", why: "That adds transmission delay to propagation delay; the question asks for propagation only." },
      { id: "100ms", text: "100 ms", why: "This is ten times too large." }
    ]
  },
  {
    id: "internet-22", topic: "internet", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 1 R19b",
    q: "Host A sends a 4-million-byte file to Host B over three links in series of 500 kbps, 2 Mbps and 1 Mbps, with no other traffic. About how long does the transfer take?",
    options: [
      { id: "64s", correct: true, text: "64 s", why: "Throughput is the bottleneck rate, 500 kbps. 32 × 10^6 bits / 5 × 10^5 bits/s = 64 s." },
      { id: "8s", text: "8 s", why: "That forgets to convert 4 million bytes to 32 million bits." },
      { id: "9s", text: "About 9 s", why: "That adds the three rates (3.5 Mbps); links in series are limited by the slowest one." },
      { id: "32s", text: "32 s", why: "That uses the 1 Mbps link; the slowest link is 500 kbps." },
      { id: "16s", text: "16 s", why: "That uses the 2 Mbps link, which is not the bottleneck." }
    ]
  },
  {
    id: "internet-23", topic: "internet", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 1 P31c",
    q: "An 8 × 10^6-bit message is cut into 800 packets of 10,000 bits and sent over three 2 Mbps store-and-forward links (5 ms per packet per link). How long until the whole message reaches the destination?",
    options: [
      { id: "0.015", text: "0.015 s", why: "That is the time for one packet to cross all three links." },
      { id: "4.00", text: "4.00 s", why: "That counts only the first link; the last packet still needs two more hops of 5 ms." },
      { id: "12", text: "12.0 s", why: "That is the time without segmentation: three full 4 s store-and-forward hops." },
      { id: "4.015", text: "4.015 s", why: "That adds three extra hops of 5 ms; the first hop is already in the 800 × 5 ms." },
      { id: "4.01", correct: true, text: "4.01 s", why: "Pipelining: (800 + 3 − 1) × 5 ms = 4.01 s." }
    ]
  }
);
