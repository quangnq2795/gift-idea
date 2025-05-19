"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import Store from "@/components/store/Store";
import { ProductViewModeProvider } from "@/components/product/ProductViewModeContext";
import { StoreIcon } from "@/components/icons";

export default function MyStorePage() {
  const [hasStore, setHasStore] = useState<boolean | null>(null);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("userId");

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const checkStore = async () => {
      try {
        const response = await fetch(`/api/mystore?userId=${userId}`);
        const data = await response.json();
        
        setHasStore(data.hasStore);
        setStoreId(data.storeId);
      } catch (error) {
        console.error("Error checking store:", error);
        setHasStore(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkStore();
  }, [userId]);

  if (!userId) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500">Không tìm thấy thông tin người dùng</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!hasStore) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <StoreIcon size={100} />
        <h1 className="text-2xl font-bold text-gray-800">Bạn chưa có cửa hàng</h1>
        <p className="text-gray-600 text-center max-w-md">
          Tạo cửa hàng của riêng bạn để bắt đầu bán hàng và quản lý sản phẩm của bạn.
        </p>
        <Button 
          color="primary"
          size="lg"
          onClick={() => router.push("/store/create")}
          className="font-medium"
        >
          Tạo cửa hàng ngay
        </Button>
      </div>
    );
  }

  if (!storeId) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500">Có lỗi xảy ra. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  return (
    <ProductViewModeProvider>
      <Store storeId={storeId} />
    </ProductViewModeProvider>
  );
}
