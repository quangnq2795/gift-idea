import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

type StorePanelProps = {
    storeId: string;
};

export const StorePanel: React.FC<StorePanelProps> = ({ storeId }) => {
    const [images, setImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!storeId) return;

        fetch(`/api/store/panel?storeId=${storeId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched images:", data);
                if (Array.isArray(data) && data.every((img) => typeof img.url === "string")) {
                    setImages(data.map((img) => img.url));
                } else {
                    console.error("Invalid data format:", data);
                    setImages([]);
                }
            })
            .catch((error) => console.error("Error fetching images:", error));
    }, [storeId]);

    useEffect(() => {
        if (images.length <= 1) return;

        intervalRef.current = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(true);
            }, 500);
        }, 5000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [images]);

    return (
        <div className="w-full h-[400px] relative overflow-hidden rounded-lg shadow-lg">
            {images.length > 0 ? (
                <div className="w-full h-full relative">
                    <Image
                        src={images[currentImageIndex]}
                        alt="Store Panel"
                        fill
                        className={`w-full h-full object-cover transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`}
                    />
                </div>
            ) : (
                <p className="text-sm text-gray-700">Loading ads...</p>
            )}
        </div>
    );
};
