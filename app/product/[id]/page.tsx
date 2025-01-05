"use client";

import { useEffect, useState } from "react";
import { ProductDetail } from "@/components/product/ProductDetail";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [productData, setProductData] = useState<any | null>(null);

  useEffect(() => {
    // Fetch product data from the API based on ID
    async function fetchProductData() {
      try {
        const response = await fetch(`/api/products/${params.id}`);
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
  }, [params.id]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductDetail product={productData}></ProductDetail>
    </div>
  );
}
