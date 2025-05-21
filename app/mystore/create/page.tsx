"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Input, Avatar, Chip } from "@heroui/react";
import { StoreIcon, AddIcon, EditIcon } from "@/components/icons";

interface Category {
    id: number;
    name: string;
}

export default function CreateStorePage() {
    const [storeName, setStoreName] = useState("");
    const [website, setWebsite] = useState("");
    const [shopee, setShopee] = useState("");
    const [facebook, setFacebook] = useState("");
    const [zalo, setZalo] = useState("");
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [description, setDescription] = useState("");
    
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const backgroundInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const userId = "11111"; // Get this from your auth context/state

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/store-categories');
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryToggle = (categoryId: number) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            }
            if (prev.length >= 5) {
                return prev;
            }
            return [...prev, categoryId];
        });
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setPreview: (value: string | null) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("storeName", storeName);
            formData.append("userId", userId);
            formData.append("categories", JSON.stringify(selectedCategories));
            formData.append("website", website);
            formData.append("shopee", shopee);
            formData.append("facebook", facebook);
            formData.append("zalo", zalo);
            formData.append("description", description);
            

            if (avatarInputRef.current?.files?.[0]) {
                formData.append("avatar", avatarInputRef.current.files[0]);
            }
            if (backgroundInputRef.current?.files?.[0]) {
                formData.append("background", backgroundInputRef.current.files[0]);
            }

            const response = await fetch("/api/mystore/create", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create store");
            }

            router.push(`/store/${data.storeId}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create store");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Background Upload Section */}
                <div className="relative">
                    <div className="relative w-full h-48 bg-gray-100 hover:bg-gray-200 rounded-lg overflow-hidden group transition-all ring-0 ring-transparent group-hover:ring-2 group-hover:ring-blue-500">
                        {backgroundPreview ? (
                            <>
                                <Image
                                    src={backgroundPreview}
                                    alt="Background preview"
                                    fill
                                    className="object-cover"
                                />
                                {/* Edit Overlay */}
                                <div 
                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
                                    onClick={() => backgroundInputRef.current?.click()}
                                >
                                    <div className="flex flex-col items-center text-white">
                                        <EditIcon className="w-6 h-6 mb-2" />
                                        <span className="text-sm mt-1">Chỉnh sửa ảnh bìa</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full relative">
                                <Button
                                    type="button"
                                    isIconOnly
                                    color="default"
                                    variant="flat"
                                    onClick={() => backgroundInputRef.current?.click()}
                                    className="bg-white/80 backdrop-blur p-3 rounded-full transition-transform duration-200 group-hover:scale-110 mb-2"
                                >
                                    <AddIcon className="w-6 h-6 transition-transform duration-200 group-hover:scale-125 group-hover:text-blue-500" />
                                </Button>
                                {/* Text below AddIcon */}
                            <span className="text-sm text-gray-500 font-medium opacity-0 group-hover:opacity-75 transition-opacity duration-200">
                                Thêm ảnh nền cho cửa hàng
                            </span>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={backgroundInputRef}
                            onChange={(e) => handleImageChange(e, setBackgroundPreview)}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Avatar and Store Name Section */}
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <div onClick={() => avatarInputRef.current?.click()} className="cursor-pointer">
                            <Avatar
                                isBordered
                                showFallback
                                src={avatarPreview || undefined}
                                size="lg"
                                fallback={
                                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                                        <AddIcon className="w-6 h-6 text-gray-400" />
                                    </div>
                                }
                            />
                            {avatarPreview && (
                                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                    <div className="flex flex-col items-center text-white">
                                        <EditIcon className="w-4 h-4" />
                                        <span className="text-xs">Sửa</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Input
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        placeholder="Tên cửa hàng"
                        required
                        className="flex-grow"
                    />
                    <input
                        type="file"
                        ref={avatarInputRef}
                        onChange={(e) => handleImageChange(e, setAvatarPreview)}
                        accept="image/*"
                        className="hidden"
                    />
                </div>

                {/* Description Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        Mô tả cửa hàng
                        <span className="ml-2 text-xs text-gray-500">
                            {description.trim() ? description.trim().split(/\s+/).length : 0}/200 từ
                        </span>
                    </label>
                    <textarea
                        value={description}
                        onChange={e => {
                            // Giới hạn 200 từ
                            const words = e.target.value.split(/\s+/).filter(Boolean);
                            if (words.length <= 200) {
                                setDescription(e.target.value);
                            } else {
                                setDescription(words.slice(0, 200).join(" "));
                            }
                        }}
                        rows={5}
                        placeholder="Nhập mô tả về cửa hàng của bạn..."
                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>             

                {/* Social and Contact Information Section */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">
                        Thông tin liên hệ
                    </h3>
                    <div className="space-y-3">
                        <Input
                            type="url"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            placeholder="Website của bạn"
                            startContent={
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            }
                        />
                        <Input
                            type="url"
                            value={shopee}
                            onChange={(e) => setShopee(e.target.value)}
                            placeholder="Link shop Shopee"
                            startContent={
                                <svg className="w-5 h-5 text-[#EE4D2D]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm0 20c-4.9 0-9-4.1-9-9s4.1-9 9-9 9 4.1 9 9-4.1 9-9 9z"/>
                                </svg>
                            }
                        />
                        <Input
                            type="url"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            placeholder="Link Facebook của bạn"
                            startContent={
                                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            }
                        />
                        <Input
                            type="tel"
                            value={zalo}
                            onChange={(e) => {
                                // Only allow numbers and limit to 10 digits
                                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setZalo(value);
                            }}
                            placeholder="Số điện thoại Zalo"
                            startContent={
                                <svg className="w-5 h-5 text-[#0068FF]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5 13.5c0 .65-.375 1.25-1.125 1.25H7.625c-.75 0-1.125-.6-1.125-1.25v-7c0-.65.375-1.25 1.125-1.25h8.75c.75 0 1.125.6 1.125 1.25v7z"/>
                                </svg>
                            }
                            description="Số điện thoại Zalo của bạn"
                        />
                    </div>
                </div>

                {/* Category Selection Section */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Lĩnh vực kinh doanh (tối đa 5)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Chip
                                key={category.id}
                                color={selectedCategories.includes(category.id) ? "primary" : "default"}
                                variant={selectedCategories.includes(category.id) ? "solid" : "flat"}
                                onClick={() => handleCategoryToggle(category.id)}
                                className="cursor-pointer"
                                isDisabled={selectedCategories.length >= 5 && !selectedCategories.includes(category.id)}
                            >
                                {category.name}
                            </Chip>
                        ))}
                    </div>
                    {selectedCategories.length >= 5 && (
                        <p className="text-sm text-gray-500">
                            Đã chọn tối đa 5 lĩnh vực
                        </p>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        color="primary"
                        size="md"
                        className="font-medium px-6 hover:scale-105 transition-transform duration-200"
                        endContent={
                            !isLoading && (
                                <svg 
                                    className="w-4 h-4 ml-1" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" 
                                    />
                                </svg>
                            )
                        }
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Đang tạo...</span>
                            </div>
                        ) : (
                            "Tiếp theo"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}