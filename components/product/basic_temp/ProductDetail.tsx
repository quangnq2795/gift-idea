import React, { useState } from "react";
import { Avatar } from "@heroui/react";
import { ImageGrid } from "./ImageGrid/ImageGrid";
import { Description } from "./Description";
import Link from "next/link";
import { ShopeeIcon, FacebookIcon, BookmarkIcon, ZaloIcon } from "@/components/icons";

export interface ProductDetailProps {
  product: {
    id: number;
    storeId: string;
    storeName: string;
    productName: string;
    description: string;
    price: number;
    images: { id: number; url: string; alt: string }[];
    website?: string;
    fanpage?: string;
    shopee?: string;
    contact?: string;
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

          {/* Social Links (Website, Fanpage, Shopee, Tư vấn) */}
          {(product.website || product.fanpage || product.shopee || product.contact) && (
            <div className="flex flex-wrap gap-3">
              {product.website && (
                <a
                  href={product.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-md text-sm font-medium hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105 shadow-md"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c2.21 0 4 4.03 4 9s-1.79 9-4 9-4-4.03-4-9 1.79-9 4-9zm0 0v18" /></svg>
                  <span>Website</span>
                </a>
              )}
              {product.fanpage && (
                <a
                  href={product.fanpage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-md"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <span>Fanpage</span>
                </a>
              )}
              {product.shopee && (
                <a
                  href={product.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-md"
                >
                  <ShopeeIcon className="w-5 h-5" />
                  <span>Shopee</span>
                </a>
              )}
              {product.contact && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-md text-sm font-medium hover:from-blue-500 hover:to-blue-700 transition-all transform hover:scale-105 shadow-md"
                >
                  <ZaloIcon className="w-5 h-5" />
                  <span>Tư vấn</span>
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