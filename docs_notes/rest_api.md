### **What Are REST APIs in Node.js/Express.js?**  
A **REST API (Representational State Transfer API)** is a web service that follows a set of architectural principles to allow communication between a client and a server over HTTP. In **Node.js and Express.js**, REST APIs enable us to handle client requests and send structured responses in JSON format.

---

### **How Are REST APIs Different from Regular APIs?**
| Feature          | REST API                      | Regular API |
|----------------|-----------------------------|-------------|
| **Architecture** | Follows REST principles (stateless, resource-based) | Can follow any architecture (SOAP, GraphQL, RPC, etc.) |
| **Protocol** | Uses HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`) | Can use different protocols (HTTP, WebSockets, FTP, etc.) |
| **Data Format** | Mostly JSON (sometimes XML) | JSON, XML, or other formats |
| **Statefulness** | Stateless (each request is independent) | Can be stateful (depends on session/cookies) |
| **URL Structure** | Uses structured endpoints (`/users`, `/products/:id`) | No strict URL structure |
| **Scalability** | Highly scalable due to stateless nature | Can be harder to scale |

---

### **How REST Works in Express.js**
In **Express.js**, we can define RESTful routes to handle different HTTP methods:

```javascript
import express from "express";

const app = express();
app.use(express.json());

// Example REST API endpoints
app.get("/users", (req, res) => res.json({ message: "Fetch all users" })); // Read all
app.post("/users", (req, res) => res.json({ message: "Create a new user" })); // Create
app.get("/users/:id", (req, res) => res.json({ message: `Get user ${req.params.id}` })); // Read single
app.put("/users/:id", (req, res) => res.json({ message: `Update user ${req.params.id}` })); // Update
app.delete("/users/:id", (req, res) => res.json({ message: `Delete user ${req.params.id}` })); // Delete

app.listen(3000, () => console.log("Server running on port 3000"));
```

Each route follows **REST principles**, representing a resource (`/users`) and acting on it via HTTP methods.

---

### **Conclusion**
- **REST APIs** are a subset of **web APIs** that follow REST principles.  
- **They use HTTP methods** like `GET`, `POST`, `PUT`, `DELETE`, and `PATCH`.  
- **Stateless & scalable**, making them ideal for modern web and mobile applications.  
- **Implemented easily** in Node.js with Express.js.

### **What is BASE URL in Express.js/Node.js?**  

In **Express.js**, the **Base URL** refers to the **root part** of an API or web application. It serves as the **foundation** for all endpoints (routes) in the application.  

For example, if our API is running on:  
```
http://localhost:3000
```
Then the **Base URL** is:
```
http://localhost:3000
```
All API endpoints are built on top of this base URL:
- `http://localhost:3000/users`
- `http://localhost:3000/products`
- `http://localhost:3000/orders`

---

### **How is BASE URL Used in Express.js?**
We don’t **explicitly** define the **Base URL** in Express.js. Instead, we define the **routes**, and the base URL is determined by the host and port where the server is running.

#### **Example: Defining Routes**
```javascript
import express from "express";

const app = express();
const PORT = 3000; // Base URL is derived from this port

// Routes
app.get("/users", (req, res) => {
  res.json({ message: "List of users" });
});

app.get("/products", (req, res) => {
  res.json({ message: "List of products" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```
Here, the **Base URL** is:
```
http://localhost:3000
```
And the complete API endpoints are:
- `http://localhost:3000/users`
- `http://localhost:3000/products`

---

### **How to Use BASE URL in Frontend Requests?**
When making API requests from a frontend (like React), we **store the base URL in an environment variable**:

#### **Example (React Frontend - Fetch API)**
```javascript
const BASE_URL = "http://localhost:3000";

fetch(`${BASE_URL}/users`)
  .then(response => response.json())
  .then(data => console.log(data));
```

---

### **Can We Set a Custom BASE URL in Express.js?**
Yes! We can use an **API versioning approach** or a **Router** to organize our base URL.

#### **Example: Using a Router with a Custom Base URL**
```javascript
import express from "express";

const app = express();
const PORT = 3000;

const userRouter = express.Router();

// Define routes inside the router
userRouter.get("/", (req, res) => {
  res.json({ message: "List of users" });
});
userRouter.get("/:id", (req, res) => {
  res.json({ message: `User with ID ${req.params.id}` });
});

// Use '/api/v1/users' as the base URL for this router
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```
Here, the **Base URL** is:  
```
http://localhost:3000/api/v1
```
And the complete endpoints are:
- `http://localhost:3000/api/v1/users`
- `http://localhost:3000/api/v1/users/123`

---

### **Conclusion**
- **Base URL** is the root address of an API (e.g., `http://localhost:3000`).
- Express.js **derives it from the server’s port & hostname**.
- We use it in frontend requests to keep API calls dynamic.
- We can **structure it better** using Express.js **Routers**.

```js 
import express from "express";
import productsArr from "./data.json" with { type: "json" };
const products = productsArr.products; //for better readability

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
// RESTful APIs - CRUD
//! CREATE ➕
app.post("/products", (req, res) => {
    const newProduct = { _id: Date.now() , ...req.body};
    products.push(newProduct);
    res.status(201).json({ success: true, message:'Product Added Successfully ✅' ,product: newProduct });
});

//! READ 📖
app.get('/products',(req,res)=>{
    res.json(products);
})

app.get("/products/:id", (req, res) => {
  const productId = Number(req.params.id); // Convert to a number
  const product = products.find((p) => p._id === productId);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.json({ success: true, product });
});

//! UPDATE 🔧
app.put('/products/:id',(req,res)=>{
    const productId = Number(req.params.id);
    const productIdx = products.findIndex((p) => p._id === productId);
    if(productIdx === -1){
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    products.splice(productIdx, 1, {_id: productId,...req.body});
    res.json({ success: true, message: "Product updated successfully", product: products[productIdx] });
});

app.patch('/products/:id',(req,res)=>{
    const productId = Number(req.params.id);
    const productIdx = products.findIndex((p) => p._id === productId);
    const product = products[productIdx];
    if(productIdx === -1){
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    products.splice(productIdx, 1, {...product, ...req.body});
    res.json({ success: true, message: "Product updated successfully", product });
});

//! DELETE 🚮
app.delete('/products/:id',(req,res)=>{
    const productId = Number(req.params.id);
    const productIdx = products.findIndex((p) => p._id === productId);
    if(productIdx === -1){
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    const product = products[productIdx];
    products.splice(productIdx,1);
    res.status(201).json({ success: true, message: "Product deleted successfully ✅", product });
});


app.listen(PORT, () => {
  console.log(`Server is running on port-${PORT} 🛜`);
});
```
## **📌 Summary of the Express.js CRUD API Code**

This Express.js application sets up a **RESTful API** to manage products using in-memory storage (i.e., a `products` array). It includes **CRUD operations** (Create, Read, Update, Delete) for products.

---

## **1️⃣ Setup & Imports**
```js
import express from "express";
import productsArr from "./data.json" with { type: "json" };
const products = productsArr.products; // For better readability
```
- `express`: Imported to create and manage the web server.
- `productsArr`: Imported from `data.json` (ensuring it's loaded as JSON).
- `products`: Extracts the products array from `data.json` for better readability.

---

## **2️⃣ Server Initialization**
```js
const app = express();
const PORT = process.env.PORT || 8080;
```
- **`app`**: Initializes an Express app.
- **`PORT`**: Sets the server port, using `8080` as the default if `process.env.PORT` is not set.

---

## **3️⃣ Middleware**
```js
app.use(express.json());
```
- **`express.json()`**: Parses incoming JSON requests and makes data available in `req.body`.

---

## **4️⃣ CRUD Operations**
### **🟢 Create (POST)**
```js
app.post("/products", (req, res) => {
    const newProduct = { _id: Date.now(), ...req.body };
    products.push(newProduct);
    res.status(201).json({ success: true, message: 'Product Added Successfully ✅', product: newProduct });
});
```
- **Creates a new product** by assigning a unique `_id` (using `Date.now()`).
- **Extracts product details** from `req.body`.
- **Adds** the product to the `products` array.
- **Responds** with a `201 Created` status and the new product.

---

### **🟡 Read (GET)**
#### 📌 **Get All Products**
```js
app.get('/products', (req, res) => {
    res.json(products);
});
```
- Returns **all products** as a JSON response.

#### 📌 **Get a Product by ID**
```js
app.get("/products/:id", (req, res) => {
  const productId = Number(req.params.id); // Convert ID from string to number
  const product = products.find((p) => p._id === productId);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.json({ success: true, product });
});
```
- Extracts `id` from `req.params.id`.
- **Searches** for the product in `products` array.
- If **not found**, returns `404 Not Found`.
- If found, returns the product.

---

### **🟠 Update (PUT & PATCH)**
#### 📌 **PUT (Full Update)**
```js
app.put('/products/:id', (req, res) => {
    const productId = Number(req.params.id);
    const productIdx = products.findIndex((p) => p._id === productId);

    if (productIdx === -1) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    products.splice(productIdx, 1, { _id: productId, ...req.body });
    res.json({ success: true, message: "Product updated successfully", product: products[productIdx] });
});
```
- **Finds the product** by `id`.
- If **not found**, returns `404 Not Found`.
- **Replaces the entire product** with new data from `req.body`.
- Returns updated product.

#### 📌 **PATCH (Partial Update)**
```js
app.patch('/products/:id', (req, res) => {
    const productId = Number(req.params.id);
    const productIdx = products.findIndex((p) => p._id === productId);
    const product = products[productIdx];

    if (productIdx === -1) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    products.splice(productIdx, 1, { ...product, ...req.body });
    res.json({ success: true, message: "Product updated successfully", product });
});
```
- **Finds the product** by `id`.
- If **not found**, returns `404 Not Found`.
- **Merges existing product** with `req.body` (keeps old values if new ones aren't provided).
- Returns updated product.

---

### **🔴 Delete (DELETE)**
```js
app.delete('/products/:id', (req, res) => {
    const productId = Number(req.params.id);
    const productIdx = products.findIndex((p) => p._id === productId);

    if (productIdx === -1) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    const product = products[productIdx];
    products.splice(productIdx, 1);
    res.status(201).json({ success: true, message: "Product deleted successfully ✅", product });
});
```
- **Finds product** by `id`.
- If **not found**, returns `404 Not Found`.
- **Removes product** from the array.
- Returns `201 Created` with deleted product details.

---

## **5️⃣ Server Start**
```js
app.listen(PORT, () => {
  console.log(`Server is running on port-${PORT} 🛜`);
});
```
- Starts the **Express server**.
- **Logs** the port number.

---

## **📝 Key Takeaways**
✅ **Middleware**: `express.json()` enables parsing JSON request bodies.  
✅ **CRUD Operations**:  
   - **Create**: `POST /products`  
   - **Read**: `GET /products`, `GET /products/:id`  
   - **Update**: `PUT /products/:id` (full update), `PATCH /products/:id` (partial update)  
   - **Delete**: `DELETE /products/:id`  
✅ **Error Handling**: Each route checks if the product exists before updating/deleting.  
✅ **Data Storage**: Products are stored in a **temporary array** (not a database).  
✅ **Dynamic Route Parameters**: Uses `req.params.id` to retrieve specific products.  

The Model-View-Controller (MVC) architecture is a design pattern that separates an application into three interconnected components: Model, View, and Controller. This separation facilitates modular development, making applications more manageable, scalable, and maintainable. citeturn0search1

**1. Model**

The Model represents the data layer of the application. It defines the structure of data, the format, and the constraints with which it is stored. In a Node.js application, Models often interact with databases, handling data retrieval, insertion, and validation. citeturn0search1

**2. View**

The View is the presentation layer that displays data to the user. It is responsible for rendering the user interface, presenting data from the Model in a format suitable for interaction. In Node.js applications, Views are often implemented using templating engines like Pug or EJS, which generate HTML pages dynamically based on data from the Model. citeturn0search0

**3. Controller**

The Controller acts as an intermediary between the Model and the View. It handles user input, processes it (often involving business logic), and determines which View to render with which data. In Express.js, Controllers are typically functions mapped to specific routes, managing the flow of data between the Model and the View. citeturn0search5

**Benefits of MVC in Node.js/Express.js**

- **Maintainability**: By separating concerns, MVC allows developers to manage and update each component independently, enhancing code maintainability. citeturn0search11

- **Scalability**: The modular nature of MVC supports the growth of applications, enabling teams to add new features without disrupting existing functionality. citeturn0search11

- **Reusability**: Components within the MVC architecture can be reused across different parts of the application, promoting DRY (Don't Repeat Yourself) principles. citeturn0search11

**Implementing MVC in Node.js/Express.js**

To implement the MVC pattern in a Node.js application using Express.js, you can structure your project as follows:

- **Models**: Create a `models` directory containing files that define data schemas and interact with the database. For example, using Sequelize, you can define a `User` model representing user data. citeturn0search0

- **Views**: Set up a `views` directory with templates (e.g., Pug or EJS files) that define how data is presented to the user. These templates generate HTML based on the data provided by the Controllers. citeturn0search0

- **Controllers**: Develop a `controllers` directory with files that handle user requests, process data using Models, and render the appropriate Views. For instance, a `UserController` might handle user registration and login processes. citeturn0search0

This organized structure promotes a clear separation of concerns, making our Node.js application more robust and easier to maintain. 

