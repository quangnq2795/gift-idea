import { Image } from "@heroui/image";
import Link from "next/link";

export interface ScrollBarItemProps {
    imgSrc: string;
    productId: string;
    title: string;
}

export const ScrollBarItem = ({ imgSrc, productId, title }: ScrollBarItemProps) => {
    return (
        <Link href={`/product/${productId}`}>
            <div className="relative group">
                <Image
                    width={200}
                    isZoomed
                    src={imgSrc}
                    alt={`Product ${productId}`}
                    className="max-h-[400px] object-cover"
                />
                <div className="z-10 absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-md text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl flex items-center justify-center">
                    <p className="text-center text-white text-[10px] sm:text-xs font-medium line-clamp-2 leading-snug">
                        {title}
                    </p>
                </div>
            </div>
        </Link>
    );
};
