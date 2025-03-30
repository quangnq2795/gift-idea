import { ImageGrid1 } from "./ImageGrid1";
import { ImageGrid2 } from "./ImageGrid2";
import { ImageGrid3 } from "./ImageGrid3";
import { ImageGrid4 } from "./ImageGrid4";
import { ImageGridEdit } from "./ImageGridEdit";
import { ProductImages } from "@/types";
import { useViewMode } from "@/components/product/ProductViewMode";

export const ImageGrid: React.FC<ProductImages> = ({ images }) => {
  const { viewMode } = useViewMode();
  const isEditMode = viewMode === "edit";

  if (isEditMode) {
    return <ImageGridEdit images={images} />;
  }

  if (!images || images.length === 0) {
    return <div className="text-gray-500">No images available.</div>;
  }

  const maxImages = 4;
  const limitedImages = images.slice(0, maxImages);

  switch (limitedImages.length) {
    case 1:
      return <ImageGrid1 images={limitedImages} />;
    case 2:
      return <ImageGrid2 images={limitedImages} />;
    case 3:
      return <ImageGrid3 images={limitedImages} />;
    case 4:
      return <ImageGrid4 images={limitedImages} />;
    default:
      return null;
  }
};
