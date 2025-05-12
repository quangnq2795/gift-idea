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
import { EditIcon, CloseIcon } from '@/components/icons';

interface StoreProductItemProps {
  imgSrc: string;
  productId: string;
  storeId: string; // Add storeId prop
}

export const StoreProductItem = ({ imgSrc, productId, storeId }: StoreProductItemProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router

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
      <Image
        width={200}
        isZoomed
        src={imgSrc}
        alt={`Product ${productId}`}
        className="cursor-pointer"
        onClick={handleOpen}
      />
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
