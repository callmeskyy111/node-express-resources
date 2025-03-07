## **🔹 What is Mongoose in Node.js/Express.js Development?**
Mongoose is an **Object Data Modeling (ODM) library** for MongoDB and Node.js. It provides a **schema-based** solution to interact with MongoDB and helps in **structuring, validating, and querying** the database efficiently.  

### **🔹 Why Use Mongoose?**
- MongoDB is **schema-less** (documents can have different structures), which can lead to inconsistencies.
- Mongoose **enforces a schema** to maintain structured data.
- It provides **built-in validation, middleware, and query helpers** to simplify database operations.

📌 **Think of Mongoose as a bridge between MongoDB and your Node.js app, ensuring data integrity and making database operations easier.**

---

## **🔹 Key Features of Mongoose**
### **1️⃣ Schema-Based Models**
- Defines the **structure** of the data in MongoDB.
- Ensures **consistent data** storage.

Example Schema:
```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

---

### **2️⃣ Built-in Validation**
- Prevents incorrect data from being saved.
- Example: `required`, `unique`, `minLength`, `maxLength`, `enum`, etc.

Example:
```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  age: { type: Number, min: 18, max: 65 } // Age must be between 18 and 65
});
```

---

### **3️⃣ Middleware (Hooks)**
- **Pre-save hooks**: Run before saving a document.
- **Post-save hooks**: Run after saving a document.
- Useful for **hashing passwords, logging, validation**, etc.

Example: **Hashing passwords before saving**
```js
const bcrypt = require("bcrypt");

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

---

### **4️⃣ Query Methods**
- Provides **powerful query methods** to fetch and manipulate data.
- Uses **Promise-based API** (`.then()` or `async/await`).

Example Queries:
```js
// Find all users
const users = await User.find();

// Find a user by email
const user = await User.findOne({ email: "john@example.com" });

// Update a user's name
await User.updateOne({ email: "john@example.com" }, { name: "John Doe" });

// Delete a user
await User.deleteOne({ email: "john@example.com" });
```

---

### **5️⃣ Virtual Fields (Computed Properties)**
- Does not store extra data but allows computation.

Example:
```js
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
```
```js
const user = await User.findOne();
console.log(user.fullName); // Computed value
```

---

### **6️⃣ Population (JOIN Equivalent in SQL)**
- **Reference documents** in different collections (similar to JOIN in SQL).

Example: **User and Posts**
```js
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
const Post = mongoose.model("Post", postSchema);
```
Query with Population:
```js
const posts = await Post.find().populate("author");
```
This fetches the `author` details instead of just the `ObjectId`.

---

### **7️⃣ Indexing for Performance**
- Improves search speed in large databases.
- Example: Index email for faster lookups.
```js
userSchema.index({ email: 1 });
```

---

## **🔹 How to Use Mongoose in Node.js & Express.js**
### **1️⃣ Install Mongoose**
```sh
npm install mongoose
```

---

### **2️⃣ Connect Mongoose to MongoDB**
```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("Connection Error:", err));
```
📌 **For MongoDB Atlas, use:**
```js
mongoose.connect("mongodb+srv://username:password@cluster.mongodb.net/myDatabase");
```

---

### **3️⃣ Define a Schema & Model**
```js
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);
```

---

### **4️⃣ CRUD Operations with Mongoose**
#### **📌 Create a New User**
```js
const newUser = new User({
  name: "Alice",
  email: "alice@example.com",
  password: "securepassword"
});

await newUser.save(); // Saves to MongoDB
```

---

#### **📌 Read Users**
```js
const users = await User.find(); // Fetch all users
console.log(users);
```

---

#### **📌 Update a User**
```js
await User.updateOne({ email: "alice@example.com" }, { name: "Alice Updated" });
```

---

#### **📌 Delete a User**
```js
await User.deleteOne({ email: "alice@example.com" });
```

---

## **🔹 Mongoose vs. Native MongoDB Driver**
| Feature | Mongoose (ODM) | Native MongoDB Driver |
|---------|--------------|---------------------|
| **Schema Validation** | Yes (built-in) | No (manual validation needed) |
| **Data Relationships (Populate)** | Yes | No (manual JOINs required) |
| **Middleware (Hooks)** | Yes | No |
| **Query Helpers** | Yes | Limited |
| **Performance** | Slightly Slower | Faster (direct MongoDB queries) |

📌 **Mongoose is best for structured apps, while the native MongoDB driver is better for high-performance raw queries.**

---

## **🔹 When to Use Mongoose?**
✅ **When working with structured data** (e.g., users, products, orders).  
✅ **When you need data validation** (ensuring correct data types).  
✅ **When handling relationships between collections** (e.g., user → posts).  
✅ **When using Express.js for a full-stack web app** (Mongoose simplifies database management).  

🚀 **Mongoose makes working with MongoDB easier by adding structure, validation, and helper functions. If you're building a Node.js/Express.js app, it's a great choice!**  

# **🔹 Mongoose Methods Explained in Detail**
Mongoose provides a variety of **methods** to interact with MongoDB, categorized into:
1. **Model Methods (Static Methods)**
2. **Instance Methods**
3. **Query Methods**
4. **Aggregation Methods**
5. **Middleware (Hooks)**
6. **Virtuals**

Let’s explore these in detail with examples. 🚀

---

## **1️⃣ Model Methods (Static Methods)**
These methods operate directly on the **model (collection)** level, allowing us to **create, read, update, or delete multiple documents**.

📌 **Example Schema & Model:**
```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number
});

const User = mongoose.model("User", userSchema);
```

### **🟢 Model.create() → Insert a New Document**
```js
const user = await User.create({ name: "Alice", email: "alice@example.com", age: 25 });
console.log(user);
```
✅ Inserts a new user into the database.

---

### **🟢 Model.find() → Get All Documents**
```js
const users = await User.find();
console.log(users);
```
✅ Returns **all documents** from the collection.

---

### **🟢 Model.findOne() → Get a Single Document**
```js
const user = await User.findOne({ email: "alice@example.com" });
console.log(user);
```
✅ Returns **one document** that matches the query.

---

### **🟢 Model.findById() → Get a Document by ID**
```js
const user = await User.findById("65f4a2d7e4a1b2c3d4e5f6a7");
console.log(user);
```
✅ Finds a document by its **ObjectId**.

---

### **🟢 Model.updateOne() → Update a Single Document**
```js
await User.updateOne({ email: "alice@example.com" }, { age: 30 });
```
✅ Updates **one matching document**.

---

### **🟢 Model.updateMany() → Update Multiple Documents**
```js
await User.updateMany({ age: { $lt: 30 } }, { age: 30 });
```
✅ Updates **all matching documents**.

---

### **🟢 Model.findByIdAndUpdate() → Find by ID & Update**
```js
const updatedUser = await User.findByIdAndUpdate("65f4a2d7e4a1b2c3d4e5f6a7", { age: 35 }, { new: true });
console.log(updatedUser);
```
✅ Finds a document by ID and updates it.

---

### **🟢 Model.findByIdAndDelete() → Find by ID & Delete**
```js
await User.findByIdAndDelete("65f4a2d7e4a1b2c3d4e5f6a7");
```
✅ Finds a document by ID and deletes it.

---

## **2️⃣ Instance Methods**
Instance methods are functions that can be called **on a document instance**.

📌 **Example: Adding an instance method to userSchema**
```js
userSchema.methods.getUserInfo = function () {
  return `User: ${this.name}, Email: ${this.email}`;
};

const User = mongoose.model("User", userSchema);

const user = await User.findOne({ email: "alice@example.com" });
console.log(user.getUserInfo()); // User: Alice, Email: alice@example.com
```
✅ Instance methods let us **define custom operations** on documents.

---

## **3️⃣ Query Methods**
Mongoose provides **chainable query methods** for filtering and sorting.

### **🟢 Query.select() → Select Specific Fields**
```js
const user = await User.findOne().select("name email");
console.log(user); // Only name and email fields are returned.
```

---

### **🟢 Query.limit() → Limit Number of Results**
```js
const users = await User.find().limit(5);
```
✅ Returns only **5 users**.

---

### **🟢 Query.sort() → Sort Results**
```js
const users = await User.find().sort({ age: -1 }); // Sort by age in descending order.
```

---

### **🟢 Query.countDocuments() → Count the Number of Documents**
```js
const count = await User.countDocuments({ age: { $gt: 25 } });
console.log(count);
```
✅ Returns the **number of users** older than 25.

---

## **4️⃣ Aggregation Methods**
Aggregation allows us to perform **complex queries, filtering, grouping, and calculations**.

📌 **Example: Get the Average Age of Users**
```js
const result = await User.aggregate([
  { $group: { _id: null, avgAge: { $avg: "$age" } } }
]);
console.log(result);
```
✅ **Aggregation is useful for analytics and reporting.**

---

## **5️⃣ Middleware (Hooks)**
Middleware functions **run before or after database operations**.

📌 **Example: Hashing Password Before Saving a User**
```js
const bcrypt = require("bcrypt");

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```
✅ Ensures passwords are **hashed** before saving.

---

## **6️⃣ Virtuals**
Virtuals are computed properties **that do not get stored in the database**.

📌 **Example: Full Name Virtual**
```js
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const user = await User.findOne();
console.log(user.fullName); // Computed property
```
✅ Virtuals let us **derive values without storing extra data**.

---

# **🔥 Summary Table**
| Method | Description | Example |
|--------|-------------|---------|
| **Model.create()** | Create a new document | `User.create({ name: "Alice" })` |
| **Model.find()** | Get all documents | `User.find()` |
| **Model.findOne()** | Get a single document | `User.findOne({ email: "alice@example.com" })` |
| **Model.findById()** | Find by ID | `User.findById("65f4a2d7e4a1b2c3d4e5f6a7")` |
| **Model.updateOne()** | Update one document | `User.updateOne({ email: "alice@example.com" }, { age: 30 })` |
| **Model.updateMany()** | Update multiple documents | `User.updateMany({ age: { $lt: 30 } }, { age: 30 })` |
| **Model.findByIdAndUpdate()** | Find by ID & update | `User.findByIdAndUpdate(id, { age: 35 }, { new: true })` |
| **Model.findByIdAndDelete()** | Find by ID & delete | `User.findByIdAndDelete(id)` |
| **Query.sort()** | Sort results | `User.find().sort({ age: -1 })` |
| **Query.limit()** | Limit results | `User.find().limit(5)` |
| **Query.select()** | Select specific fields | `User.find().select("name email")` |
| **Query.countDocuments()** | Count matching docs | `User.countDocuments({ age: { $gt: 25 } })` |
| **Aggregation** | Perform analytics queries | `User.aggregate([{ $group: { _id: null, avgAge: { $avg: "$age" } } }])` |
| **Middleware (Hooks)** | Run logic before/after save | `userSchema.pre("save", async function() { })` |
| **Virtuals** | Create computed properties | `userSchema.virtual("fullName").get(function() { return this.firstName + " " + this.lastName; })` |

---

# **🚀 Conclusion**
Mongoose provides a **powerful and flexible** way to interact with MongoDB. It simplifies database operations with **schemas, validation, middleware, and query methods**.

If we're building a **MERN** or **Node.js/Express.js app**, **Mongoose is the best choice** for handling MongoDB efficiently! 🎯

---
# **🔹 Mongoose SchemaTypes Explained in Detail**
In **Mongoose**, **SchemaTypes** define the structure of data inside MongoDB collections. Each field in a Mongoose schema must be assigned a **SchemaType**, which specifies the type of data it should hold.

---

## **📌 1. Built-in SchemaTypes in Mongoose**
Mongoose provides several **built-in** SchemaTypes:
| **SchemaType** | **Description** | **Example** |
|--------------|--------------|------------|
| **String** | Stores text values | `{ name: String }` |
| **Number** | Stores numbers (integers, floats) | `{ age: Number }` |
| **Boolean** | Stores `true` or `false` values | `{ isActive: Boolean }` |
| **Date** | Stores date and time values | `{ createdAt: Date }` |
| **Buffer** | Stores binary data (images, files) | `{ avatar: Buffer }` |
| **ObjectId** | Stores MongoDB Object IDs (references to other documents) | `{ userId: mongoose.Schema.Types.ObjectId }` |
| **Array** | Stores lists of values | `{ hobbies: [String] }` |
| **Mixed** | Stores any data type (not recommended) | `{ extraInfo: mongoose.Schema.Types.Mixed }` |
| **Decimal128** | Stores high-precision decimal numbers | `{ price: mongoose.Schema.Types.Decimal128 }` |
| **Map** | Stores key-value pairs (useful for dynamic objects) | `{ metadata: Map }` |

---

## **📌 2. Defining SchemaTypes with Validation & Default Values**
We can define schema fields with **default values, validations, and constraints**.

### **🟢 Example: Schema with Different SchemaTypes**
```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name is required
  age: { type: Number, min: 18, max: 100 }, // Age must be between 18-100
  email: { type: String, unique: true, lowercase: true, trim: true }, // Unique and lowercase
  password: { type: String, required: true, minlength: 6 }, // Password must be at least 6 characters
  isAdmin: { type: Boolean, default: false }, // Default value is false
  createdAt: { type: Date, default: Date.now }, // Auto-set creation date
  avatar: Buffer, // Stores image as binary
  hobbies: [String], // Array of strings
  metadata: { type: Map, of: String }, // Key-value pairs
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of references
  balance: mongoose.Schema.Types.Decimal128, // High-precision number
  extraInfo: mongoose.Schema.Types.Mixed, // Stores any type of data
});

const User = mongoose.model("User", userSchema);
```

---

## **📌 3. Detailed Explanation of Each SchemaType**
Let’s explore each **SchemaType** with real-world use cases.

### **1️⃣ String SchemaType**
- Stores **text values**.
- Supports **validation options** like `trim`, `lowercase`, `uppercase`, `match`, `enum`.

```js
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  role: { type: String, enum: ["admin", "user", "guest"], default: "user" },
});
```
✅ Ensures:
- `username` is required, unique, and trimmed (no extra spaces).
- `role` can only be **admin, user, or guest**.

---

### **2️⃣ Number SchemaType**
- Stores **integer or float values**.
- Supports `min` and `max` validation.

```js
const productSchema = new mongoose.Schema({
  price: { type: Number, required: true, min: 0 }, // Price must be non-negative
  stock: { type: Number, default: 0 }, // Default stock is 0
});
```

✅ Ensures:
- `price` cannot be **negative**.
- `stock` defaults to **0** if not provided.

---

### **3️⃣ Boolean SchemaType**
- Stores `true` or `false` values.

```js
const userSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: true },
});
```

✅ If `isActive` is not provided, it defaults to **true**.

---

### **4️⃣ Date SchemaType**
- Stores **date and time values**.
- Can use `default` to auto-set timestamps.

```js
const postSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
});
```

✅ `createdAt` is **automatically set** when a document is created.

---

### **5️⃣ Buffer SchemaType**
- Stores **binary data** (images, files, etc.).

```js
const fileSchema = new mongoose.Schema({
  fileData: Buffer, // Stores binary file data
});
```

✅ Useful for **storing images or files** directly in the database.

---

### **6️⃣ ObjectId SchemaType**
- Stores **MongoDB Object IDs**.
- Used for **relationships** between documents.

```js
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
```

✅ `ref: "User"` means this field references the **User collection**.

---

### **7️⃣ Array SchemaType**
- Stores **lists of values**.

```js
const userSchema = new mongoose.Schema({
  hobbies: [String], // Array of strings
});
```

✅ Example value: `["reading", "swimming", "coding"]`.

---

### **8️⃣ Mixed SchemaType (Flexible Data)**
- Allows storing **any type of data**.
- Not recommended because it bypasses schema validation.

```js
const logSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});
```

✅ Can store **objects, strings, numbers, etc.**.

---

### **9️⃣ Decimal128 SchemaType**
- Stores **high-precision decimal values**.
- Useful for **storing currency**.

```js
const transactionSchema = new mongoose.Schema({
  amount: mongoose.Schema.Types.Decimal128,
});
```

✅ Example value: `{"amount": "99.99"}`.

---

### **🔟 Map SchemaType**
- Stores **key-value pairs**.

```js
const userSchema = new mongoose.Schema({
  metadata: { type: Map, of: String },
});
```

✅ Example value:
```json
{"metadata": {"device": "iPhone", "browser": "Chrome"}}
```

---

## **📌 4. SchemaType Options & Validations**
Mongoose allows setting **additional options** for each SchemaType.

| Option | Description | Example |
|--------|------------|---------|
| `required` | Field must be present | `{ name: { type: String, required: true } }` |
| `default` | Default value if not provided | `{ isActive: { type: Boolean, default: false } }` |
| `unique` | Ensures unique values | `{ email: { type: String, unique: true } }` |
| `trim` | Removes spaces from strings | `{ name: { type: String, trim: true } }` |
| `lowercase` | Converts text to lowercase | `{ email: { type: String, lowercase: true } }` |
| `enum` | Restricts values to a set | `{ role: { type: String, enum: ["admin", "user"] } }` |
| `min` | Minimum value for numbers | `{ age: { type: Number, min: 18 } }` |
| `max` | Maximum value for numbers | `{ age: { type: Number, max: 100 } }` |
| `match` | Validates string format | `{ email: { type: String, match: /\S+@\S+\.\S+/ } }` |

---

## **🔥 Summary**
| **SchemaType** | **Use Case** |
|--------------|-------------|
| **String** | Names, emails, descriptions |
| **Number** | Age, price, quantity |
| **Boolean** | Status flags (`isActive`, `isAdmin`) |
| **Date** | Timestamps, birthdays |
| **Buffer** | Images, files |
| **ObjectId** | References to other documents |
| **Array** | Lists of values (`hobbies`, `tags`) |
| **Mixed** | Flexible data storage |
| **Decimal128** | Currency, precise numbers |
| **Map** | Key-value data (`metadata`, `preferences`) |

---

## **🚀 Conclusion**
Mongoose **SchemaTypes** help enforce **data consistency** and **structure** in MongoDB. Choosing the **right SchemaType** improves performance and prevents errors.

# **🔹 Mongoose `pre` Middleware & Schema Validations Explained in Detail**  

---

## **📌 1. What is `pre` in Mongoose?**
In **Mongoose**, `pre` is a **middleware function** that runs **before** a specific action (like `save`, `find`, `update`, or `delete`) is executed on a document. It allows us to **modify data**, **validate fields**, **hash passwords**, or perform **other operations** before saving/updating data in MongoDB.

### **🟢 Example: Using `pre` to Hash Passwords Before Saving**
```js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is new/modified
  this.password = await bcrypt.hash(this.password, 10); // Hash password
  next(); // Proceed to save
});

// Create User model
const User = mongoose.model("User", userSchema);
```
✅ Here, `pre("save")` ensures that the **password is hashed before saving** into MongoDB.

---

## **📌 2. Types of `pre` Middleware in Mongoose**
Mongoose provides different types of **pre middleware** that execute before various operations:

| **Middleware Type** | **Triggering Methods** | **Use Case** |
|-----------------|---------------------|-------------|
| `pre("save")` | `.save()` | Hashing passwords, setting default values |
| `pre("validate")` | Before validation | Custom validation logic |
| `pre("remove")` | `.remove()` | Cleaning up related data before deletion |
| `pre("updateOne")` | `.updateOne()` | Modifying data before update |
| `pre("findOneAndUpdate")` | `.findOneAndUpdate()` | Modifying data before update |

---

### **🟢 Example: `pre("remove")` to Clean Up Related Data**
```js
const postSchema = new mongoose.Schema({
  title: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

// Delete comments when a post is deleted
postSchema.pre("remove", async function (next) {
  await Comment.deleteMany({ postId: this._id });
  next();
});

const Post = mongoose.model("Post", postSchema);
```
✅ When a **post is deleted**, all **related comments** are also deleted.

---

## **📌 3. Validations & Restrictions in Mongoose SchemaTypes**
Mongoose allows **various types of validations** to **ensure data integrity**.

### **🟢 1️⃣ Required Fields (`required`)**
Forces a field to be **mandatory**.

```js
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Required field
});
```
✅ Mongoose will throw an error if `username` is missing.

---

### **🟢 2️⃣ Unique Constraint (`unique`)**
Ensures that the field value is **unique** in the collection.

```js
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});
```
✅ Prevents duplicate emails.

---

### **🟢 3️⃣ Minimum & Maximum Length (`minlength`, `maxlength`)**
Restricts the length of **String** fields.

```js
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
});
```
✅ `name` must be **between 3 and 50 characters**.

---

### **🟢 4️⃣ Min & Max for Numbers (`min`, `max`)**
Restricts numerical values.

```js
const userSchema = new mongoose.Schema({
  age: { type: Number, min: 18, max: 60 }, // Age must be between 18-60
});
```
✅ `age` must be **≥18 and ≤60**.

---

### **🟢 5️⃣ Default Values (`default`)**
Sets a **default** value if none is provided.

```js
const userSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: true },
});
```
✅ If `isActive` is not provided, it **defaults to `true`**.

---

### **🟢 6️⃣ Transforming Text (`lowercase`, `uppercase`, `trim`)**
- `lowercase`: Converts the value to **lowercase**.
- `uppercase`: Converts the value to **uppercase**.
- `trim`: Removes **leading and trailing spaces**.

```js
const userSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, trim: true },
});
```
✅ Ensures `email` is **stored in lowercase with no extra spaces**.

---

### **🟢 7️⃣ Enum Validation (`enum`)**
Restricts a field to **specific values**.

```js
const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["admin", "user", "guest"], default: "user" },
});
```
✅ `role` can only be **"admin", "user", or "guest"**.

---

### **🟢 8️⃣ Pattern Matching (`match`)**
Ensures the value **matches a specific format** using **regular expressions**.

```js
const userSchema = new mongoose.Schema({
  phone: { type: String, match: /^[0-9]{10}$/ }, // 10-digit number
});
```
✅ Ensures `phone` contains **exactly 10 digits**.

---

### **🟢 9️⃣ Custom Validation (`validate`)**
Allows writing **custom validation logic**.

```js
const userSchema = new mongoose.Schema({
  age: {
    type: Number,
    validate: {
      validator: function (value) {
        return value % 2 === 0; // Age must be an even number
      },
      message: "Age must be an even number",
    },
  },
});
```
✅ Throws an error if `age` is not **even**.

---

## **📌 4. Combining Multiple Validations**
We can apply **multiple validations** together.

```js
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, match: /\S+@\S+\.\S+/ },
  password: { type: String, required: true, minlength: 6 },
  age: { type: Number, min: 18, max: 60 },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});
```
✅ This schema ensures:
- `username`: **Mandatory**, at least **3 characters**, removes extra spaces.
- `email`: **Mandatory**, **unique**, **lowercase**, and matches **email format**.
- `password`: **At least 6 characters**.
- `age`: Between **18-60**.
- `role`: Must be **"admin"** or **"user"**.
- `createdAt`: **Defaults to current date**.

---

## **🔥 Summary**
| **Feature** | **Description** | **Example** |
|-------------|----------------|-------------|
| `required` | Makes a field mandatory | `{ name: { type: String, required: true } }` |
| `unique` | Ensures uniqueness | `{ email: { type: String, unique: true } }` |
| `minlength` / `maxlength` | Restricts string length | `{ username: { minlength: 3, maxlength: 20 } }` |
| `min` / `max` | Restricts number range | `{ age: { min: 18, max: 60 } }` |
| `default` | Sets default values | `{ isActive: { default: true } }` |
| `trim` | Removes spaces | `{ name: { trim: true } }` |
| `lowercase` / `uppercase` | Converts text case | `{ email: { lowercase: true } }` |
| `enum` | Restricts allowed values | `{ role: { enum: ["admin", "user"] } }` |
| `match` | Validates using regex | `{ phone: { match: /^[0-9]{10}$/ } }` |
| `validate` | Custom validation | `{ age: { validate: (v) => v % 2 === 0 } }` |

---

## **🚀 Conclusion**
Mongoose provides **powerful middleware (`pre`)** and **various schema validations** to ensure **data integrity**. Using these features, we can prevent **errors, duplicate data, and incorrect formats**.

You're welcome! 🚀 Now, let's break down the difference between **PUT** and **PATCH**:

---

### **🔹 PUT (Replace the Whole Resource)**
- **Replaces the entire document** with the new data.
- If a field is missing in the request body, it **gets removed** from the document.
- **Example:** Updating a product with `PUT`:
  ```json
  {
    "title": "New Product",
    "price": 100
  }
  ```
  - If the old document had `{ "title": "Old Product", "price": 50, "category": "Electronics" }`, the `category` field will **be removed**.
- **Best Used For:** When you want to completely replace an existing document.

✅ **PUT is like replacing the entire object with a new one.**  

---

### **🔹 PATCH (Modify Specific Fields)**
- **Updates only the fields provided** in the request.
- Any missing fields **remain unchanged**.
- **Example:** Updating a product with `PATCH`:
  ```json
  {
    "price": 100
  }
  ```
  - If the old document was `{ "title": "Old Product", "price": 50, "category": "Electronics" }`, the updated document will be:
    ```json
    {
      "title": "Old Product",
      "price": 100,
      "category": "Electronics"
    }
    ```
  - The `title` and `category` **remain unchanged**.
- **Best Used For:** When you want to update only a few fields without affecting the rest.

✅ **PATCH is like editing specific properties without replacing the whole object.**

---

### **📌 Summary Table**
| Method | Behavior | Use Case |
|---------|----------|----------|
| **PUT** | Replaces the entire document | When you need to completely overwrite the resource |
| **PATCH** | Updates only the provided fields | When you need to modify specific fields without touching others |

---

### **💡 When to Use What?**
- If the user **sends the full object** → use **PUT**.
- If the user **sends only the changed fields** → use **PATCH**.

Great! Let's break down the **five main HTTP verbs** in detail:  

---

## **1️⃣ GET (Retrieve Data)**
- **Purpose:** Fetches data from the server.
- **Idempotent?** ✅ Yes (same request always returns the same response if data hasn’t changed).
- **Body?** ❌ No (GET requests don’t have a request body).
- **Cacheable?** ✅ Yes (browsers often cache GET responses for performance).  
- **Example:**  
  ```http
  GET /products
  ```
  - Fetches all products.
  ```http
  GET /products/123
  ```
  - Fetches a single product with `id: 123`.  

🚀 **Use GET when you need to read data without modifying anything.**

---

## **2️⃣ POST (Create Data)**
- **Purpose:** Sends data to the server to create a new resource.
- **Idempotent?** ❌ No (each request creates a new resource, even if data is the same).
- **Body?** ✅ Yes (contains data for the new resource).
- **Cacheable?** ❌ No (responses change with each request).
- **Example:**  
  ```http
  POST /products
  ```
  - Creates a new product.
  ```json
  {
    "title": "Laptop",
    "price": 1200,
    "category": "Electronics"
  }
  ```
  - Sends data in the request body to be stored in the database.

🚀 **Use POST when you need to create a new resource.**

---

## **3️⃣ PUT (Replace Data)**
- **Purpose:** Replaces an **entire** existing resource.
- **Idempotent?** ✅ Yes (repeated PUT requests with the same data result in the same outcome).
- **Body?** ✅ Yes (contains the full resource to replace the old one).
- **Cacheable?** ❌ No.
- **Example:**  
  ```http
  PUT /products/123
  ```
  ```json
  {
    "title": "Gaming Laptop",
    "price": 1500,
    "category": "Electronics"
  }
  ```
  - Completely replaces the product with `id: 123`. If the old product had a `brand` field and it's missing in the request, it **gets deleted**.

🚀 **Use PUT when you need to fully replace a resource.**

---

## **4️⃣ PATCH (Modify Partial Data)**
- **Purpose:** Updates only **specific fields** of a resource.
- **Idempotent?** ✅ Yes (if the request stays the same).
- **Body?** ✅ Yes (contains only the fields to update).
- **Cacheable?** ❌ No.
- **Example:**  
  ```http
  PATCH /products/123
  ```
  ```json
  {
    "price": 1400
  }
  ```
  - Updates **only the price** while keeping other fields unchanged.

🚀 **Use PATCH when you need to update specific fields without affecting others.**

---

## **5️⃣ DELETE (Remove Data)**
- **Purpose:** Deletes a resource.
- **Idempotent?** ✅ Yes (once deleted, subsequent DELETE requests won’t change the outcome).
- **Body?** ❌ No (typically, DELETE requests don’t have a request body).
- **Cacheable?** ❌ No.
- **Example:**  
  ```http
  DELETE /products/123
  ```
  - Deletes the product with `id: 123`.

🚀 **Use DELETE when you need to remove a resource permanently.**

---

## **📌 Summary Table**
| HTTP Verb | Purpose | Idempotent? | Request Body? | Example |
|-----------|----------|------------|--------------|---------|
| **GET** | Retrieve data | ✅ Yes | ❌ No | `GET /products` |
| **POST** | Create new resource | ❌ No | ✅ Yes | `POST /products` |
| **PUT** | Replace entire resource | ✅ Yes | ✅ Yes | `PUT /products/123` |
| **PATCH** | Update partial resource | ✅ Yes | ✅ Yes | `PATCH /products/123` |
| **DELETE** | Remove resource | ✅ Yes | ❌ No | `DELETE /products/123` |

---

### **💡 When to Use What?**
✅ **GET** → When fetching data.  
✅ **POST** → When creating a new resource.  
✅ **PUT** → When replacing a resource completely.  
✅ **PATCH** → When updating specific fields.  
✅ **DELETE** → When deleting a resource.  

---

Both `findByIdAndDelete` and `findOneAndDelete` are used in **MongoDB (Mongoose)** to delete documents, but they have some key differences. Let's break them down.

---

## **1️⃣ `findByIdAndDelete(id)`**
✅ **Deletes a document by its `_id`**.  
✅ **Requires the document's exact `_id`**.  
✅ **Returns the deleted document** if found, otherwise `null`.  
✅ **More efficient** than `findOneAndDelete` because `_id` is indexed by default.  

**🔹 Example:**
```js
const deletedProduct = await productModel.findByIdAndDelete("65e8fa2b5a93d9a7");
console.log(deletedProduct);
```
- If the document with `_id: 65e8fa2b5a93d9a7` exists, it will be deleted.
- If not found, `null` is returned.

---

## **2️⃣ `findOneAndDelete(filter)`**
✅ **Deletes a document based on any condition, not just `_id`**.  
✅ **Useful when deleting based on fields other than `_id`**.  
✅ **Returns the deleted document** if found, otherwise `null`.  

**🔹 Example:**
```js
const deletedProduct = await productModel.findOneAndDelete({ title: "Laptop" });
console.log(deletedProduct);
```
- Deletes the **first** product with `title: "Laptop"`, even if multiple exist.
- If no match is found, `null` is returned.

---

### **📌 Key Differences**
| Feature | `findByIdAndDelete(id)` | `findOneAndDelete(filter)` |
|---------|----------------|----------------|
| **Deletes by** | `_id` only | Any field(s) |
| **Input type** | Single `_id` | Query object (e.g., `{ title: "Laptop" }`) |
| **Performance** | Faster (indexed `_id`) | Slightly slower (depends on query fields) |
| **Deletes multiple?** | ❌ No, only one document | ❌ No, only the first matching document |

---

### **🔹 When to Use What?**
✅ Use **`findByIdAndDelete(id)`** when we know the exact `_id`.  
✅ Use **`findOneAndDelete(filter)`** when deleting based on other fields.  
