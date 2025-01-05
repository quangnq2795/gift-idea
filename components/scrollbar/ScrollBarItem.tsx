import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import Link from "next/link";

export interface ScrollBarItemProps {
    imgSrc: string;
    productId: string;
}

export const ScrollBarItem = ({ imgSrc, productId }: ScrollBarItemProps) => {
    return (
        <div className = "max-h-[400]">
            <Link href={`/products/${productId}`}>
                <Image
                    width={200}
                    isZoomed
                    src={imgSrc}
                    alt={`Product ${productId}`}
                />
            </Link>
        </div>
    );
};
