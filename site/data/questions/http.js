window.QUESTION_BANK = window.QUESTION_BANK || [];
window.QUESTION_BANK.push(
  {
    id: "http-01", topic: "http", pool: "quiz", source: "inclass", multi: false, ref: "In-class Set 1 Q1",
    q: "Why might a server close an idle persistent HTTP connection?",
    options: [
      { id: "fresh-copy", text: "To ensure the next request uses the latest copy of the requested file.", why: "Freshness is handled by headers such as Last-Modified and caching headers, not by closing the connection." },
      { id: "dns-verify", text: "To force DNS to verify the server address before every request.", why: "DNS lookups are separate from the TCP connection, and the client can reuse cached DNS results anyway." },
      { id: "moved", text: "To tell the client that the requested object has moved permanently to a different URL on the server.", why: "A move is signalled with a 301 Moved Permanently response and a Location header, not by closing the connection." },
      { id: "reclaim", correct: true, text: "To reclaim connection resources when likely reuse no longer justifies their cost.", why: "Each open connection holds TCP state and buffers. After an idle timeout, the server frees them because further requests are unlikely." },
      { id: "reset-state", text: "To reset HTTP statelessness after the preceding response.", why: "HTTP is already stateless: each request is handled independently, so there is nothing to reset by closing." }
    ]
  },
  {
    id: "http-02", topic: "http", pool: "quiz", source: "inclass", multi: true, ref: "In-class Set 1 Q2",
    q: "A browser downloads objects one at a time using non-persistent HTTP. Why can many small objects take longer to download than one large object of the same total size?",
    options: [
      { id: "dns-repeat", text: "The browser must repeat the DNS lookup for each object.", why: "The objects come from the same server, so the address is already known (and cached) after the first lookup." },
      { id: "setup-rtt", correct: true, text: "Each object requires a new TCP connection, adding a connection-setup RTT.", why: "Non-persistent HTTP opens and closes a TCP connection per object, and each handshake costs one RTT." },
      { id: "more-transmit", text: "The total object transmission time increases, even at the same transmission rate.", why: "Same total bytes at the same rate means the same total transmission time; the extra cost is round trips." },
      { id: "request-rtt", correct: true, text: "Each object requires an HTTP request, adding another RTT before the response begins.", why: "Every request/response exchange costs one more RTT, so each object costs about 2 RTTs plus its transmission time." },
      { id: "router-paths", text: "Routers must compute a new path for every new TCP connection before forwarding its first segment.", why: "Routers do not know about TCP connections; they forward each datagram on its network-layer fields." }
    ]
  },
  {
    id: "http-03", topic: "http", pool: "quiz", source: "inclass", multi: true, ref: "In-class Set 1 Q3",
    q: "Five HTTP/1.1 requests are pipelined on one persistent connection. The first response is slow. Which limitations remain?",
    options: [
      { id: "new-handshake", text: "Each queued request needs a new TCP handshake before its response.", why: "All five requests share one persistent connection, so there is only one handshake." },
      { id: "tcp-loss", correct: true, text: "A lost TCP segment on the connection can delay every response behind it.", why: "All responses share one TCP byte stream, so a missing segment holds up later bytes until it is recovered." },
      { id: "retransmit-all", text: "The client must retransmit every later request when the first response is delayed.", why: "A slow response is not a lost request; TCP has already delivered the requests reliably." },
      { id: "wait-behind", correct: true, text: "Ready later responses can wait behind the first response.", why: "This is head-of-line blocking: small objects wait behind a slow or large one." },
      { id: "in-order", correct: true, text: "Responses must be sent in the order of their requests.", why: "HTTP/1.1 pipelining requires responses in request order, which is what causes the blocking." }
    ]
  },
  {
    id: "http-04", topic: "http", pool: "quiz", source: "inclass", multi: true, ref: "In-class Set 1 Q5",
    q: "At a fixed RTT, why does increasing the transmission rate usually help a 5 MB object more than a 1 KB object?",
    options: [
      { id: "reduces-term", correct: true, text: "Increasing the rate reduces the size-dependent transmission term.", why: "Raising R shrinks L/R, which matters most when L is large." },
      { id: "grows", correct: true, text: "Payload transmission time grows with object size.", why: "Transmission time is L/R, so the 5 MB object has a much larger size-dependent term." },
      { id: "distance", text: "The larger object experiences a shorter physical propagation distance.", why: "Both objects travel the same path; propagation delay depends on distance, not object size." },
      { id: "rtt-floor", correct: true, text: "The fixed round-trip portion limits gains for very small objects.", why: "A 1 KB object's time is mostly RTTs, which a faster rate does not shrink." },
      { id: "handshakes", text: "The 1 KB object needs more TCP handshakes than the 5 MB object.", why: "Each object needs one connection (or shares one); size does not change the handshake count." }
    ]
  },
  {
    id: "http-05", topic: "http", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "A company pushes an update to its chat app worldwide. Why can it do this without changing the forwarding logic in any router along the paths?",
    options: [
      { id: "dns", text: "DNS tells every router about the new application version.", why: "DNS maps names to addresses; it does not inform routers about applications." },
      { id: "router-update", text: "Routers download the new app version automatically from the server.", why: "Routers do not run application code; there is nothing for them to download." },
      { id: "transport", text: "The update rewrites the TCP implementation inside each router.", why: "TCP runs only in end systems; routers have no TCP to rewrite." },
      { id: "new-port", text: "The update moves the app to a new port that routers already know about.", why: "Routers do not track application ports when forwarding." },
      { id: "edge", correct: true, text: "The app runs at the edge, and routers only do general packet forwarding.", why: "As long as the app keeps using supported transport and network services, routers carry its packets without knowing it changed." }
    ]
  },
  {
    id: "http-06", topic: "http", pool: "exam", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "Persistent HTTP fetches eleven objects one after another over a single connection, without pipelining. Compared with eleven separate connections, what latency is avoided?",
    options: [
      { id: "transmission", text: "The transmission time of the ten later objects.", why: "Every object's bytes must still be transmitted; persistence saves handshakes, not transmission time." },
      { id: "ten-setup", correct: true, text: "Ten connection-setup RTTs; each request still adds its own RTT.", why: "Only the first object needs the TCP setup RTT. Each sequential request-response still costs an RTT." },
      { id: "nothing", text: "No latency, because persistent connections only save server memory.", why: "Persistence avoids ten handshake RTTs, which is a real latency saving." },
      { id: "all", text: "All per-object latency, so the eleven objects arrive in one RTT.", why: "Without pipelining, each request still waits for its response, one RTT each." },
      { id: "eleven-setup", text: "Eleven connection-setup RTTs, including the first one.", why: "The first object still needs the handshake that opens the persistent connection." }
    ]
  },
  {
    id: "http-07", topic: "http", pool: "quiz", source: "inclass", multi: false, ref: "Lecture discussion question",
    q: "An HTTP/2 client gives a small object high priority. Why can that change the normal transmission order but not bypass missing TCP bytes?",
    options: [
      { id: "new-conn", text: "A high-priority object opens its own separate TCP connection, which needs a full handshake first.", why: "HTTP/2 multiplexes streams over one connection; priority does not open new connections." },
      { id: "ignored", text: "HTTP/2 priorities are ignored whenever more than one stream is open on the same connection.", why: "Priorities do influence the order in which the sender transmits frames." },
      { id: "server-push", text: "Only objects sent with Server Push may skip ahead of missing bytes.", why: "No HTTP/2 frame can skip missing TCP bytes; TCP delivers the byte stream in order." },
      { id: "priority-frames", correct: true, text: "Priority picks which ready frames go first, but TCP must still deliver bytes in order.", why: "Once TCP bytes are missing, the receiver waits for ordered recovery, whatever priority later frames carry." },
      { id: "udp", text: "Priority frames are sent over UDP, which cannot recover lost bytes.", why: "HTTP/2 runs over TCP; HTTP/3 is the version that uses UDP through QUIC." }
    ]
  },
  {
    id: "http-08", topic: "http", pool: "quiz", source: "inclass", multi: true,
    q: "A page loads four objects over HTTP/3. One UDP packet carrying data for the image stream is lost. Which statements are correct?",
    options: [
      { id: "one-stream", correct: true, text: "Only the image stream waits; the other streams keep delivering.", why: "QUIC uses independent streams with per-stream loss recovery, so missing data blocks only the affected stream." },
      { id: "stall-all", text: "All four streams stall until the packet is recovered, as with HTTP/2.", why: "That is the HTTP/2-over-TCP behaviour that HTTP/3 removes." },
      { id: "cc-wide", correct: true, text: "Congestion control still applies to the connection as a whole.", why: "The lecture notes that congestion control remains connection-wide in QUIC." },
      { id: "new-transport", text: "QUIC is a third transport-layer protocol alongside TCP and UDP.", why: "QUIC is an application-layer sublayer that runs over UDP; the Internet still has two transport protocols." },
      { id: "over-tcp", text: "HTTP/3 recovers the packet using TCP retransmission.", why: "HTTP/3 runs over QUIC over UDP, not over TCP. QUIC does its own loss recovery." }
    ]
  },
  {
    id: "http-09", topic: "http", pool: "exam", source: "inclass", multi: false,
    q: "A browser opens a secure connection with HTTP/2 over TLS over TCP, and then with HTTP/3 over QUIC. Why does the QUIC connection start sending data sooner?",
    options: [
      { id: "no-reliable", text: "QUIC does not provide reliable delivery at all, so there is no connection state to set up first.", why: "QUIC provides reliability with mechanisms that closely mirror TCP's." },
      { id: "no-crypto", text: "QUIC skips encryption entirely, so it has no security handshake to perform before data flows.", why: "QUIC integrates TLS 1.3; it is always encrypted and authenticated." },
      { id: "one-handshake", correct: true, text: "QUIC sets up transport and crypto state in one handshake; TCP plus TLS needs two in a row.", why: "TCP + TLS is two serial handshakes. QUIC combines transport and security setup into a single 1-RTT handshake." },
      { id: "dns-skip", text: "QUIC does not need DNS to find the server's address.", why: "QUIC still needs the server's IP address, typically from DNS." },
      { id: "faster-links", text: "UDP packets travel faster through routers than TCP segments.", why: "Routers forward IP datagrams the same way regardless of the transport protocol inside." }
    ]
  },
  {
    id: "http-10", topic: "http", pool: "quiz", source: "inclass", multi: false,
    q: "A user returns to a site they visited earlier today over QUIC. How can the new connection send application data with 0-RTT handshake delay?",
    options: [
      { id: "dns-cache", text: "The local DNS cache stores the server's encryption keys from the earlier visit to the site.", why: "DNS caches name-to-address mappings, not encryption keys." },
      { id: "tcp-fast", text: "The browser falls back to a TCP connection that was kept open.", why: "HTTP/3 does not fall back to TCP to get 0-RTT." },
      { id: "same-socket", text: "The old QUIC connection never actually closed, so the client does not need to open a new one.", why: "0-RTT resumption is about a new connection; it uses cached state rather than an old open connection." },
      { id: "ticket", correct: true, text: "The client reuses a session ticket cached from the earlier connection to encrypt at once.", why: "The server sent a TLS session ticket at the end of the first connection; the client reuses it to send data immediately." },
      { id: "plaintext", text: "The first data is sent unencrypted until the handshake finishes.", why: "0-RTT data is encrypted using keys from the cached ticket." }
    ]
  },
  {
    id: "http-11", topic: "http", pool: "exam", source: "inclass", multi: false,
    q: "A web server restarts between two requests from the same browser and loses everything it held in memory. Why can it still answer the second request normally?",
    options: [
      { id: "persistent", text: "Persistent connections survive a server restart.", why: "A restart closes the TCP connections; the browser must open a new one." },
      { id: "stateless", correct: true, text: "HTTP is stateless, so no earlier state is needed.", why: "HTTP does not require the server to keep client state between requests." },
      { id: "dns-state", text: "DNS stores the session and sends it to the server with the request.", why: "DNS only resolves names to addresses." },
      { id: "router-cache", text: "Routers on the path replay the first request so the restarted server can rebuild its state.", why: "Routers do not store or replay application messages." },
      { id: "tcp-state", text: "TCP keeps a copy of the server's memory on the client side and restores it after the restart.", why: "TCP state lives in the endpoints and is lost if the server restarts; it does not restore application memory." }
    ]
  },
  {
    id: "http-12", topic: "http", pool: "quiz", source: "inclass", multi: true,
    q: "A file-sharing app has no central server; every user who downloads also uploads to others. Which properties of this architecture does the lecture describe?",
    options: [
      { id: "self-scaling", correct: true, text: "It is self-scaling: new peers add both capacity and demand.", why: "Each new peer brings upload capacity as well as new requests." },
      { id: "always-on", text: "It depends on an always-on server with a fixed IP address.", why: "That describes the client-server architecture." },
      { id: "dual-role", correct: true, text: "Peers both request and provide resources.", why: "P2P peers have dual roles." },
      { id: "harder", correct: true, text: "It is harder to manage because it is decentralized.", why: "Peers come and go and change addresses, which makes management harder." },
      { id: "no-direct", text: "Peers never communicate directly with one another.", why: "In P2P, peers communicate directly; it is clients in client-server that do not." }
    ]
  },
  {
    id: "http-13", topic: "http", pool: "exam", source: "inclass", multi: false,
    q: "A user clicks a link to a small base HTML file using non-persistent HTTP. Ignoring DNS, about how long until the file has fully arrived?",
    options: [
      { id: "1rtt", text: "1 RTT plus the time to transmit the file.", why: "That ignores the TCP connection setup, which costs an RTT before the request can be sent." },
      { id: "2rtt-trans", correct: true, text: "2 RTTs plus the time to transmit the file.", why: "One RTT for the first two handshake steps, one RTT for the request (sent with the third ACK) and response, plus transmission time." },
      { id: "3rtt", text: "3 RTTs plus the time to transmit the file.", why: "The request is piggybacked on the third handshake segment, so the handshake does not cost a full extra RTT." },
      { id: "trans-only", text: "Only the time to transmit the file.", why: "Connection setup and the request/response exchange each add round-trip delay." },
      { id: "2rtt", text: "Exactly 2 RTTs, since transmission time is always zero.", why: "Transmission time is L/R, which is small for a small file but not zero in general." }
    ]
  },
  {
    id: "http-14", topic: "http", pool: "quiz", source: "inclass", multi: true,
    q: "A client requests one large video (O1) and then three small objects (O2 to O4) on one connection. Compare HTTP/1.1 with HTTP/2. Which statements are correct?",
    options: [
      { id: "h2-o1-later", correct: true, text: "With HTTP/2, O1 finishes slightly later than it would alone.", why: "Its frames share the connection with the small objects, so O1 is slightly delayed." },
      { id: "h2-conns", text: "HTTP/2 opens a separate TCP connection for each object.", why: "HTTP/2 multiplexes all streams over a single connection." },
      { id: "h1-wait", correct: true, text: "With HTTP/1.1, O2 to O4 wait behind O1.", why: "HTTP/1.1 responses follow request order, so the small objects are head-of-line blocked." },
      { id: "h2-tcp-loss", correct: true, text: "With HTTP/2, a lost TCP segment can still stall all four objects.", why: "All HTTP/2 streams share one TCP connection, which delivers bytes in order." },
      { id: "h2-frames", correct: true, text: "HTTP/2 splits objects into frames and interleaves them.", why: "Interleaving frames lets small objects arrive without waiting for the large one to finish." }
    ]
  },
  {
    id: "http-15", topic: "http", pool: "exam", source: "inclass", multi: false,
    q: "A script needs to check a large file's Content-Length and Last-Modified headers without downloading the file. Which request method fits?",
    options: [
      { id: "delete", text: "DELETE", why: "DELETE asks the server to remove the resource." },
      { id: "post", text: "POST", why: "POST submits data in the request body for the server to process." },
      { id: "get", text: "GET", why: "GET returns the whole object in the body, which the script wants to avoid." },
      { id: "put", text: "PUT", why: "PUT uploads content that creates or replaces the resource." },
      { id: "head", correct: true, text: "HEAD", why: "HEAD returns the same headers as GET but without the response body." }
    ]
  },
  {
    id: "http-16", topic: "http", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 2 R11",
    q: "Why do HTTP, SMTP and POP3 run on top of TCP rather than UDP?",
    options: [
      { id: "ports", text: "Only TCP uses port numbers.", why: "UDP uses port numbers too." },
      { id: "reliable", correct: true, text: "These applications cannot tolerate lost data, so they need TCP's reliable data transfer.", why: "Web pages and email are loss-intolerant, and TCP provides reliable, ordered delivery." },
      { id: "text", text: "UDP cannot carry text.", why: "UDP carries any bytes, including text." },
      { id: "faster", text: "TCP is faster than UDP when it carries short text messages.", why: "TCP adds setup and control overhead; the reason is reliability, not speed." },
      { id: "secure", text: "TCP encrypts the data it carries, and UDP does not.", why: "Neither TCP nor UDP has built-in security." }
    ]
  },
  {
    id: "http-17", topic: "http", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 2 P1",
    q: "Which statement about HTTP is true?",
    options: [
      { id: "nonpersistent-two", text: "With non-persistent connections, one TCP segment can carry two HTTP requests.", why: "Non-persistent HTTP carries one request per connection." },
      { id: "two-pages", correct: true, text: "Two different web pages on the same server can be sent one after another over one persistent connection.", why: "Persistent connections can be reused for different pages on the same server." },
      { id: "one-request", text: "A page with text and three images is fetched with one request and four responses.", why: "Each object needs its own request; there are four requests and four responses." },
      { id: "udp", text: "HTTP/1.1 requests are carried in UDP datagrams.", why: "HTTP/1.1 and HTTP/2 run over TCP." },
      { id: "date", text: "The Date header says when the object was last modified.", why: "Date is when the response was generated; Last-Modified gives the modification time." }
    ]
  },
  {
    id: "http-18", topic: "http", pool: "exam", source: "textbook", multi: false, ref: "Textbook Ch. 2 P4a",
    code: "GET /cs453/index.html HTTP/1.1\r\nHost: gaia.cs.umass.edu\r\nConnection: keep-alive\r\n\r\n",
    q: "A browser sends this request. What is the URL of the requested document?",
    options: [
      { id: "no-host", text: "`http:///cs453/index.html`", why: "The Host header supplies the server name, so the URL has one." },
      { id: "reversed", text: "`http://index.html/cs453/gaia`", why: "This reverses the host and the path." },
      { id: "domain", text: "`http://umass.edu/gaia/cs453/index.html`", why: "The host is gaia.cs.umass.edu as written in the Host header." },
      { id: "path-host", text: "`http://cs453.gaia.umass.edu/index.html`", why: "cs453 is part of the path, not the host name." },
      { id: "right", correct: true, text: "`http://gaia.cs.umass.edu/cs453/index.html`", why: "The Host header gives the server name and the request line gives the path." }
    ]
  },
  {
    id: "http-19", topic: "http", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 2 P7",
    q: "A client needs n DNS lookups with RTTs RTT1 to RTTn before it reaches a server. TCP setup takes one RTT0 and the HTTP request/response takes one RTT0. The page is one small object with negligible transmission time. How long from click to object?",
    options: [
      { id: "dns-only", text: "RTT1 + ... + RTTn", why: "That leaves out the TCP setup and the request/response." },
      { id: "one-each", text: "RTT0 + RTT1", why: "That counts only one DNS lookup and skips the TCP setup." },
      { id: "n-rtt0", text: "n × RTT0", why: "DNS lookups have their own RTTs, and the count should not depend on n for the HTTP part." },
      { id: "one-rtt0", text: "RTT1 + ... + RTTn + RTT0", why: "This forgets either the handshake or the request/response round trip." },
      { id: "sum", correct: true, text: "RTT1 + ... + RTTn + 2 RTT0", why: "All DNS lookups happen first, then one RTT0 for TCP setup and one for the request and response." }
    ]
  },
  {
    id: "http-20", topic: "http", pool: "quiz", source: "textbook", multi: false, ref: "Textbook Ch. 2 P30",
    q: "What is a disadvantage of a browser opening a large number of simultaneous TCP connections to one site?",
    options: [
      { id: "resources", correct: true, text: "It increases resource use on the server and in the network.", why: "Each connection needs its own TCP state and buffers, and all compete for the network." },
      { id: "unencrypted", text: "It makes every connection unencrypted.", why: "Encryption does not depend on the number of connections." },
      { id: "no-dns", text: "It stops DNS from resolving the site's name.", why: "DNS works the same no matter how many connections follow." },
      { id: "fewer-objects", text: "It reduces the number of objects the browser can retrieve.", why: "Parallel connections usually let the browser fetch objects faster, not fewer." },
      { id: "no-cache", text: "It disables browser caching.", why: "Caching is unrelated to how many connections are open." }
    ]
  },
  {
    id: "http-21", topic: "http", pool: "quiz", source: "conceptual", multi: false,
    q: "A browser requests a page and receives a 301 response. What does that mean?",
    options: [
      { id: "ok", text: "The request succeeded and the content is in the body.", why: "That is 200 OK." },
      { id: "bad", text: "The server could not understand the request.", why: "That is 400 Bad Request." },
      { id: "moved", correct: true, text: "The object has moved permanently; the new URL is in the Location header.", why: "301 Moved Permanently gives the new URL in the Location header." },
      { id: "version", text: "The server does not support the HTTP version named in the request line.", why: "That is 505 HTTP Version Not Supported." },
      { id: "not-found", text: "The requested document does not exist anywhere on this server.", why: "That is 404 Not Found." }
    ]
  },
  {
    id: "http-22", topic: "http", pool: "quiz", source: "conceptual", multi: false,
    q: "A response has Date: Tue, 08 Sep 2020 and Last-Modified: Tue, 01 Mar 2016. What do the two headers tell the client?",
    options: [
      { id: "client", text: "Date is the client's request time and Last-Modified is the client's last visit.", why: "Both headers describe the server's response and object, not the client." },
      { id: "both", correct: true, text: "Date is when the response was made; Last-Modified is when the object last changed.", why: "The lecture separates the two: Date is response time, Last-Modified is object change time." },
      { id: "swapped", text: "Date is when the object last changed; Last-Modified is when it was sent.", why: "This reverses the meaning of the two headers." },
      { id: "expires", text: "The object expires on the Date value and was first created on the Last-Modified value.", why: "Neither header is an expiry date; that would be a caching header." },
      { id: "same", text: "Both give the same time in different formats.", why: "They describe two different events and here are years apart." }
    ]
  },
  {
    id: "http-23", topic: "http", pool: "quiz", source: "conceptual", multi: true,
    q: "Which descriptions of HTTP request headers are correct?",
    options: [
      { id: "user-agent-port", text: "User-Agent tells the server which TCP port to reply to.", why: "User-Agent identifies the client type; replies go to the connection's port." },
      { id: "last-mod", text: "Last-Modified in a request says when the client last visited.", why: "Last-Modified is a response header giving the object's change time." },
      { id: "language", correct: true, text: "Accept-Language lets the server negotiate content, such as French.", why: "Accept-Language enables content negotiation." },
      { id: "host", correct: true, text: "Host names the target server and is required in HTTP/1.1.", why: "Host supports proxies and virtual hosting and is required." },
      { id: "close", correct: true, text: "Connection: close asks to avoid a persistent connection.", why: "Connection: close signals that the connection should end after this exchange." }
    ]
  },
  {
    id: "http-24", topic: "http", pool: "quiz", source: "conceptual", multi: false,
    q: "A client wants to upload a new version of a document and fully replace the copy stored at a specific URL. Which method matches the lecture's description?",
    options: [
      { id: "get", text: "GET", why: "GET retrieves a resource." },
      { id: "post", text: "POST", why: "POST submits data for the server to process, such as form fields; it is not defined as replacing a URL's content." },
      { id: "head", text: "HEAD", why: "HEAD only returns headers." },
      { id: "delete", text: "DELETE", why: "DELETE removes the resource at the URL; it does not upload a new version." },
      { id: "put", correct: true, text: "PUT", why: "PUT sends content in the body to a specific URL, creating the resource or completely replacing it." }
    ]
  },
  {
    id: "http-25", topic: "http", pool: "quiz", source: "assignment", multi: false, ref: "Assignment 1 Q9",
    q: "In a trace, the HTTP/1.1 request has 'Connection: keep-alive', but a few packets later the client sends a FIN and closes the connection. How should this be interpreted?",
    options: [
      { id: "udp", text: "The client switched to UDP after the first response.", why: "HTTP/1.1 runs over TCP for the whole exchange." },
      { id: "consistent", correct: true, text: "It was meant to be persistent; the client may still close it when it has no more requests.", why: "Persistent means the connection may be reused, not that it must stay open forever. A client with no more requests can close it." },
      { id: "contradiction", text: "The trace must be corrupt, because a keep-alive connection can never be closed by either side.", why: "Persistent connections are closed when no longer needed or after an idle timeout." },
      { id: "server-only", text: "Only the server may close a persistent connection, so the FIN must really have come from the server.", why: "Either side can close a TCP connection." },
      { id: "http10", text: "The FIN shows the request was really HTTP/1.0.", why: "The request line gives the version; closing a connection does not change it." }
    ]
  },
  {
    id: "http-26", topic: "http", pool: "exam", source: "assignment", multi: false, ref: "Assignment 1 Q20",
    q: "In the assignment traces, the HTTP/1.0 request has no Host header, but the HTTP/1.1 request does. Why can the HTTP/1.0 request leave it out?",
    options: [
      { id: "dns", text: "HTTP/1.0 clients send the host name to the server inside the DNS query instead of a header.", why: "DNS queries go to a resolver, not to the web server." },
      { id: "required-11", correct: true, text: "Host is required in HTTP/1.1 but optional in HTTP/1.0, which predates virtual hosting.", why: "HTTP/1.1 made Host mandatory so one IP address can serve many hostnames; HTTP/1.0 did not require it." },
      { id: "persistent", text: "HTTP/1.0 connections are persistent, so the server already knows the host from earlier requests.", why: "HTTP/1.0 connections in the trace are non-persistent, and persistence is unrelated to Host." },
      { id: "port", text: "HTTP/1.0 encodes the host name in the destination port.", why: "Ports identify processes, not host names." },
      { id: "ip-header", text: "HTTP/1.0 puts the host name in the IP header.", why: "IP headers carry addresses, not host names." }
    ]
  },
  {
    id: "http-27", topic: "http", pool: "quiz", source: "assignment", multi: false, ref: "Assignment 1 Q23",
    q: "In the cleartext HTTP/2 trace, the client's two requests use stream IDs 1 and 3. Why are client-initiated stream IDs odd?",
    options: [
      { id: "tcp-ports", text: "The stream ID is the client's TCP source port divided by two, which always comes out odd.", why: "Stream IDs are chosen by HTTP/2, independently of TCP ports." },
      { id: "lost", text: "Streams 2 and 4 were lost and had to be retransmitted.", why: "Stream IDs are not sequence numbers; even IDs are reserved for the server." },
      { id: "rule", correct: true, text: "HTTP/2 reserves odd IDs for client-opened streams and even IDs for server-opened ones.", why: "Splitting the ID space by parity lets both endpoints open streams without picking the same number." },
      { id: "random", text: "Stream IDs are random, and both happened to be odd.", why: "Stream IDs follow a fixed rule: odd for the client, increasing." },
      { id: "frames", text: "Each request uses two streams, one for its HEADERS frame and another for its DATA frames.", why: "One stream carries both the HEADERS and DATA frames of a request/response." }
    ]
  },
  {
    id: "http-28", topic: "http", pool: "quiz", source: "assignment", multi: true, ref: "Assignment 1 Q24",
    q: "In the HTTP/2 trace, DATA frames for streams 1 and 3 appear in the order 1, 3, 1, 3 on one TCP connection. Which statements are correct?",
    options: [
      { id: "interleave", correct: true, text: "Interleaved frames from two streams on one connection demonstrate multiplexing.", why: "Both responses are in progress at once over a single connection." },
      { id: "finish-first", text: "Stream 1 must finish entirely before any stream 3 frame may be sent.", why: "That would be HTTP/1.1-style ordering; HTTP/2 interleaves frames." },
      { id: "own-conn", text: "Each stream must use its own TCP connection.", why: "All streams share one TCP connection in HTTP/2." },
      { id: "end-stream", correct: true, text: "END_STREAM marks the last frame a side sends on a stream.", why: "The END_STREAM flag tells the peer that this side has finished the stream." },
      { id: "types", correct: true, text: "HEADERS frames carry the header block; DATA frames carry the bodies.", why: "HTTP/2 splits a message into a HEADERS frame and DATA frames." }
    ]
  },
  {
    id: "http-29", topic: "http", pool: "quiz", source: "assignment", multi: false, ref: "Assignment 1 Q10",
    q: "Using Follow TCP Stream on the unencrypted HTTP trace shows the request line, headers and page body. What would an observer see if the same exchange used HTTPS?",
    options: [
      { id: "headers-only", text: "The HTTP headers in clear text, with only the body encrypted, since routers must read headers.", why: "TLS encrypts the whole HTTP message, headers included." },
      { id: "nothing", text: "Nothing at all, not even the IP addresses or ports.", why: "IP and TCP headers must stay readable so routers and hosts can deliver the packets." },
      { id: "encrypted", correct: true, text: "IP addresses, ports and encrypted bytes, but not the HTTP request, headers or body.", why: "TLS encrypts the HTTP messages; the network and transport headers stay visible." },
      { id: "same", text: "Exactly the same data, because HTTPS only changes the server's port number from 80 to 443.", why: "HTTPS adds TLS encryption, not just a different port (443)." },
      { id: "dns-hidden", text: "Only the DNS reply, because HTTPS hides all TCP segments.", why: "TCP segments are still visible; their payload is encrypted." }
    ]
  }
);
