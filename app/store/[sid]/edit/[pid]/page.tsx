"use client";

import React, { useEffect, useState, useCallback, memo, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ProductViewModeProvider,
  useProductViewMode,
} from "@/components/product/ProductViewModeContext";
import { ProductDetailSkeleton } from "@/components/product/basic_temp/ProductDetailSkeleton";
import { ProductDetailEdit } from "@/components/product/basic_temp/ProductDetailEdit";
import { ProductDetail } from "@/components/product/basic_temp/ProductDetail";

interface Product {
  id: number;
  storeId: string;
  productId: string;
  storeName: string;
  productName: string;
  description: string;
  price: number;
  images: { id: number; url: string; alt: string }[];
  shopee?: string;
  facebook?: string;
}

// Extracted type for reuse
type ViewMode = "normal" | "edit";

// Memoized mode buttons component
const ModeButtons = memo(function ModeButtons({
  viewMode,
  onModeChange,
}: {
  viewMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}) {
  return (
    <div className="flex gap-3">
      <button
        className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm shadow-sm
          ${viewMode === "edit"
            ? "bg-blue-600 text-white shadow-blue-100 hover:shadow-blue-200 hover:bg-blue-700"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          }`}
        onClick={() => onModeChange("edit")}
        disabled={viewMode === "edit"}
        aria-label="Switch to Edit Mode"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </div>
      </button>
      <button
        className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm shadow-sm
          ${viewMode === "normal"
            ? "bg-blue-600 text-white shadow-blue-100 hover:shadow-blue-200 hover:bg-blue-700"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          }`}
        onClick={() => onModeChange("normal")}
        disabled={viewMode === "normal"}
        aria-label="Switch to Preview Mode"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview
        </div>
      </button>
    </div>
  );
});

// Memoized save button component
const SaveButton = memo(function SaveButton({
  isLoading,
  onSave,
}: {
  isLoading: boolean;
  onSave: () => void;
}) {
  return (
    <button
      className={`px-8 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm shadow-sm
        ${isLoading
          ? "bg-gray-400 cursor-not-allowed opacity-75"
          : "bg-emerald-600 text-white shadow-emerald-100 hover:shadow-emerald-200 hover:bg-emerald-700"
        }`}
      onClick={onSave}
      disabled={isLoading}
      aria-label="Save Product"
    >
      <div className="flex items-center gap-2">
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Saving...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Save Changes</span>
          </>
        )}
      </div>
    </button>
  );
});

// Error component
const ErrorDisplay = memo(function ErrorDisplay({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center p-4 text-red-500">
      <p>{message}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={onRetry}
        aria-label="Retry loading product"
      >
        Retry
      </button>
    </div>
  );
});

export default function EditProductPage() {
  const { pid } = useParams() as { pid: string };
  const [productData, setProductData] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductData = useCallback(async (abortSignal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/product?id=${pid}`, {
        signal: abortSignal,
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      if (!res.ok) throw new Error("Failed to fetch product data");

      const data = await res.json();
      setProductData(data);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Fetch error:", err);
        setError("Failed to load product data. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [pid]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchProductData(abortController.signal);
    return () => abortController.abort();
  }, [fetchProductData]);

  const handleRetry = useCallback(() => {
    fetchProductData();
  }, [fetchProductData]);

  if (error) {
    return <ErrorDisplay message={error} onRetry={handleRetry} />;
  }

  if (isLoading || !productData) {
    return <ProductDetailSkeleton />;
  }

  return (
    <ProductViewModeProvider>
      <EditProductPageContent initialProduct={productData} />
    </ProductViewModeProvider>
  );
}

interface EditProductPageContentProps {
  initialProduct: Product;
}

const EditProductPageContent = memo(function EditProductPageContent({
  initialProduct,
}: EditProductPageContentProps) {
  const { viewMode, setViewMode } = useProductViewMode();
  const [product, setProduct] = useState(initialProduct);
  const [isLoading, setIsLoading] = useState(false);
  const productRef = useRef(product);

  // Sync with initialProduct when it changes
  useEffect(() => {
    setProduct(initialProduct);
    productRef.current = initialProduct;
  }, [initialProduct]);

  const handleUpdate = useCallback((updates: Partial<Product>) => {
    setProduct(prev => {
      const updated = { ...prev, ...updates };
      productRef.current = updated;
      return updated;
    });
  }, []);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const productToSave = { ...productRef.current };
      
      const imagePromises = productToSave.images.map(async (img) => {
        if (img.url.startsWith('data:image')) {
          const response = await fetch(img.url);
          const blob = await response.blob();
          const file = new File([blob], img.alt, { type: blob.type });
          formData.append('images', file);
          return {
            ...img,
            url: `pending_upload_${img.id}`
          };
        }
        return img;
      });

      productToSave.images = await Promise.all(imagePromises);
      formData.append('product', JSON.stringify(productToSave));

      const response = await fetch(`/api/product/${productRef.current.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      const updatedProduct = await response.json();
      setProduct(updatedProduct);
      productRef.current = updatedProduct;

      alert('Product saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, [setViewMode]);

  // Memoize the product view component to prevent unnecessary re-renders
  const ProductView = useMemo(() => (
    viewMode === "edit" ? (
      <ProductDetailEdit
        product={product}
        onUpdate={handleUpdate}
      />
    ) : (
      <ProductDetail
        product={product}
      />
    )
  ), [viewMode, product, handleUpdate]);

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <ModeButtons viewMode={viewMode} onModeChange={handleModeChange} />
      <div className="w-full max-w-3xl">
        {ProductView}
      </div>
      {viewMode === "edit" && <SaveButton isLoading={isLoading} onSave={handleSave} />}
    </div>
  );
});
