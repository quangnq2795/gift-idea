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
import { Button } from "@heroui/react";

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
type ViewMode = "edit" | "preview";

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
      <Button
        color={viewMode === "edit" ? "primary" : "default"}
        variant={viewMode === "edit" ? "solid" : "bordered"}
        onPress={() => onModeChange("edit")}
      >
        Edit
      </Button>
      <Button
        color={viewMode === "preview" ? "primary" : "default"}
        variant={viewMode === "preview" ? "solid" : "bordered"}
        onPress={() => onModeChange("preview")}
      >
        Preview
      </Button>
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
    <Button
      color="primary"
      variant="solid"
      onPress={onSave}
      isLoading={isLoading}
    >
      Save Changes
    </Button>
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
  const { sid, pid } = useParams() as { sid: string; pid: string };
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("edit");
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/product?id=${pid}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError("Failed to load product data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [pid]);

  const handleUpdate = useCallback((updates: Partial<Product>) => {
    if (!product) return;
    setProduct({ ...product, ...updates });
  }, [product]);

  const handleSave = useCallback(async () => {
    if (!product) return;
    
    setIsLoading(true);
    try {
      const formData = new FormData();
      const productToSave = { ...product };
      
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

      const response = await fetch(`/api/product/${productToSave.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      const updatedProduct = await response.json();
      setProduct(updatedProduct);

      alert('Product saved successfully!');
      router.push(`/store/${sid}`);
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [router, sid, product]);

  const handleModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  if (error) {
    return <ErrorDisplay message={error} onRetry={() => {
      fetchProduct();
    }} />;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <ProductViewModeProvider>
      <div className="flex flex-col items-center p-4 space-y-4">
        <ModeButtons viewMode={viewMode} onModeChange={handleModeChange} />
        <div className="w-full max-w-3xl">
          {viewMode === "edit" ? (
            <ProductDetailEdit
              product={product}
              onUpdate={handleUpdate}
            />
          ) : (
            <ProductDetail product={product} />
          )}
        </div>
        <div className="flex gap-4">
          <SaveButton isLoading={isLoading} onSave={handleSave} />
          <Button
            color="danger"
            variant="light"
            onPress={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </div>
    </ProductViewModeProvider>
  );
}
