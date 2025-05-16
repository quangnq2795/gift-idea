import React, { useState, useEffect, useCallback, memo } from "react";
import { Avatar } from "@heroui/react";
import { ShopeeIcon, FacebookIcon } from "@/components/icons";
import Link from "next/link";
import { ImageGridEdit } from "@/components/product/basic_temp/ImageGrid/ImageGridEdit";
import { DescriptionEdit } from "./DescriptionEdit";

export interface ProductDetailEditProps {
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
  onUpdate: (updates: Partial<ProductDetailEditProps["product"]>) => void;
}

// Memoized store header component
const StoreHeader = memo(function StoreHeader({
  storeId,
  storeName,
}: {
  storeId: string;
  storeName: string;
}) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar
        isBordered
        color="primary"
        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
      />
      <Link href={`/store/${storeId}`}>
        <h1 className="text-xl font-bold text-gray-800 hover:underline cursor-pointer truncate">
          {storeName}
        </h1>
      </Link>
    </div>
  );
});

// Memoized input field component
const InputField = memo(function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  icon,
  iconColor,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
  iconColor?: string;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconColor} w-4 h-4`}>
            {icon}
          </div>
        )}
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-10' : 'p-2'} h-10 text-sm border border-gray-300 rounded-md focus:ring-2 focus:outline-none ${
            iconColor ? `focus:ring-[${iconColor}]` : 'focus:ring-blue-500'
          }`}
        />
      </div>
    </div>
  );
});

export const ProductDetailEdit = memo(function ProductDetailEdit({
  product,
  onUpdate,
}: ProductDetailEditProps) {
  const [productName, setProductName] = useState(product.productName);
  const [shopeeLink, setShopeeLink] = useState(product.shopee || "");
  const [facebookLink, setFacebookLink] = useState(product.facebook || "");
  const [images, setImages] = useState(product.images || []);
  const maxImages = 4;

  // Sync local state with product prop
  useEffect(() => {
    setProductName(product.productName);
    setShopeeLink(product.shopee || "");
    setFacebookLink(product.facebook || "");
    setImages(product.images || []);
  }, [product]);

  // Memoized handlers
  const handleNameChange = useCallback((value: string) => {
    setProductName(value);
    onUpdate({ productName: value });
  }, [onUpdate]);

  const handleShopeeChange = useCallback((value: string) => {
    setShopeeLink(value);
    onUpdate({ shopee: value });
  }, [onUpdate]);

  const handleFacebookChange = useCallback((value: string) => {
    setFacebookLink(value);
    onUpdate({ facebook: value });
  }, [onUpdate]);

  const handleDescriptionChange = useCallback((value: string) => {
    onUpdate({ description: value });
  }, [onUpdate]);

  const handleRemoveImage = useCallback((id: number) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== id);
      onUpdate({ images: updated });
      return updated;
    });
  }, [onUpdate]);

  const handleAddImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || images.length >= maxImages) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const newImage = {
        id: Date.now(),
        url: base64String,
        alt: file.name,
      };
      
      setImages(prev => {
        const updated = [...prev, newImage];
        onUpdate({ images: updated });
        return updated;
      });
    };
    reader.readAsDataURL(file);
  }, [images.length, maxImages, onUpdate]);

  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col w-full max-w-2xl rounded-md border p-6 shadow-lg space-y-4 bg-white">
        <StoreHeader storeId={product.storeId} storeName={product.storeName} />

        <InputField
          id="productName"
          label="Product Name"
          value={productName}
          onChange={handleNameChange}
          placeholder="Enter product name"
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <DescriptionEdit
            description={product.description}
            onUpdate={handleDescriptionChange}
          />
        </div>

        <div className="space-y-2">
          <InputField
            id="shopeeLink"
            label="Shopee Link"
            value={shopeeLink}
            onChange={handleShopeeChange}
            placeholder="Enter Shopee Link"
            icon={<ShopeeIcon />}
            iconColor="text-[#EE4D2D]"
          />

          <InputField
            id="facebookLink"
            label="Facebook Link"
            value={facebookLink}
            onChange={handleFacebookChange}
            placeholder="Enter Facebook Link"
            icon={<FacebookIcon />}
            iconColor="text-[#1877F2]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Product Images ({images.length}/{maxImages})
          </label>
          <ImageGridEdit
            images={images}
            maxImages={maxImages}
            onRemoveImage={handleRemoveImage}
            onAddImage={handleAddImage}
          />
        </div>
      </div>
    </div>
  );
});
