import { Image } from "@heroui/image";
import Link from "next/link";

export interface ScrollBarItemProps {
    imgSrc: string;
    productId: string;
}

export const ScrollBarItem = ({ imgSrc, productId }: ScrollBarItemProps) => {
    return (
        <div className = "max-h-[400]">
            <Link href={`/product/${productId}`}>
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
