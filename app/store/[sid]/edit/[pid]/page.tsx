"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  ProductViewModeProvider,
  useProductViewMode,
} from "@/components/product/ProductViewModeContext";
import {
  ProductDetail,
  ProductDetailProps,
} from "@/components/product/basic_temp/ProductDetail";
import { ProductInfoProvider, useProductInfo } from "@/components/product/ProductInfoContext";
import { ProductDetailSkeleton } from "@/components/product/basic_temp/ProductDetailSkeleton";

// Align with ScrollBarItemProps and API
interface Product {
  imgSrc: string;
  productId: string;
  title?: string;
  description?: string;
  price?: number;
}

export default function EditProductPage() {
  const { pid } = useParams() as { pid: string };
  const [productData, setProductData] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memoized fetch function
  const fetchProductData = useCallback(
    async (abortSignal?: AbortSignal) => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/product?id=${pid}`, {
          signal: abortSignal,
          cache: "force-cache",
        });

        if (!res.ok) throw new Error("Failed to fetch product data");

        const data: Product = await res.json();
        setProductData(data);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Fetch error:", err);
          setError("Failed to load product data. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [pid]
  );

  // Fetch data with cleanup
  useEffect(() => {
    const abortController = new AbortController();
    fetchProductData(abortController.signal);
    return () => abortController.abort();
  }, [fetchProductData]);

  // Retry handler
  const handleRetry = useCallback(() => {
    fetchProductData();
  }, [fetchProductData]);

  if (error) {
    return (
      <div className="flex flex-col items-center p-4 text-red-500">
        <p>{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleRetry}
          aria-label="Retry loading product"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading || !productData) {
    return <ProductDetailSkeleton />;
  }

  return (
    <ProductViewModeProvider>
      <ProductInfoProvider product={productData}>
        <EditProductPageContent />
      </ProductInfoProvider>
    </ProductViewModeProvider>
  );
}

const EditProductPageContent = React.memo(function EditProductPageContent() {
  const { viewMode, setViewMode } = useProductViewMode();
  const { product, updateProduct } = useProductInfo();

  // Set view mode to "edit" on mount
  useEffect(() => {
    setViewMode("edit");
    return () => setViewMode("normal");
  }, [setViewMode]);

  // Memoized save handler
  const handleSave = useCallback(async () => {
    const abortController = new AbortController();
    try {
      const response = await fetch(`/api/product/save`, {
        method: "POST",
        body: JSON.stringify({
          productId: product.productId,
          imgSrc: product.imgSrc,
          title: product.title,
          description: product.description,
          price: product.price,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
      });

      if (!response.ok) throw new Error("Failed to save product");
      // Optionally update local state with saved data
      const savedData = await response.json();
      updateProduct(savedData);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Save error:", err);
      }
    }
    return () => abortController.abort();
  }, [product, updateProduct]);

  // Memoized buttons
  const modeButtons = React.useMemo(
    () => (
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            viewMode === "edit" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setViewMode("edit")}
          aria-label="Switch to Edit Mode"
        >
          Edit
        </button>
        <button
          className={`px-4 py-2 rounded ${
            viewMode === "normal" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setViewMode("normal")}
          aria-label="Switch to Preview Mode"
        >
          Preview
        </button>
      </div>
    ),
    [viewMode, setViewMode]
  );

  const saveButton = React.useMemo(
    () =>
      viewMode === "edit" && (
        <button
          className="bg-green-500 text-white px-6 py-2 rounded"
          onClick={handleSave}
          aria-label="Save Product"
        >
          Save
        </button>
      ),
    [viewMode, handleSave]
  );

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      {modeButtons}
      <div className="w-full max-w-3xl">
        <ProductDetail product={product} />
      </div>
      {saveButton}
    </div>
  );
});