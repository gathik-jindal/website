12th May '26, 09:45am

Status: #ProperNotes #InProgress 

Tags: [[Web Dev]] [[Network]] [[JavaScript]]

# Details on Web Domains

## The difference between the World Wide Web and the Internet

Internet is broader term for whole computer network no matter what protocol computers (servers) use. The world-wide-web is a narrower term denoting computers/network that provides access to hypertext (i.e. web pages) via HTTP/HTTPS protocols.

If www uses http/https protocol then why are they used together? is this not redundant?

The main reason this question pops up is because we often confuse the two, previously (the 90s) when the webpage was not always the front page to anyone's company/server there would be different ways to access this server. Those were using `ftp` or `mail` or `https`. To differentiate between these `www`, `ftp` and `mail` became subdomains.

Though `ftp` and `mail` are not used anymore, companies still attach `www` to their main webpage because there could be subdomains for different departments. Nowadays the `www` is attach automatically by the DNS server.

# References
Google