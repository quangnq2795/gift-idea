"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Store from "@/components/store/Store";
import { ProductViewModeProvider, useProductViewMode } from "@/components/product/ProductViewModeContext";

export default function StorePage() {
  const { sid } = useParams(); // Get storeId from URL

  if (!sid || typeof sid !== "string") {
    return <div>Error: Invalid Store ID</div>;
  }

  return (
    <ProductViewModeProvider>
      <StorePageContent storeId={sid} />
    </ProductViewModeProvider>
  );
}

function StorePageContent({ storeId }: { storeId: string }) {
  const { setViewMode } = useProductViewMode();

  useEffect(() => {
    // Set view mode to "normal" when the component mounts
    setViewMode("normal");
  }, [setViewMode]);

  return <Store storeId={storeId} />;
}
