"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Input, Avatar, Textarea, Chip } from "@heroui/react";
import { StoreIcon, AddIcon, EditIcon } from "@/components/icons";

interface Category {
    id: number;
    name: string;
}

export default function CreateStorePage() {
    const [storeName, setStoreName] = useState("");
    const [storeDescription, setStoreDescription] = useState("");
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    
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
            formData.append("storeDescription", storeDescription);
            formData.append("userId", userId);
            formData.append("categories", JSON.stringify(selectedCategories));

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
                    <div className="relative w-full h-48 bg-blue-800 rounded-lg overflow-hidden group">
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
                                        <span className="text-sm">Chỉnh sửa ảnh bìa</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <Button
                                    type="button"
                                    isIconOnly
                                    color="default"
                                    variant="flat"
                                    onClick={() => backgroundInputRef.current?.click()}
                                    className="bg-white/80 backdrop-blur p-3 rounded-full"
                                >
                                    <AddIcon className="w-6 h-6" />
                                </Button>
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

                {/* Store Description Section */}
                <div>
                    <Textarea
                        value={storeDescription}
                        onChange={(e) => setStoreDescription(e.target.value)}
                        placeholder="Giới thiệu về cửa hàng của bạn..."
                        minRows={8}
                        className="w-full"
                    />
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
