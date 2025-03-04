import { Router } from "express";
import { createProduct, deleteProduct, editProduct, getAllProducts, getSingleProductById, updateProduct } from "../controllers/product.controller.js";
const productRouter = Router();

//! CRUD - Endpoints/APIs
//! CREATE ➕
productRouter.post("/", createProduct);
//! READ 📖
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getSingleProductById);
//! UPDATE 🔧
productRouter.put("/:id", updateProduct);
productRouter.patch("/:id", editProduct);
//! DELETE 🚮
productRouter.delete("/:id", deleteProduct);

export default productRouter;