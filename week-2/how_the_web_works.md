1. What is HTTP?

Hypertext Transfer Protocol, the protocol that describes the request/response cycle used for client/server interactions on the intern.

2. What is a URL?

Uniform Resource Locator, a combined address for a website indicating the transfer protocol, as well as the specific file path and optional parameters.

3. What is TCP?

Transmission Control Protocol, defines how data should be split and sent across the internet.

4. What is IP?

Internet Protocol, defines the address for different clients and servers on the internet.

5. What is DNS?

Domain Name System, converts between domain names and IP addresses (i.e., like a phonebook).

6. What is idempotent?

Idempotent means an operation can be repeated many times without changing the state of the data.  A GET request is idempotent while a PUSH request is not.

7. What is a query string?

A query string is a set of key/value parameters in a URL to modify the HTTP response.  A query string beings with '?' and each parameter pair is separated by a '&'.

8. What is a path or route?

A path is the address to a specific resource within a domain name.

9. List four HTTP Verbs and their use cases.

GET, getting a resource from the server
POST, create or modify data on the server
PUT, updating data on the server
DELETE, delete data from the server

10. What is a client?

Any entity which is requesting a resource via HTTP.

11. What is a server?

An entity which is responding to an HTTP request.

12. What is an HTTP request?

A request to do something (i.e., HTTP verb) to a specific resource.

13. What is an HTTP response?

The server's answer to an HTTP request.

14. What is an HTTP header? Give a couple examples of request and response headers you have seen.

HTTP headers give additional metadata about the request/response.

Some request headers include the type, and accepts (for the type of content requested).  Some response headers include the status code and the content-type.

15. What is REST?

REST stands for Representational State Transfer, and describes a framework of best practices for building APIs.

16. What is JSON?

Javascript Object Notation, a structure used to transfer data.  Can be converted to/from a native javascript object, with a few exceptions.

17. What happens when you type in "Hello World" in google.com and press enter?

A GET HTTP request is sent to google.com with query string parameters of 'Hello World'.  Google's server constructs a response and sends it back to my computer, where my browser renders the response.

18. What does it mean when we say the web is "stateless"?

That the client and server are 'state agnostic', i.e., the request/response cycle does not depend on the state of either side of the connection.

19. What is curl?

curl is a command to send HTTP requests in a unix shell.

20. Make a GET request to the icanhazdadjoke API with curl to find all jokes involving the word "pirate." (your answer should be the curl command required).

curl https://icanhazdadjoke.com/search\?term\=pirate