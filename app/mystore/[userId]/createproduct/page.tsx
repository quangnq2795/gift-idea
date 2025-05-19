"use client";

import React, { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductDetailEdit } from "@/components/product/basic_temp/ProductDetailEdit";
import { ProductDetail } from "@/components/product/basic_temp/ProductDetail";
import { Button } from "@heroui/react";

interface Product {
  id: number;
  storeId: string;
  storeName: string;
  productName: string;
  description: string;
  price: number;
  images: { id: number; url: string; alt: string }[];
  shopee?: string;
  facebook?: string;
}

type ViewMode = "edit" | "preview";

export default function CreateProductPage() {
  const { userId } = useParams() as { userId: string };
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("edit");
  const [product, setProduct] = useState<Product>({
    id: 0,
    storeId: userId,
    storeName: "Your Store",
    productName: "",
    description: "",
    price: 0,
    images: [],
    shopee: "",
    facebook: ""
  });

  const handleUpdate = useCallback((updates: Partial<Product>) => {
    setProduct(prev => ({ ...prev, ...updates }));
  }, []);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push(`/mystore?userId=${userId}`);
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [router, userId]);

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <div className="flex gap-2 mb-2">
        <Button
          color={viewMode === "edit" ? "primary" : "default"}
          variant={viewMode === "edit" ? "solid" : "bordered"}
          onPress={() => setViewMode("edit")}
        >
          Edit
        </Button>
        <Button
          color={viewMode === "preview" ? "primary" : "default"}
          variant={viewMode === "preview" ? "solid" : "bordered"}
          onPress={() => setViewMode("preview")}
        >
          Preview
        </Button>
      </div>
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
        <Button
          color="primary"
          variant="solid"
          onPress={handleSave}
          isLoading={isLoading}
        >
          Create Product
        </Button>
        <Button
          color="danger"
          variant="light"
          onPress={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
