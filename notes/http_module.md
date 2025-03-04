The `http` module in Node.js is a core module that enables developers to create HTTP servers and clients, facilitating data transfer over the Hyper Text Transfer Protocol (HTTP). It provides essential functionalities to handle HTTP requests and responses, making it fundamental for building web applications and services.

**Creating an HTTP Server**

To create an HTTP server using the `http` module, you first need to import it and then utilize the `createServer` method. Here's a basic example:


```javascript
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the response HTTP header with status and content type
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Send the response body
  res.end('Hello, World!\n');
});

// Listen on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```


In this example, the server listens on port 3000 and responds with "Hello, World!" to any incoming HTTP requests. The `createServer` function takes a callback that receives the request (`req`) and response (`res`) objects, allowing you to handle incoming requests and define responses.

**Making HTTP Requests**

The `http` module also allows you to make HTTP requests as a client. You can use the `http.request` method to send requests to other servers. Here's how you can perform a simple GET request:


```javascript
const http = require('http');

// Options for the HTTP request
const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/',
  method: 'GET'
};

// Make the request
const req = http.request(options, (res) => {
  let data = '';

  // A chunk of data has been received.
  res.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received.
  res.on('end', () => {
    console.log(data);
  });
});

// Handle request errors
req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

// End the request
req.end();
```


In this script, an HTTP GET request is sent to 'www.example.com'. The response data is collected in chunks and logged once the entire response is received. The `req.end()` method signals the end of the request.

**Advanced Features**

The `http` module provides advanced features such as managing connection persistence through the `Agent` class. An `Agent` handles the pooling of sockets used in HTTP client requests, enabling the reuse of connections for multiple requests to the same host and port. This can improve performance by reducing the overhead of establishing new connections. citeturn0search2

For more comprehensive applications, developers often use frameworks like Express, which build upon the `http` module to provide higher-level abstractions and additional features, simplifying the development process.

In summary, the `http` module is a fundamental part of Node.js, offering the necessary tools to create and manage HTTP servers and clients, and serving as the foundation for more advanced web frameworks. 

In Node.js's `http` module, `response.setHeader()` and `response.writeHead()` are both used to set HTTP response headers, but they function differently and are used at different stages of the response lifecycle. 🚀

**`response.setHeader(name, value)`**:
- **Purpose**: Sets a single HTTP header value for the response.
- **Usage**: Call this method multiple times to set multiple headers before the response headers are sent.
- **Behavior**: Headers set using `setHeader` are queued and will be sent when the response is flushed. You can modify or add headers up until the point when they are sent.

**`response.writeHead(statusCode[, statusMessage][, headers])`**:
- **Purpose**: Sends the response status code, optional status message, and response headers to the client.
- **Usage**: Call this method once to send all headers at once, along with the status code, typically before writing any body data.
- **Behavior**: Once `writeHead` is called, the response headers are sent immediately, and you cannot modify headers afterward. This method also overrides any headers previously set with `setHeader`.

**Key Differences**:
- **Timing**: `setHeader` is used to set headers before they are sent and can be called multiple times. `writeHead` sends headers immediately and should be called only once.
- **Flexibility**: `setHeader` allows for incremental setting of headers and modifications up until they are sent. `writeHead` requires all headers to be specified at once and prevents further modifications.
- **Status Code**: `writeHead` allows setting the HTTP status code and optional status message, whereas `setHeader` does not.

**Example Usage**:


```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Using setHeader to set headers incrementally
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('X-Custom-Header', 'CustomValue');

  // Later in the code, sending the status code and headers
  res.writeHead(200); // Headers are now sent

  res.end('Hello, world!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```


In this example, `setHeader` is used to set headers before they are sent, and `writeHead` sends the status code and finalizes the headers.

It's important to note that once `writeHead` is called, any further attempts to set headers using `setHeader` will result in an error, as the headers have already been sent.

For more detailed information, refer to the [Node.js HTTP module documentation](https://nodejs.org/api/http.html). 

```js
//ROUGH 📝

//http module
import http from "http";
import fs from "fs";
import "dotenv/config";

const indexHtml = fs.readFileSync("index.html", "utf8"); //mocking static-hosting
const dataJson = fs.readFileSync("data.json", "utf8");
const notFound = fs.readFileSync("notFound.html", "utf8");
const product = JSON.parse(fs.readFileSync("data.json", "utf8"))[0]; //1 product

const data = { age: 29 };

const server = http.createServer((req, res) => {
  //res.end(JSON.stringify({ message: "Hello, World!.. Using 'http' module ✅." }));
  //res.hasHeader("DummyContent", "DummyValue");
  //res.setHeader("Content-Type", "text/html");
  console.log(`${req.method} ${req.url}`);

  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.end(indexHtml);
      break;
    case "/api":
      res.setHeader("Content-Type", "application/json");
      res.end(dataJson);
      break;
    case "/product":
      res.setHeader("Content-Type", "text/html");
      let modified = indexHtml.replace("**title**", product.title);
      res.end(modified);
      break;
    default:
      //res.writeHead(404);
      res.statusCode = 404;
      res.end(notFound);
  }

  //res.setHeader("Content-Type", "application/json");
  //res.writeHead(200); // HTTP status code 200 (OK)
  //res.end(`<h1>Hello, World!.. Using 'http' module. ✅</h1>`); // HTML response
  //res.end(dataJson);
  //console.log(`${req.method} ${req.url}`); // Log request method and URL
  //GET /
  //GET / favicon.ico;
});

server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT} ✔️`);
});
```