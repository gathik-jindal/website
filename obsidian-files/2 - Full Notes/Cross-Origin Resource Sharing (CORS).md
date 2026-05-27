25th Jun '24, 13:56pm

Status: [[Network]]

Tags: #Small #Completed 

# Cross-Origin Resource Sharing (CORS)

Formally, **Cross-Origin Resource Sharing** ([CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS)) is an [HTTP](https://developer.mozilla.org/en-US/docs/Glossary/HTTP)-header based mechanism that allows a server to indicate any [origins](https://developer.mozilla.org/en-US/docs/Glossary/Origin) (domain, scheme, or port) other than its own from which a browser should permit loading resources.

In my understanding, it is an HTTP-header based mechanism that allows a web-page to load objects  and or data from other servers that its original origin server.

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, `fetch()` and [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) follow the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). This means that a web application using those APIs can only request resources from the same origin the application was loaded from unless the response from other origins includes the right CORS headers.

Do look at the references for more in-depth understanding of this topic.

# References
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS