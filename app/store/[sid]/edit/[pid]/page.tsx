"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductViewMode, useViewMode } from "@/components/product/ProductViewMode";
import { ProductDetail } from "@/components/product/basic_temp/ProductDetail";

export default function EditProductPage() {
  const { sid, pid } = useParams() as { sid: string; pid: string };

  return (
    <ProductViewMode>
      <EditProductPageContent sid={sid} pid={pid} />
    </ProductViewMode>
  );
}

function EditProductPageContent({ sid, pid }: { sid: string; pid: string }) {
  const { viewMode, setViewMode } = useViewMode();
  const [productData, setProductData] = useState<any | null>(null);

  useEffect(() => {
    // Set view mode to "edit" when the component mounts
    setViewMode("edit");

    async function fetchProductData() {
      try {
        const response = await fetch(`/api/product?id=${pid}`);
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
  }, [pid, setViewMode]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      {/* Edit & Preview Buttons */}
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${viewMode === "edit" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setViewMode("edit")}
        >
          Edit
        </button>
        <button
          className={`px-4 py-2 rounded ${viewMode === "normal" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => setViewMode("normal")}
        >
          Preview
        </button>
      </div>

      {/* Product Detail */}
      <div className="w-full max-w-3xl">
        <ProductDetail product={productData} />
      </div>

      {/* Save Button */}
      <button className="bg-green-500 text-white px-6 py-2 rounded">Save</button>
    </div>
  );
}
