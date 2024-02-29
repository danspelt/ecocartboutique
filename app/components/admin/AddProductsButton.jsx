"use client";
import productService from "@/lib/services/productService";
const AddProductsButton = () => {
  const addProducts = productService.addProductsFirestore;
  return (
    <button onClick={addProducts} className="btn btn-primary">
      Add Products
    </button>
  );
};

export default AddProductsButton;
