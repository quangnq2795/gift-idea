"use client";

import { useEffect, useState } from "react";
import { ProductDetail } from "@/components/product/basic_temp/ProductDetail";
import ScrollBar from "@/components/scrollbar/ScrollBar";
import { useParams } from "next/navigation";
import { ProductViewModeProvider, useProductViewMode } from "@/components/product/ProductViewModeContext";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = useParams() as { id: string };
  const [productData, setProductData] = useState<any | null>(null);

  return (
    <ProductViewModeProvider>
      <ProductDetailPageContent id={id} />
    </ProductViewModeProvider>
  );
}

function ProductDetailPageContent({ id }: { id: string }) {
  const { viewMode, setViewMode } = useProductViewMode();
  const [productData, setProductData] = useState<any | null>(null);
  const [showScrollBar, setShowScrollBar] = useState(false);

  useEffect(() => {
    setViewMode("normal");

    async function fetchProductData() {
      try {
        const response = await fetch(`/api/product?id=${id}`);
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
  }, [id, setViewMode]);

  useEffect(() => {
    if (productData) {
      const timer = setTimeout(() => setShowScrollBar(true), 0);
      return () => clearTimeout(timer);
    }
  }, [productData]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductDetail product={productData} />
      {showScrollBar && <ScrollBar />}
    </div>
  );
}
