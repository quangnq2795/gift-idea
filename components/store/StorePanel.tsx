import Image from 'next/image';

export const StorePanel = ({ storeId }: { storeId: string }) => {
    return (
        <div className="w-full relative h-[300px]">
            <Image
                src="https://i.pinimg.com/736x/f7/36/d3/f736d3c3f6c16b6dc790d77cc7ca0b0d.jpg"
                alt="Store Panel"
                layout="fill" // Lấp đầy phần tử cha
                objectFit="cover" // Giữ nguyên chiều rộng, cắt ảnh nếu cần
                className="w-full h-full"
            />
        </div>
    );
};
