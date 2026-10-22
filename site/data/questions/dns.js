window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(
  {
    id: "dns-01", topic: "dns", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "The local DNS server is not one of the root, TLD or authoritative levels. Why is it still operationally central to name resolution?",
    options: [
      { id: "proxy", correct: true, text: "It answers hosts' queries for them, contacting the hierarchy and caching results.", why: "The local server does the work for the client and is its gateway to the hierarchy, without being a delegated level." },
      { id: "authoritative", text: "It is authoritative for every hostname its clients look up, so its answers are always final.", why: "Answers from its cache are non-authoritative; authority belongs to each domain's own servers." },
      { id: "tld-assign", text: "It assigns new top-level domains when clients request them.", why: "TLDs are maintained by organizations such as Verisign for .com, not by local resolvers." },
      { id: "routing", text: "It chooses the route that each later HTTP packet takes from the client to the web server.", why: "DNS returns addresses; routing is done by routers at the network layer." },
      { id: "root-copy", text: "It holds a full copy of every domain's records, so it never contacts other servers.", why: "It caches answers it has fetched; it does not hold every record." }
    ]
  },
  {
    id: "dns-02", topic: "dns", pool: "exam", source: "inclass", multi: false,
    q: "A host at engineering.nyu.edu asks for gaia.cs.umass.edu with nothing cached. Its local server queries the root, then the .edu TLD, then the umass.edu authoritative server iteratively. How many DNS messages are exchanged in total?",
    options: [
      { id: "eight", correct: true, text: "8", why: "Host to local and back (2), plus local to root, TLD and authoritative and back (6): 4 queries and 4 replies." },
      { id: "two", text: "2", why: "That would only be true if the local server already had the answer cached." },
      { id: "six", text: "6", why: "That leaves out the host's own query to the local server and the reply to it." },
      { id: "ten", text: "10", why: "There are four servers involved (local, root, TLD, authoritative); each exchange is one query and one reply." },
      { id: "four", text: "4", why: "That counts only the queries, not the replies." }
    ]
  },
  {
    id: "dns-03", topic: "dns", pool: "quiz", source: "inclass", multi: true,
    q: "The same lookup is done with recursive queries instead of iterative ones. Which statements about recursive resolution are correct?",
    options: [
      { id: "local-each", text: "The local server contacts the root, TLD and authoritative servers itself.", why: "That is the iterative pattern; recursively, the root contacts the TLD and the TLD contacts the authoritative server." },
      { id: "burden", correct: true, text: "It puts the burden of resolution on each contacted name server.", why: "In a recursive query, the contacted server must obtain the answer itself." },
      { id: "referral", text: "Each server replies 'I don't know, ask this server'.", why: "That referral reply is what defines an iterative query." },
      { id: "load", correct: true, text: "It can put heavy load on the upper levels of the hierarchy.", why: "Root and TLD servers would have to carry every query down the hierarchy for their clients." },
      { id: "fewer", text: "It needs fewer messages than the iterative version.", why: "Both versions use 8 messages for this lookup; what changes is who does the work." }
    ]
  },
  {
    id: "dns-04", topic: "dns", pool: "quiz", source: "inclass", multi: true,
    q: "Host A looks up www.example.com through its local DNS server. Ten minutes later Host B, on the same network, looks up the same name. Which statements are correct?",
    options: [
      { id: "non-auth", correct: true, text: "The reply Host B receives is non-authoritative.", why: "A cached answer comes from a server that is not authoritative for the name." },
      { id: "auth-again", text: "The authoritative server must be contacted again for Host B, because cached answers are only for Host A.", why: "Not while the cached record is still valid; that is the point of caching." },
      { id: "never-expire", text: "The cached entry stays valid forever once it is stored.", why: "Cached records expire after their TTL." },
      { id: "skip-root", correct: true, text: "For other .com names, the local server can skip the root using its cached TLD address.", why: "Local servers cache TLD server addresses, so root servers are involved in only a small fraction of queries." },
      { id: "from-cache", correct: true, text: "The local server can reply to Host B straight from its cache.", why: "The local server stored the mapping when A's reply came back and can reuse it until it expires." }
    ]
  },
  {
    id: "dns-05", topic: "dns", pool: "quiz", source: "inclass", multi: true,
    q: "A student proposes running all of DNS from one central database. Which problems does the lecture give for this design?",
    options: [
      { id: "maintain", correct: true, text: "It would be very hard to maintain and update at Internet scale.", why: "Every change for every domain would have to go through one place." },
      { id: "latency", correct: true, text: "It would add high latency for users far away from it.", why: "A remote central database means long round trips for many users." },
      { id: "tcp-only", text: "DNS must use TCP, and TCP cannot reach a central server.", why: "DNS queries normally use UDP port 53, and the transport protocol is not the problem." },
      { id: "volume", correct: true, text: "It could not handle the enormous query volume.", why: "Comcast alone handles about 600 billion queries a day." },
      { id: "spof", correct: true, text: "It would be a single point of failure.", why: "If the one server fails, name resolution fails everywhere." }
    ]
  },
  {
    id: "dns-06", topic: "dns", pool: "exam", source: "inclass", multi: false,
    q: "A zone contains (www.example.com, web.example.com, CNAME, 3600) and (web.example.com, 192.0.2.10, A, 3600). A browser looks up www.example.com. What role does each record play?",
    options: [
      { id: "mail", text: "The CNAME names the domain's mail server, and the A record names its web server instead.", why: "Mail servers are named by MX records, not CNAME." },
      { id: "a-alias", text: "The A record maps the alias to the canonical name, and the CNAME gives the address.", why: "This swaps the two record types." },
      { id: "ns", text: "The CNAME names the authoritative DNS server for example.com, and the A record is its backup.", why: "That is the job of an NS record." },
      { id: "ttl", text: "The 3600 values are port numbers the browser must connect to.", why: "3600 is the TTL in seconds, which controls how long the record may be cached." },
      { id: "alias-then-a", correct: true, text: "The CNAME maps the alias to the canonical name; the A record gives its IPv4 address.", why: "CNAME maps an alias hostname to a canonical hostname; type A maps a hostname to its IP address." }
    ]
  },
  {
    id: "dns-07", topic: "dns", pool: "quiz", source: "inclass", multi: true,
    q: "A company wants mail for addresses @example.com delivered to the host mail.example.com, while its website stays at www.example.com. Which records does a sending mail server rely on?",
    options: [
      { id: "mx", correct: true, text: "An MX record mapping example.com to mail.example.com.", why: "MX maps a domain to the canonical name of its mail server." },
      { id: "a-port", text: "An A record mapping example.com to port 25.", why: "A records map names to IP addresses, never to ports." },
      { id: "a-mail", correct: true, text: "An A record giving the IP address of mail.example.com.", why: "The sender still needs the mail server's IP address; it can arrive in the additional section of the MX reply." },
      { id: "cname-mail", text: "A CNAME record mapping example.com to mail.example.com.", why: "CNAME is for host aliasing; mail server aliasing uses MX." },
      { id: "ns-mail", text: "An NS record listing mail.example.com as the domain's DNS server.", why: "NS names the authoritative DNS server, not the mail server." }
    ]
  },
  {
    id: "dns-08", topic: "dns", pool: "quiz", source: "inclass", multi: false,
    q: "A busy site runs the same content on several replicated servers under one hostname. How can DNS spread clients across them?",
    options: [
      { id: "rotate", correct: true, text: "Map the hostname to several IP addresses and rotate which address is listed first in successive replies.", why: "This is DNS load distribution: one name, many addresses, rotated across replies." },
      { id: "routers", text: "Ask the routers near the site to pick a replica when each client's packet arrives.", why: "Routers forward to the address the client chose; DNS does the spreading." },
      { id: "mx", text: "List the replicas as MX records so browsers pick one.", why: "MX records are for mail servers, not web servers." },
      { id: "cname-chain", text: "Chain CNAME records together so that each client is passed through every replica in turn.", why: "CNAME is for aliasing, and a client connects to one server, not all of them." },
      { id: "ports", text: "Give each replica a different port number in its A record.", why: "A records carry addresses, not ports." }
    ]
  },
  {
    id: "dns-09", topic: "dns", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "In an SMTP exchange between two mail servers, why is the sending server called the client, even though it is a mail server?",
    options: [
      { id: "smaller", text: "The sending server is always the smaller of the two machines, so it takes the client role.", why: "Hardware size has nothing to do with client and server roles." },
      { id: "role", correct: true, text: "It opens the SMTP connection.", why: "The side that initiates the connection is the client for that exchange." },
      { id: "user-agent", text: "It runs the user's mail reader program.", why: "User agents run on the user's device, not on the mail server." },
      { id: "port", text: "It listens on port 25 for incoming connections.", why: "Listening on port 25 is what the receiving server does." },
      { id: "pull", text: "It pulls the mail out of the receiving server's mailbox, so it acts as the client of that server.", why: "SMTP is a push protocol: the sender pushes the message." }
    ]
  },
  {
    id: "dns-10", topic: "dns", pool: "exam", source: "inclass", multi: false,
    q: "Why are Bob's messages stored on a shared, always-on mail server instead of a mail server running on his own phone?",
    options: [
      { id: "always-on", correct: true, text: "A phone is often offline when mail arrives.", why: "If Bob's server ran on his phone, it would have to stay online all the time." },
      { id: "ports", text: "Phones cannot open TCP connections on port 25.", why: "The issue is availability, not whether a device can use a port." },
      { id: "speed", text: "Mail servers must be faster than any phone processor in order to keep up with incoming mail.", why: "Speed is not the reason the lecture gives." },
      { id: "smtp-pull", text: "SMTP can only pull messages, so a shared server must hold them until the phone asks.", why: "SMTP is a push protocol between servers." },
      { id: "dns", text: "DNS cannot store records that point to a phone.", why: "DNS can map names to any address; the problem is that the device is not always on." }
    ]
  },
  {
    id: "dns-11", topic: "dns", pool: "quiz", source: "inclass", multi: true,
    q: "Alice writes an email in Gmail in her browser. Bob reads mail with Outlook on his desktop. Which steps are correct?",
    options: [
      { id: "direct-pc", text: "Alice's mail server delivers directly into Bob's desktop PC.", why: "Mail goes to Bob's always-on mail server, where it waits in his mailbox." },
      { id: "bob-imap", correct: true, text: "Bob's Outlook fetches the message from his server with IMAP.", why: "Desktop clients like Outlook use IMAP to fetch and manage mail." },
      { id: "bob-smtp", text: "Bob's Outlook pulls the message from his server with SMTP.", why: "SMTP is strictly a push protocol and is not used to retrieve mail." },
      { id: "server-smtp", correct: true, text: "Alice's mail server pushes it to Bob's mail server with SMTP.", why: "SMTP is the server-to-server push protocol." },
      { id: "alice-http", correct: true, text: "Alice's user agent hands the message to her mail server using HTTP.", why: "Webmail user agents send to their server with HTTP (desktop agents would use SMTP)." }
    ]
  },
  {
    id: "dns-12", topic: "dns", pool: "quiz", source: "inclass", multi: true,
    code: "S: 220 hamburger.edu\nC: HELO crepes.fr\nS: 250 Hello crepes.fr, pleased to meet you\nC: MAIL FROM: <alice@crepes.fr>\nS: 250 alice@crepes.fr... Sender ok\nC: RCPT TO: <bob@hamburger.edu>\nS: 250 bob@hamburger.edu ... Recipient ok\nC: DATA\nS: 354 Enter mail, end with \".\" on a line by itself\nC: Do you like ketchup?\nC: .\nS: 250 Message accepted for delivery\nC: QUIT",
    q: "Read this SMTP transcript. Which statements are correct?",
    options: [
      { id: "period", correct: true, text: "The line holding only a period ends the message body.", why: "354 tells the client to end the mail with a period on a line by itself." },
      { id: "envelope", correct: true, text: "MAIL FROM and RCPT TO are SMTP commands, separate from the From: and To: header lines in the message.", why: "The lecture stresses that the message's header lines differ from the MAIL FROM and RCPT TO commands." },
      { id: "udp", text: "The transcript is carried over UDP port 25, so each line the client or server types travels as one datagram.", why: "SMTP uses TCP on port 25 for reliable transfer." },
      { id: "250-refuse", text: "Each 250 reply means the server refused the previous command.", why: "250 means OK: sender ok, recipient ok, message accepted." },
      { id: "helo-server", text: "HELO is sent by the receiving server to greet the client.", why: "HELO comes from the client (crepes.fr); the server greets with 220." }
    ]
  },
  {
    id: "dns-13", topic: "dns", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 2 R16",
    q: "Alice sends an email from a web-based account to Bob, who reads his mail with a separate mail-access protocol. Which protocol moves the message from Alice's mail server to Bob's mail server?",
    options: [
      { id: "dns", text: "DNS", why: "DNS finds Bob's mail server through an MX record, but it does not carry the message." },
      { id: "imap", text: "IMAP", why: "IMAP is a mail-access protocol for retrieving mail." },
      { id: "pop3", text: "POP3", why: "POP3 is an access protocol Bob might use to download mail, not a server-to-server protocol." },
      { id: "http", text: "HTTP", why: "HTTP is used between Alice's browser and her mail server, not between the two servers." },
      { id: "smtp", correct: true, text: "SMTP", why: "SMTP transfers mail between mail servers." }
    ]
  },
  {
    id: "dns-14", topic: "dns", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 2 R19",
    q: "Which DNS record type identifies the mail server for a domain?",
    options: [
      { id: "a-record", text: "A", why: "Type A maps a hostname to an IP address." },
      { id: "cname", text: "CNAME", why: "CNAME maps an alias to a canonical hostname." },
      { id: "soa", text: "SOA", why: "SOA describes the zone itself; it does not name the mail server." },
      { id: "ns", text: "NS", why: "NS gives the domain's authoritative DNS server." },
      { id: "mx", correct: true, text: "MX", why: "MX maps a domain name to the canonical name of its mail server." }
    ]
  },
  {
    id: "dns-15", topic: "dns", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 2 R19",
    q: "Can an organization's web server and mail server have exactly the same alias hostname, such as foo.com?",
    options: [
      { id: "ports", text: "Only if the two servers listen on the same port.", why: "Ports do not decide this; record types do." },
      { id: "no", text: "No, one hostname can only ever refer to one server, so the mail server needs its own name.", why: "MX records exist precisely so mail can use the same easy name as the website." },
      { id: "cname-both", text: "Yes, but only by giving foo.com two CNAME records, one for each of the two servers.", why: "The mechanism is A for the web server and MX for mail, not two CNAMEs." },
      { id: "yes-mx", correct: true, text: "Yes: the web server is found through foo.com's A record and the mail server through its MX record.", why: "Different record types let one name lead to different servers for web and mail." },
      { id: "ipv6", text: "Only if both servers use IPv6 addresses.", why: "IP version is irrelevant to aliasing." }
    ]
  },
  {
    id: "dns-16", topic: "dns", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 2 P14",
    q: "How do SMTP and HTTP mark the end of a message body?",
    options: [
      { id: "blank", text: "Both use one blank line after the body.", why: "In HTTP, the blank line ends the headers, not the body." },
      { id: "both-length", text: "Both use a Content-Length header.", why: "SMTP marks the end with a period line, not Content-Length." },
      { id: "both-period", text: "Both use a line holding a single period, just after the final line of the body.", why: "HTTP does not use the SMTP period convention." },
      { id: "period-length", correct: true, text: "SMTP ends with a line holding only a period; HTTP uses Content-Length or chunking.", why: "SMTP ends DATA with a lone period; HTTP tells the receiver the body length." },
      { id: "close", text: "Both close the TCP connection right after the last byte of the body to mark the end.", why: "Both protocols can send several messages over one connection." }
    ]
  },
  {
    id: "dns-17", topic: "dns", pool: "exam", source: "textbook", multi: false, ref: "Textbook Ch. 2 P21",
    q: "Without admin access, how could you check whether some external website was likely looked up from your department a few seconds ago?",
    options: [
      { id: "ping", text: "Ping the website several times and check whether its replies come back faster than usual.", why: "Reply speed says nothing about DNS lookups from your department." },
      { id: "root", text: "Ask a root server for the list of recent queries.", why: "Root servers do not reveal who asked what." },
      { id: "web-logs", text: "Read the external website's server logs.", why: "You have no access to another organization's server logs." },
      { id: "never", text: "It is impossible, because DNS servers never cache answers and always ask the authoritative server.", why: "Local DNS servers do cache answers; that is what makes the check possible." },
      { id: "ttl", correct: true, text: "Ask your local DNS server for the name and see if a cached answer has a reduced TTL.", why: "A cached, non-authoritative answer whose TTL is below the original value suggests a recent lookup." }
    ]
  },
  {
    id: "dns-18", topic: "dns", pool: "quiz", source: "conceptual", multi: false,
    q: "Which transport protocol and port do DNS queries use?",
    options: [
      { id: "tcp80", text: "TCP port 80", why: "That is plain HTTP." },
      { id: "udp443", text: "UDP port 443", why: "QUIC for HTTP/3 commonly uses UDP 443; DNS uses 53." },
      { id: "tcp53", text: "TCP port 53 only", why: "The lecture describes DNS queries over UDP port 53." },
      { id: "tcp25", text: "TCP port 25", why: "That is SMTP." },
      { id: "udp53", correct: true, text: "UDP port 53", why: "DNS is an application-layer protocol over UDP, port 53." }
    ]
  },
  {
    id: "dns-19", topic: "dns", pool: "exam", source: "conceptual", multi: false,
    q: "What fields make up a DNS resource record?",
    options: [
      { id: "four", correct: true, text: "Name, Value, Type and TTL, which together make up the record's 4-tuple", why: "A resource record is the 4-tuple (Name, Value, Type, TTL)." },
      { id: "name-ttl", text: "Name and TTL only", why: "A record also needs its type and value." },
      { id: "id-flags", text: "Identification and flags only", why: "Those are DNS message header fields, not record fields." },
      { id: "ip-port", text: "Name, IP address and port", why: "Records do not carry port numbers." },
      { id: "src-dst", text: "Source IP, source port, destination IP and destination port", why: "That is the 4-tuple that identifies a TCP socket." }
    ]
  },
  {
    id: "dns-20", topic: "dns", pool: "quiz", source: "conceptual", multi: false,
    q: "What does an NS resource record such as (example.com, ns1.example.com, NS, 86400) tell a resolver?",
    options: [
      { id: "port", text: "The DNS server listens on port 86400.", why: "86400 is the TTL in seconds (one day)." },
      { id: "mail", text: "Mail for example.com goes to ns1.example.com.", why: "Mail servers are given by MX records." },
      { id: "address", text: "example.com has the IP address ns1.example.com, valid for 86400 seconds.", why: "A value that is a hostname is not an IP address; addresses come from A records." },
      { id: "alias", text: "ns1.example.com is an alias for example.com that browsers should use instead.", why: "Aliases use CNAME records." },
      { id: "auth", correct: true, text: "ns1.example.com is the authoritative DNS server for the example.com domain.", why: "Type NS maps a domain to the hostname of its authoritative DNS server." }
    ]
  },
  {
    id: "dns-21", topic: "dns", pool: "quiz", source: "conceptual", multi: false,
    q: "A resolver sends an MX query for example.com. The reply lists mail.example.com in the answer section and that host's IP address in another section. Which section carries the IP address?",
    options: [
      { id: "question", text: "The question section", why: "The question section holds the queried name and type." },
      { id: "authority", text: "The authority section", why: "The authority section describes other authoritative servers." },
      { id: "additional", correct: true, text: "The additional section", why: "The additional section supplies helpful extra records, such as a mail server's IP address in an MX reply." },
      { id: "flags", text: "The flags field", why: "Flags say query or reply, recursion desired or available, and authoritative or not." },
      { id: "header", text: "The header's identification field", why: "Identification is a 16-bit number that matches replies to queries." }
    ]
  },
  {
    id: "dns-22", topic: "dns", pool: "quiz", source: "assignment", multi: true, ref: "Assignment 1 Q2",
    q: "In a trace, a client sends a DNS query and later a response arrives. Which fields link the response to that query?",
    options: [
      { id: "ttl", text: "The response has the same TTL as the query.", why: "Queries do not carry a TTL; TTLs appear in the answer records." },
      { id: "ports", correct: true, text: "The response comes from port 53 back to the client's source port.", why: "The ports reverse direction, so the reply reaches the client's socket." },
      { id: "txid", correct: true, text: "The response carries the same 16-bit transaction ID as the query.", why: "The reply to a query uses the same identification number." },
      { id: "next-packet", text: "The response is always the very next packet number.", why: "Other packets can come between them; packet numbers do not link them." },
      { id: "rd-cleared", text: "The response clears the RD flag to show it is a reply.", why: "A separate flag marks query versus reply; RD is copied, not cleared." }
    ]
  },
  {
    id: "dns-23", topic: "dns", pool: "quiz", source: "assignment", multi: false, ref: "Assignment 1 Q13",
    q: "A DNS query goes from client port 51000 to resolver port 53. Which ports does the matching response use?",
    options: [
      { id: "reverse", correct: true, text: "Source port 53 and destination port 51000", why: "The resolver replies from its well-known port to the client's source port, so the ports reverse." },
      { id: "both-53", text: "Source port 53 and destination port 53", why: "The client's socket is on 51000, so the reply must go there." },
      { id: "new", text: "A new random source port and destination port 53", why: "The reply is sent to the client, not to port 53 on the client." },
      { id: "same", text: "Source port 51000 and destination port 53", why: "Those are the query's ports; the reply goes the other way." },
      { id: "80", text: "Source port 53 and destination port 80", why: "Port 80 is HTTP; the client's DNS socket is on 51000." }
    ]
  },
  {
    id: "dns-24", topic: "dns", pool: "quiz", source: "assignment", multi: true, ref: "Assignment 1 Q14",
    q: "In a DNS trace, the query has RD = 1 and the response has RD = 1 and RA = 1. Which interpretations are correct?",
    options: [
      { id: "rd", correct: true, text: "RD = 1 means the client asked the resolver to resolve the name recursively.", why: "Recursion desired is set by the client in its query." },
      { id: "rd-dup", text: "RD = 1 marks the response as a duplicate.", why: "RD means recursion desired, not duplicate." },
      { id: "ra", correct: true, text: "RA = 1 means the resolver supports recursion.", why: "Recursion available tells the client the server can do recursive resolution." },
      { id: "ra-auth", text: "RA = 1 means the answer is authoritative.", why: "Authority is shown by a separate flag (reply is authoritative)." },
      { id: "rd-root", text: "RD = 1 forces the client to contact the root itself.", why: "RD asks the resolver to do the work, the opposite of contacting the root yourself." }
    ]
  },
  {
    id: "dns-25", topic: "dns", pool: "exam", source: "assignment", multi: false, ref: "Assignment 1 Q15",
    q: "A response in the DNS trace has response code NXDOMAIN, 0 answers, and 1 authority record of type SOA. What does this mean?",
    options: [
      { id: "redirect", text: "The query must be resent over TCP to the server named in the SOA record, which holds the answer.", why: "NXDOMAIN does not ask the client to resend." },
      { id: "timeout", text: "The server timed out, and the SOA record is a retry timer.", why: "NXDOMAIN is a definite answer, not a timeout." },
      { id: "address", text: "The name exists, and its IP address is given inside the SOA record in the authority section.", why: "With 0 answers, no address was returned; SOA describes the zone." },
      { id: "nx", correct: true, text: "The name does not exist; the SOA record sets how long that negative answer may be cached.", why: "NXDOMAIN reports a nonexistent name. The zone's SOA in the authority section supports negative caching." },
      { id: "mx", text: "The name exists only as a mail domain without an A record.", why: "That would not give NXDOMAIN; NXDOMAIN means the name does not exist." }
    ]
  },
  {
    id: "dns-26", topic: "dns", pool: "quiz", source: "assignment", multi: true, ref: "Assignment 1 Q12",
    q: "A DNS reply in the trace has two answers: a CNAME from the queried alias to a canonical name, and an A record for the canonical name. Why are both useful to the client?",
    options: [
      { id: "cache", correct: true, text: "The client can cache both records until their TTLs expire.", why: "Each record has a TTL that limits how long it can be reused." },
      { id: "second-query", text: "The client must still send a second query for the canonical name.", why: "The A record is already in the reply, so no second lookup is needed." },
      { id: "cname", correct: true, text: "The CNAME shows which canonical host the alias really refers to.", why: "The CNAME links the alias the user typed to the real hostname." },
      { id: "a-record", correct: true, text: "The A record gives the IPv4 address the client will connect to.", why: "The client needs an address to open its connection." },
      { id: "cname-ip", text: "The CNAME's value field holds the IP address.", why: "A CNAME's value is a hostname; the address is in the A record." }
    ]
  }
);
