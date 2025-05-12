import React, { useState } from "react";
import { Avatar } from "@heroui/react";
import { ImageGrid } from "./ImageGrid/ImageGrid";
import { Description } from "./Description";
import { useProductViewMode } from "@/components/product/ProductViewModeContext";
import Link from "next/link";
import { ShopeeIcon, FacebookIcon } from "@/components/icons";

export interface ProductDetailProps {
  product: {
    id: number;
    storeId: string;
    storeName: string;
    productName: string;
    description: string;
    price: number;
    images: { id: number; url: string; alt: string }[];
    shopee?: string;
    facebook?: string;
  };
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { viewMode } = useProductViewMode();
  const isEditMode = viewMode === "edit";

  const [productName, setProductName] = useState(product.productName);
  const [shopeeLink, setShopeeLink] = useState(product.shopee || "");
  const [facebookLink, setFacebookLink] = useState(product.facebook || "");

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-2xl border rounded-md shadow-lg p-6 bg-white">
        <div className="flex flex-col space-y-4">
          {/* Store Name with Avatar */}
          <div className="flex items-center space-x-4">
            <Avatar
              isBordered
              color="primary"
              src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            />
            <Link href={`/store/${product.storeId}`}>
              <h1 className="text-xl font-bold text-gray-800 truncate cursor-pointer hover:underline">
                {product.storeName}
              </h1>
            </Link>
          </div>

          {/* Product Name (Editable in Edit Mode) */}
          {isEditMode ? (
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          ) : (
            <p className="font-semibold text-lg truncate w-full">{productName}</p>
          )}

          {/* Description */}
          <Description description={product.description} />

          {/* Social Links (Shopee & Facebook) */}
          {isEditMode ? (
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Shopee Link
                </p>
                <div className="relative">
                  <ShopeeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-5 h-5" />
                  <input
                    type="text"
                    value={shopeeLink}
                    onChange={(e) => setShopeeLink(e.target.value)}
                    placeholder="Enter Shopee Link"
                    className="pl-10 border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Facebook Link
                </p>
                <div className="relative">
                  <FacebookIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <input
                    type="text"
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.target.value)}
                    placeholder="Enter Facebook Link"
                    className="pl-10 border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>              
            </div>
          ) : (
            (product.shopee || product.facebook) && (
              <div className="flex space-x-4">
                {product.shopee && (
                  <a
                    href={product.shopee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-md"
                  >
                    <ShopeeIcon className="w-5 h-5" />
                    <span>Buy on Shopee</span>
                  </a>
                )}
                {product.facebook && (
                  <a
                    href={product.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-md"
                  >
                    <FacebookIcon className="w-5 h-5" />
                    <span>View on Facebook</span>
                  </a>
                )}
              </div>
            )
          )}
        </div>

        {/* Images */}
        <div className="mt-4 max-h-100">
          <ImageGrid images={product.images} />
        </div>
      </div>
    </div>
  );
};
