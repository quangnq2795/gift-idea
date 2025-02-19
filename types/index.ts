import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

export interface ProductImages {
  images: ProductImage[];
}