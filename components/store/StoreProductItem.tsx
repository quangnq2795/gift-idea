import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner
} from "@heroui/react";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation"; // Import useRouter
import { ProductDetail } from "../product/basic_temp/ProductDetail";
import { EditIcon, CloseIcon, AddIcon } from '@/components/icons';

export interface StoreProductItemProps {
  imgSrc: string;
  productId: string;
  storeId: string;
}

export const StoreProductAddItem = ({ storeId }: { storeId: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/mystore/${storeId}/createproduct`);
  };

  return (
    <div 
      onClick={handleClick}
      className="w-full aspect-[2/3] border-2 border-dashed border-gray-300 rounded-lg 
        hover:border-blue-400 hover:bg-blue-50
        transition-colors duration-200
        cursor-pointer flex flex-col items-center justify-center gap-2"
    >
      <AddIcon className="w-12 h-12 text-gray-400 hover:text-blue-400 transition-colors duration-200" />
      <span className="text-sm text-gray-500 hover:text-blue-500 transition-colors duration-200">Add Product</span>
    </div>
  );
};

export const StoreProductItem = ({ imgSrc, productId, storeId }: StoreProductItemProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/product?id=${productId}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error("Failed to load product", error);
    }
    setLoading(false);
  };

  const handleOpen = async () => {
    onOpen();
    await fetchProductDetail();
  };

  const handleEdit = () => {
    router.push(`/store/${storeId}/edit/${productId}`);
  };

  return (
    <>
      {/* Click on image to open modal */}
      <div className="w-full aspect-square">
        <Image
          width={0}
          height={0}
          isZoomed
          sizes="100vw"
          src={imgSrc}
          alt={`Product ${productId}`}
          className="w-full h-full cursor-pointer object-cover rounded-lg"
          onClick={handleOpen}
        />
      </div>
      {/* Modal displaying product details */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size="3xl" scrollBehavior="outside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <Spinner size="lg" />
                  </div>
                ) : product ? (
                  <ProductDetail product={product} />
                ) : (
                  <p className="text-center p-4">Không thể tải sản phẩm.</p>
                )}
              </ModalBody>
              <ModalFooter className="p-2">
                <Button 
                  color="primary" 
                  variant="solid" 
                  onPress={handleEdit}
                  startContent={<EditIcon className="w-4 h-4" />}
                >
                  Edit
                </Button>
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={onClose}
                  startContent={<CloseIcon className="w-4 h-4" />}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
