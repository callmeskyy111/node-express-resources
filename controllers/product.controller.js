import productsArr from "../data.json" with { type: "json" };
const products = productsArr.products; //for better readability

//! Product - Controllers/Functions
export const createProduct=(req,res)=>{
    const newProduct = { _id: Date.now() , ...req.body};
    products.push(newProduct);
    res.status(201).json({ success: true, message:'Product Added Successfully ✅' ,product: newProduct });
}

export const getAllProducts = (req,res)=>{
    res.json(products);
  }
export const getSingleProductById = (req, res) => {
  const productId = Number(req.params.id); // Convert to a number
  const product = products.find((p) => p._id === productId);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.json({ success: true, product });
}  

export const updateProduct = (req,res)=>{
    const productId = Number(req.params.id);
    const productIdx = products.findIndex((p) => p._id === productId);
    if(productIdx === -1){
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    products.splice(productIdx, 1, {_id: productId,...req.body});
    res.json({ success: true, message: "Product updated successfully ✅", product: products[productIdx] });
}

export const editProduct = (req,res)=>{
    const productId = Number(req.params.id);
    const productIdx = products.findIndex((p) => p._id === productId);
    const product = products[productIdx];
    if(productIdx === -1){
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    products.splice(productIdx, 1, {...product, ...req.body});
    res.json({ success: true, message: "Product updated successfully ✅", product });
}

export const deleteProduct = (req,res)=>{
    const productId = Number(req.params.id);
    const productIdx = products.findIndex((p) => p._id === productId);
    if(productIdx === -1){
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    const product = products[productIdx];
    products.splice(productIdx,1);
    res.status(201).json({ success: true, message: "Product deleted successfully ✅", product });
  }