import mongoose from "mongoose";
import productModel from "../models/product.model.js";

//! Product - Controllers/Functions => CRUD  Functions

//! C => CREATE
export const createProduct = async (req, res) => {
  try {
    // ✅ Destructure req.body
    const {
      title,
      description,
      price,
      discountPercentage,
      rating,
      brand,
      category,
      thumbnail,
      images, // ✅ Include images field
    } = req.body;

    // ✅ Validate required fields before creating the product
    if (!title || !price || !brand || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields!" });
    }

    // ✅ Create a new product instance
    const product = new productModel({
      title,
      description,
      price,
      discountPercentage,
      rating,
      brand,
      category,
      thumbnail,
      images,
    });

    // ✅ Save the product
    const savedProduct = await product.save();

    // ✅ Send success response
    res.status(201).json({
      success: true,
      message: "Product added successfully ☑️",
      product: savedProduct,
    });
  } catch (err) {
    console.error(err);

    // ✅ Handle validation errors from Mongoose
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error 🔴",
        error: err.errors,
      });
    }

    // ✅ Handle other errors
    return res.status(500).json({
      success: false,
      message: "Server error 🔴",
      error: err.message,
    });
  }
};

//! R => READ
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().lean(); // Use `.lean()` for better performance

    if (products.length === 0) {
      // Properly check for an empty array
      return res.status(404).json({
        success: false,
        message: "No products found 🌵",
      });
    }

    res.status(200).json({
      success: true,
      totalProducts: products.length,
      message: "All products fetched successfully ✅",
      products, // Better response key name
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ❌",
      error: err.message, // Only send error message for security reasons
    });
  }
};

export const getSingleProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId).lean();
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with id: '${productId}' not found ⚠️`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Product with id: '${productId}' fetched successfully ✅`,
      productDetails: product,
    });
  } catch (err) {
    console.error("Error fetching product:", err);
    // ✅ Handle obj. cast-errors from Mongoose
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message:
          "Invalid productId format. Please provide a valid MONGODB-id ⚠️",
        error: err.errors,
      });
    }

    // ✅ Handle other errors
    return res.status(500).json({
      success: false,
      message: "Server error 🔴",
      error: err.message,
    });
  }
};

//! U => UPDATE
export const replaceProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // ✅ Ensure productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid productId format. Please provide a valid MongoDB ObjectId ⚠️",
      });
    }

    // ✅ Replace the document and return the updated version
    const updatedProduct = await productModel.findOneAndReplace(
      { _id: productId },
      req.body,
      { new: true, returnDocument: "after" } // Ensures the updated product is returned
    );

    // ✅ Check if the product exists
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: `Product with id: '${productId}' not found⚠️`,
      });
    }

    // ✅ Send success response
    res.status(200).json({
      success: true,
      message: `Product with id: '${productId}' replaced successfully ✅`,
      updatedProduct,
    });
  } catch (err) {
    console.error("Error replacing product:", err);

    // ✅ Handle Mongoose CastError (invalid ObjectId format)
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message:
          "Invalid productId format. Please provide a valid MongoDB ObjectId ⚠️",
      });
    }

    // ✅ Handle other server errors
    return res.status(500).json({
      success: false,
      message: "Server error 🔴",
      error: err.message,
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const editedProduct = await productModel.findOneAndUpdate(
      { _id: productId },
      req.body,
      { new: true }
    );
    if (!editedProduct) {
      return res.status(404).json({
        success: false,
        message: `Product with id: '${productId}' not found ⚠️`,
      });
    }
    // ✅ Update the fields
    res.status(200).json({
      success: true,
      message: `Product with id: '${productId}' edited successfully ✅`,
      editedProduct,
    });
  } catch (err) {
    console.error("Error editing product:", err);
    // ✅ Handle Mongoose CastError (invalid ObjectId format)
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message:
          "Invalid productId format. Please provide a valid MongoDB ObjectId ⚠️",
      });
    }
    // ✅ Handle other server errors
    return res.status(500).json({
      success: false,
      message: "Server error ⚠️",
      error: err.message,
    });
  }
};

//! D => DELETE
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    // ✅ Ensure productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid productId format. Please provide a valid MongoDB ObjectId ⚠️",
      });
    }
    // ✅ Delete the product
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: `Product with id: '${productId}' not found ⚠️`,
      });
    }
    // ✅ Send success response
    res.status(200).json({
      success: true,
      message: `Product with id: '${productId}' deleted successfully ✅`,
      deletedProduct,
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    // ✅ Handle Mongoose CastError (invalid ObjectId format)
    if (err.name === "CastError") {
      return res.status(400).json({
        success: false,
        message:
          "Invalid productId format. Please provide a valid MongoDB ObjectId ⚠️",
      });
    }
    // ✅ Handle other server errors
    return res.status(500).json({
      success: false,
      message: "Server error 🔴",
      error: err.message,
    });
  }
};
