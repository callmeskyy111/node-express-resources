import express from "express";
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.json());
app.use(express.static("public"));

//Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

//Connecting to a PORT
app.listen(PORT, () => {
  console.log(`Server is running on port-${PORT} 🛜`);
});
