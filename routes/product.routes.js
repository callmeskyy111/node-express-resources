import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getSingleProductById,
  replaceProduct,
} from "../controllers/product.controller.js";
const productRouter = Router();

//! CRUD - Endpoints/APIs
//! CREATE ➕
productRouter.post("/create", createProduct);
//! READ 📖
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getSingleProductById);
//! UPDATE 🔧
productRouter.put("/replace/:id", replaceProduct);
productRouter.patch("/edit/:id", editProduct);
//! DELETE 🚮
productRouter.delete("/delete/:id", deleteProduct);

export default productRouter;
