import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: [true, "Product with the same title already exists⚠️"],
    },
    description: { type: String },
    price: {
      type: Number,
      required: true,
      min: [0, "price cannot be negative ⚠️"],
    },
    discountPercentage: {
      type: Number,
      min: [0, "Discount cannot be negative ⚠️"],
      max: [50, "Discount cannot exceed 50% ⚠️"],
    },
    rating: {
      type: Number,
      min: [0, "rating cannot be negative ⚠️"],
      max: [5, "rating cannot exceed 5 ⚠️"],
    },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [String],
  },
  { timestamps: true } // ✅ Automatically adds `createdAt` & `updatedAt`
);

const productModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default productModel;
