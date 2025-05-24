import React, { useState } from "react";
import { Avatar } from "@heroui/react";
import { ImageGrid } from "./ImageGrid/ImageGrid";
import { Description } from "./Description";
import Link from "next/link";
import { ShopeeIcon, FacebookIcon, BookmarkIcon } from "@/components/icons";

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
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-2xl border rounded-md shadow-lg p-6 bg-white">
        <div className="flex flex-col space-y-4">
          {/* Store Name with Avatar */}
          <div className="flex items-center justify-between space-x-4">
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
            <button
              type="button"
              className="ml-2 p-1 rounded-full hover:bg-gray-100 transition group relative active:scale-90 focus:scale-90"
              aria-label="Bookmark sản phẩm"
              onClick={() => setBookmarked((prev) => !prev)}
            >
              <BookmarkIcon active={bookmarked} className="w-5 h-5 transition-colors" />
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity duration-200">
                {bookmarked ? "Hủy ghi nhớ" : "Thêm vào ghi nhớ"}
              </span>
            </button>
          </div>

          <p className="font-semibold text-lg truncate w-full">
            {product.productName}
          </p>

          {/* Description */}
          <Description description={product.description} />

          {/* Social Links (Shopee & Facebook) */}
          {(product.shopee || product.facebook) && (
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