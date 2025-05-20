import React, { useEffect, useState } from "react";
import { StoreIcon } from "@/components/icons";

interface StoreDescriptionProps {
  storeId: string;
}

export const StoreDescription: React.FC<StoreDescriptionProps> = ({ storeId }) => {
  const [description, setDescription] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Giả lập fetch mô tả và tên cửa hàng, có thể thay bằng API thực tế
    setLoading(true);
    setTimeout(() => {
      setStoreName(`Store #${storeId}`);
      setDescription(
        `Việt Nam và Pháp thiết lập quan hệ ngoại giao ngày 12/4/1973, trở thành Đối tác Chiến lược vào năm 2013 và Đối tác Chiến lược Toàn diện vào tháng 10/2024. Pháp là nước EU đầu tiên có quan hệ ở mức cao nhất với Việt Nam.

Pháp là đối tác thương mại châu Âu lớn thứ 5 của Việt Nam, kim ngạch thương mại năm 2024 đạt 5,42 tỷ USD, tăng 12,9% so với năm 2023. Pháp đứng thứ 16/147 quốc gia và lãnh thổ đầu tư vào Việt Nam với 700 dự án đầu tư còn hiệu lực, tổng số vốn đăng ký đạt 3,95 tỷ USD. Việt Nam có 20 dự án đầu tư tại Pháp với tổng vốn đăng ký đạt 38,93 triệu USD.

Pháp là nhà tài trợ châu Âu song phương ODA hàng đầu cho Việt Nam, đã cung cấp và cho vay ưu đãi 16,7 tỷ EUR năm 1993-2022, tập trung vào các lĩnh vực cơ sở hạ tầng, chuyển giao công nghệ, nông nghiệp, công nghiệp xanh và tài chính. Việt Nam đứng thứ hai trong số các nước hưởng ODA của Pháp. Cộng đồng người Việt tại Pháp hiện có khoảng 350.000 người.`
      );
      setLoading(false);
    }, 500);
  }, [storeId]);

  if (loading) return <div className="text-gray-400 text-sm mb-2">Loading store description...</div>;

  return (
    <div className="mb-6 p-6 rounded-xl border bg-white shadow-md hover:shadow-lg transition-all">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-200">
          <StoreIcon width={30} height={30} className="text-blue-600" />
        </div>
        <div className="font-semibold text-base text-blue-900">{storeName}</div>
      </div>
      <div className="mt-3">
        <blockquote className="whitespace-pre-wrap overflow-y-auto text-black text-sm pb-1">{description}</blockquote>
      </div>
    </div>
  );
};
