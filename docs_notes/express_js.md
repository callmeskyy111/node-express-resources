### ExpressJs ✅

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It simplifies the process of creating server-side applications by offering a suite of built-in functionalities and a vast ecosystem of middleware.

**Key Features of Express.js:**

1. **Robust Routing:** Express.js offers a powerful routing mechanism, allowing developers to define routes for various HTTP methods and URL paths. This facilitates the organization of application endpoints and the handling of different client requests efficiently.

2. **Middleware Support:** Middleware functions in Express.js are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. They can execute code, modify the request and response objects, end the request-response cycle, and call the next middleware function. This modular approach promotes code reusability and separation of concerns.

3. **Template Engines:** Express.js supports various template engines like Pug, EJS, and Handlebars, enabling developers to generate dynamic HTML content by embedding JavaScript code within templates.

4. **Static File Serving:** It provides a straightforward way to serve static files such as images, CSS, and JavaScript files using the built-in middleware `express.static`.

5. **RESTful API Development:** Express.js is widely used for building RESTful APIs due to its simplicity and flexibility. It allows for the seamless handling of JSON and URL-encoded data, making it ideal for developing APIs that interact with frontend applications or other services.

**Basic Usage Example:**

Below is a simple example of an Express.js application that sets up a server and defines a route to handle GET requests to the root URL (`/`):


```javascript
// Importing the Express library
const express = require('express');

// Initializing the app
const app = express();

// Defining a route handler for GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Starting the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```


In this example, when a client makes a GET request to `http://localhost:3000/`, the server responds with "Hello, World!".

**Middleware Example:**

Middleware functions can perform various operations, such as logging requests, parsing incoming data, or handling errors. Here's an example of a simple logging middleware:


```javascript
// Middleware function to log request details
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next(); // Pass control to the next middleware function
});

// Route handler
app.get('/', (req, res) => {
  res.send('Middleware example');
});
```


In this case, every incoming request's method and URL are logged to the console before proceeding to the route handler.

**Routing Example:**

Express.js allows defining multiple routes to handle different endpoints:


```javascript
// Route for the home page
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

// Route for the about page
app.get('/about', (req, res) => {
  res.send('About Us');
});

// Route for the contact page
app.get('/contact', (req, res) => {
  res.send('Contact Us');
});
```


Each route corresponds to a specific URL path and HTTP method, enabling the application to respond appropriately to various client requests.

### MidddleWares ✅
Express.js is widely adopted in the industry and is a fundamental part of the Node.js ecosystem, making it an excellent choice for developers looking to build efficient and scalable server-side applications. 

In Express.js, **middleware** functions are pivotal in handling requests and responses within an application. They operate as intermediaries that process requests before they reach the final route handler or after the response has been generated. This modular approach allows developers to build scalable and maintainable web applications by separating concerns and reusing code effectively.

**Key Characteristics of Middleware:**

- **Execution of Code:** Middleware can execute any code, enabling functionalities like logging, authentication, and more.

- **Modification of Request and Response Objects:** They can alter the `req` (request) and `res` (response) objects to append or modify data.

- **Ending the Request-Response Cycle:** Middleware can conclude the request-response cycle, for instance, by sending a response directly to the client.

- **Passing Control to the Next Middleware:** If a middleware doesn't end the cycle, it must invoke the `next()` function to pass control to the subsequent middleware in the stack. citeturn0search1

**Types of Middleware in Express.js:**

1. **Application-Level Middleware:** These are bound to an instance of the Express app using `app.use()` or `app.METHOD()`, where `METHOD` is an HTTP method like GET or POST.

   *Example:*

   ```javascript
   const express = require('express');
   const app = express();

   // Application-level middleware
   app.use((req, res, next) => {
     console.log('Time:', Date.now());
     next();
   });

   app.get('/', (req, res) => {
     res.send('Home Page');
   });

   app.listen(3000);
   ```


2. **Router-Level Middleware:** These are similar to application-level middleware but are bound to an instance of `express.Router()`.

   *Example:*

   ```javascript
   const express = require('express');
   const app = express();
   const router = express.Router();

   // Router-level middleware
   router.use((req, res, next) => {
     console.log('Request URL:', req.originalUrl);
     next();
   });

   router.get('/user/:id', (req, res) => {
     res.send(`User ID: ${req.params.id}`);
   });

   app.use('/user', router);

   app.listen(3000);
   ```


3. **Error-Handling Middleware:** Defined with four arguments (`err`, `req`, `res`, `next`), these middleware functions handle errors that occur in the application.

   *Example:*

   ```javascript
   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).send('Something broke!');
   });
   ```


4. **Built-in Middleware:** Express.js comes with built-in middleware functions, such as `express.static` for serving static files and `express.json` for parsing JSON payloads. citeturn0search3

   *Example:*

   ```javascript
   app.use(express.json()); // To parse JSON bodies
   app.use(express.static('public')); // To serve static files from the 'public' directory
   ```


5. **Third-Party Middleware:** These are middleware functions created by the community, offering functionalities like cookie parsing, session handling, and more.

   *Example:*

   ```javascript
   const cookieParser = require('cookie-parser');
   app.use(cookieParser());
   ```


Middleware functions are executed sequentially in the order they're defined. If a middleware doesn't end the request-response cycle, it should call `next()` to pass control to the next middleware; otherwise, the request will be left hanging.

Understanding and effectively utilizing middleware is essential for building robust and modular Express.js applications. By leveraging different types of middleware, developers can handle various aspects of request and response processing, leading to cleaner and more maintainable codebases. 

### Morgan ✅
In Node.js and Express applications, **Morgan** is a middleware used for logging HTTP requests and errors. It simplifies the process of tracking incoming requests, providing valuable insights for debugging and monitoring. citeturn0search3

**Key Features of Morgan:**

- **Predefined Formats:** Morgan offers various logging formats, such as 'dev', 'combined', 'common', 'short', and 'tiny', allowing developers to choose the level of detail appropriate for their environment.

- **Custom Tokens:** Developers can define custom tokens to include specific information in logs, enhancing the granularity of logged data. citeturn0search6

- **Stream Options:** Morgan allows directing log output to different destinations, such as the console or log files, by configuring the stream option.

**Integrating Morgan into an Express Application:**

To incorporate Morgan into your Express application, follow these steps:

1. **Install Morgan via npm:**

   ```bash
   npm install morgan
   ```


2. **Require and use Morgan in your application:**

   ```javascript
   const express = require('express');
   const morgan = require('morgan');
   const app = express();

   // Use Morgan middleware with the 'dev' format
   app.use(morgan('dev'));

   // Define your routes
   app.get('/', (req, res) => {
     res.send('Hello, World!');
   });

   // Start the server
   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
   ```


   In this example, Morgan logs HTTP requests to the console using the 'dev' format, which provides concise colored output suitable for development environments. citeturn0search3

By integrating Morgan into your Node.js applications, you gain a powerful tool for monitoring and debugging HTTP requests, leading to more maintainable and robust server-side code. 

```javascript
//Practice Code
import express from "express";
import products from "./data.json" with { type: "json" };
import morgan from 'morgan'

const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares must be called on top, as parsing goes from T-B
app.use(express.json()); //built-in middleware (Earlier, bodyParser)
app.use(morgan('dev'));
//app.use(express.urlencoded());

app.use(express.static('public')); //For html/json, all, directly.. STATIC Folder


// Custom Middleware Fx
const authMiddleware = (req, res, next) => {
    console.log(req.query);
    if(req.body.password==='123'){
        next();
    }else{
        res.sendStatus(401);
    }
};

// Custom middlewares
app.use((req, res, next) => {
  console.log(`🛠️  CUSTOM MIDDLEWARE 1 - Time: ${new Date().toISOString()}`);
  next();
});
// app.use((req, res, next) => {
//     //!custom logger-middleware
//     console.log(`🛠️  CUSTOM MIDDLEWARE 2 - METHOD: ${req.method}, URL: ${req.url}, HOSTNAME: ${req.hostname}, USER-AGENT: ${req.get('User-Agent')}`);
//     next();
// })

//app.use(authMiddleware);

// Basic END-POINTS / APIs / ROUTEs
app.get("/",authMiddleware, (req, res) => {
    res.json({type:'GET'})
});

app.post("/", authMiddleware,(req, res) => {
    res.json({type:'POST'});
});

app.get("/products/:id", (req, res) => {
    console.log('ID from params:',req.params.id);
    res.json({type:'GET/products/' + req.params.id, success: true, message: `The ID is: ${req.params.id}`});
})

app.put("/", (req, res) => {
    res.json({type:'PUT'});
});

app.delete("/", (req, res) => {
    res.json({type:'DELETE'});
});

app.patch("/", (req, res) => {
    res.json({type:'PATCH'});
});

app.get("/demo", (req, res) => {
  //! 3 Ways To Send DATA
  //res.send(`<h2>API Working ✅</h2>`);
  //res.sendFile("/Users/ASUS/Desktop/nodejs/coder-dost/index.html"); //absolute path
  res.status(200).json({success:true, message: 'All products fetched✅', totalProducts: products.products.length, data:products})
});

app.listen(PORT,() => {
  console.log(`Server is running on port-${PORT} 🛜`);
});


//⭐Summary:
//A) How to take data from response? - 1️⃣res.send(), 2️⃣res.json({}), 3️⃣res.sendFile().
//B) How to take data from request? - 1️⃣req.body(), 2️⃣req.query, 3️⃣req.params. (Better for SEO)
```

Here's a summary of the provided Express.js code, highlighting key concepts and functionalities:

**1. Importing Modules:**
- **Express:** Imported using `import express from "express";` to create the application instance.
- **JSON Data:** The line `import products from "./data.json" with { type: "json" };` attempts to import JSON data. However, as of Node.js v17.5.0, importing JSON modules requires an import assertion:

  
```javascript
  import products from './data.json' assert { type: 'json' };
  ```


  Ensure your environment supports this syntax. citeturn0search10

- **Morgan:** Imported using `import morgan from 'morgan';` to enable HTTP request logging middleware.

**2. Application Setup:**
- **Instance Creation:** `const app = express();` initializes the Express application.
- **Port Configuration:** `const PORT = process.env.PORT || 8080;` sets the server to listen on a specified port, defaulting to 8080 if not provided.

**3. Middleware Usage:**
- **Built-in Middleware:**
  - `express.json()`: Parses incoming JSON requests.
  - `express.static('public')`: Serves static files from the 'public' directory.
- **Third-party Middleware:**
  - `morgan('dev')`: Logs HTTP requests in the 'dev' format.
- **Custom Middleware:**
  - **Authentication Middleware:** Checks if `req.body.password` equals '123'. If true, calls `next()` to proceed; otherwise, sends a 401 Unauthorized response.
  - **Logging Middleware:** Logs request details like method, URL, hostname, and user-agent.

**4. Route Definitions:**
- **Root Route (`"/"`):** Supports GET and POST methods. Both routes utilize the authentication middleware.
- **Product Route (`"/products/:id"`):** Handles GET requests to fetch a product by its ID, accessed via `req.params.id`.
- **HTTP Method Routes:** Defines routes for PUT, DELETE, and PATCH requests on the root path.
- **Demo Route (`"/demo"`):** Responds with JSON data from the imported `products` object, including metadata like success status, message, and total product count.

**5. Server Initialization:**
- `app.listen(PORT, () => { console.log(\`Server is running on port-${PORT} 🛜\`); });` starts the server and logs the active port

**Summary Notes:**
- **Sending Data in Responses:**
  - `res.send()`:Sends a plain text or HTML response
  - `res.json({})`:Sends a JSON-formatted response
  - `res.sendFile()`:Serves a file as the response
- **Accessing Data from Requests:**
  - `req.body`:Contains data sent in the request body (requires middleware like `express.json()` to parse)
  - `req.query`:Holds query parameters from the URL
  - `req.params`:Captures route parameters defined in the URL path
This code demonstrates setting up an Express.js server with various middleware and route handlers, showcasing how to manage requests and responses effectively 