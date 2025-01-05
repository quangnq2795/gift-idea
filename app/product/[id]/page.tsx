"use client";

import { useEffect, useState } from "react";
import { ProductDetail } from "@/components/product/ProductDetail";
import { use } from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap `params` using React's `use` hook
  const { id } = use(params);

  const [productData, setProductData] = useState<any | null>(null);

  useEffect(() => {
    // Fetch product data from the API based on ID
    async function fetchProductData() {
      try {
        const response = await fetch(`/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProductData();
  }, [id]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductDetail product={productData}></ProductDetail>
    </div>
  );
}
