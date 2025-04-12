import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductDetailProps } from "./ProductDetail";

interface ProductInfoContextProps {
  product: ProductDetailProps["product"];
  updateProduct: (updates: Partial<ProductDetailProps["product"]>) => void;
}

const ProductInfoContext = createContext<ProductInfoContextProps | undefined>(undefined);

export const useProductInfo = () => {
  const context = useContext(ProductInfoContext);
  if (!context) {
    throw new Error("useProductInfo must be used within a ProductInfoProvider. Ensure the provider is wrapping your component.");
  }
  return context;
};

export const ProductInfoProvider: React.FC<{
  product: ProductDetailProps["product"];
  children: ReactNode;
}> = ({ product: initialProduct, children }) => {
  const [product, setProduct] = useState<ProductDetailProps["product"]>(initialProduct || {});

  const updateProduct = (updates: Partial<ProductDetailProps["product"]>) => {
    setProduct((prev) => ({ ...prev, ...updates }));
  };

  return (
    <ProductInfoContext.Provider value={{ product, updateProduct }}>
      {children}
    </ProductInfoContext.Provider>
  );
};