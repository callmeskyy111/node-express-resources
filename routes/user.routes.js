import { Router } from "express";
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  getSingleUserById,
  updateUser,
} from "../controllers/user.controller.js";
const userRouter = Router();

//! CRUD - Endpoints/APIs
//! CREATE ➕
userRouter.post("/", createUser);
//! READ 📖
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getSingleUserById);
//! UPDATE 🔧
userRouter.put("/:id", updateUser);
userRouter.patch("/:id", editUser);
//! DELETE 🚮
userRouter.delete("/:id", deleteUser);

export default userRouter;
