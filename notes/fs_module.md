The `fs` (File System) module in Node.js provides an API to interact with the file system. It allows us to perform various operations like reading, writing, updating, deleting, and managing files and directories. The `fs` module comes with both synchronous and asynchronous methods, making it suitable for different use cases.

---

## **1. Importing the `fs` Module**
Since the `fs` module is built into Node.js, we don’t need to install anything. We can simply import it using:

```js
const fs = require('fs');
```

---

## **2. Synchronous vs. Asynchronous Methods**
- **Synchronous (Blocking) Methods**: These methods execute line by line, blocking the execution of the next operation until the current one is finished.
- **Asynchronous (Non-Blocking) Methods**: These methods execute in the background without blocking the main thread.

Most `fs` methods come in two versions:
- `fs.methodSync()` → Synchronous
- `fs.method()` (without `Sync`) → Asynchronous

---

## **3. Common File Operations**

### **(1) Reading Files**
#### **Asynchronous Reading (`fs.readFile`)**
```js
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});
```
- `'utf8'` specifies the encoding, so the file is read as a string.
- If no encoding is given, data is returned as a `Buffer`.

#### **Synchronous Reading (`fs.readFileSync`)**
```js
try {
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log('File content:', data);
} catch (err) {
    console.error('Error reading file:', err);
}
```
- The execution pauses until the file is completely read.

---

### **(2) Writing Files**
#### **Asynchronous Writing (`fs.writeFile`)**
```js
fs.writeFile('example.txt', 'Hello, Node.js!', (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('File written successfully.');
});
```
- If the file exists, it **overwrites** the content.
- If the file doesn’t exist, it **creates** a new file.

#### **Synchronous Writing (`fs.writeFileSync`)**
```js
try {
    fs.writeFileSync('example.txt', 'Hello, Node.js!');
    console.log('File written successfully.');
} catch (err) {
    console.error('Error writing file:', err);
}
```
- The execution halts until the write operation is complete.

#### **Appending Data (`fs.appendFile`)**
```js
fs.appendFile('example.txt', '\nAppended text.', (err) => {
    if (err) {
        console.error('Error appending to file:', err);
        return;
    }
    console.log('Content appended successfully.');
});
```
- This **adds** content to the file instead of overwriting it.

---

### **(3) Deleting Files**
```js
fs.unlink('example.txt', (err) => {
    if (err) {
        console.error('Error deleting file:', err);
        return;
    }
    console.log('File deleted successfully.');
});
```
- **Synchronous version**: `fs.unlinkSync('example.txt');`

---

### **(4) Creating and Removing Directories**
#### **Creating a Directory**
```js
fs.mkdir('newFolder', { recursive: true }, (err) => {
    if (err) {
        console.error('Error creating directory:', err);
        return;
    }
    console.log('Directory created.');
});
```
- `{ recursive: true }` ensures that if the parent directories don’t exist, they are created automatically.

#### **Removing a Directory**
```js
fs.rmdir('newFolder', (err) => {
    if (err) {
        console.error('Error deleting directory:', err);
        return;
    }
    console.log('Directory deleted.');
});
```
- **Use `fs.rm('newFolder', { recursive: true })` in Node.js 14+** to delete non-empty directories.

---

## **4. Working with File Metadata (`fs.stat`)**
The `fs.stat()` method provides information about a file.

```js
fs.stat('example.txt', (err, stats) => {
    if (err) {
        console.error('Error getting file stats:', err);
        return;
    }
    console.log('File Stats:', stats);
});
```
**Output Example:**
```
File Stats: Stats {
  dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  size: 20,          // File size in bytes
  blksize: 4096,
  blocks: 8,
  atimeMs: 1627841821000,
  mtimeMs: 1627841821000,
  ctimeMs: 1627841821000,
  birthtimeMs: 1627841820000 
}
```
- **`stats.isFile()`** → Returns `true` if it's a file.
- **`stats.isDirectory()`** → Returns `true` if it's a directory.

---

## **5. Watching Files for Changes (`fs.watch`)**
The `fs.watch()` method allows us to monitor file changes.

```js
fs.watch('example.txt', (eventType, filename) => {
    console.log(`File ${filename} changed! Event Type: ${eventType}`);
});
```
- This can be useful for building **auto-reloading applications**.

---

## **6. Streams in `fs` (Efficient File Handling)**
For **large files**, `fs.readFile()` is inefficient because it loads the entire file into memory. Instead, **streams** process data in chunks.

### **Reading a File with Streams (`fs.createReadStream`)**
```js
const readStream = fs.createReadStream('largeFile.txt', 'utf8');

readStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
});
readStream.on('end', () => {
    console.log('File reading complete.');
});
readStream.on('error', (err) => {
    console.error('Error reading file:', err);
});
```
- Reads data in chunks instead of loading the full file into memory.

### **Writing a File with Streams (`fs.createWriteStream`)**
```js
const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello, this is a streamed write operation!\n');
writeStream.end('Final line.');
writeStream.on('finish', () => {
    console.log('File write complete.');
});
```

---

## **7. Promises API in `fs`**
Node.js provides a **Promise-based API** (`fs.promises`) for handling file operations using `async/await`.

```js
const fsPromises = require('fs').promises;

async function readFileAsync() {
    try {
        const data = await fsPromises.readFile('example.txt', 'utf8');
        console.log('File content:', data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

readFileAsync();
```

---

## **8. Summary of Key Methods**
| Operation          | Asynchronous (`fs`)   | Synchronous (`fs.Sync`) |
|-------------------|----------------------|----------------------|
| Read file         | `fs.readFile()`       | `fs.readFileSync()`  |
| Write file        | `fs.writeFile()`      | `fs.writeFileSync()` |
| Append file       | `fs.appendFile()`     | `fs.appendFileSync()` |
| Delete file       | `fs.unlink()`         | `fs.unlinkSync()` |
| Create folder     | `fs.mkdir()`          | `fs.mkdirSync()` |
| Remove folder     | `fs.rmdir()`          | `fs.rmdirSync()` |
| Get file stats    | `fs.stat()`           | `fs.statSync()` |

---

## **Final Thoughts**
- Use **async methods** (`fs.readFile`, `fs.writeFile`) for better performance.
- Use **streams** (`fs.createReadStream`) for large files.
- Use **`fs.promises`** with `async/await` for cleaner code.
- Use **synchronous methods (`fs.readFileSync`) only when necessary**, as they block execution.
