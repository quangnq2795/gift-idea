"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Store from "@/components/store/Store";
import { ProductViewMode, useViewMode } from "@/components/product/ProductViewMode";

export default function StorePage() {
  const { sid } = useParams(); // Get storeId from URL

  if (!sid || typeof sid !== "string") {
    return <div>Error: Invalid Store ID</div>;
  }

  return (
    <ProductViewMode>
      <StorePageContent storeId={sid} />
    </ProductViewMode>
  );
}

function StorePageContent({ storeId }: { storeId: string }) {
  const { setViewMode } = useViewMode();

  useEffect(() => {
    // Set view mode to "normal" when the component mounts
    setViewMode("normal");
  }, [setViewMode]);

  return <Store storeId={storeId} />;
}
