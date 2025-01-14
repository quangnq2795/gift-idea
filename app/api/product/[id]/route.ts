import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Product Data
    const product = {
      id: 1,
      storeName: "Store A",
      productName: "Product A",
      description: `🧧 TẾT TẶNG TRÀ - MÓN QUÀ SỨC KHỎE VÔ GIÁ
      Xu hướng quà tặng sức khỏe ngày càng phát triển. Hơn nữa, Trà là loại đồ uống rất có lợi cho sức khỏe, hỗ trợ phòng và chống nhiều loại bệnh. Vì thế , Trà rất phù hợp để làm quà biếu dành cho người thân, ông bà, cha mẹ.
      Trong tiết trời se se lạnh của ngày Tết thật thích hợp để thưởng thức một ấm trà nóng. Tận hưởng hương vị ngọt thơm chan chát hòa quyện, hương sen thanh mát quấn trong khoang miệng, lan tỏa khắp không gian. Một ấm trà thơm ngon sẽ gắn kết mọi người gần nhau hơn, ấm áp hơn. Làm cho những câu chuyện tâm sự càng thêm ý nghĩa.
      Chọn Trà sen Hương Việt làm quà biếu gia đình nội ngoại, quà tặng bạn bè hay đối tác kinh doanh của bạn. Hương vị tinh tế của trà sen sẽ là món quà thể hiện sự tôn trọng và chân thành của bạn dành cho người nhận.
      Trà sen Hương Việt xin gửi tới Quý khách hàng SET Phú Quý Tài Lộc với quy cách đóng hộp:
      ✔️ Hộp 10 bông trà sen sấy khô 
      ✔️ Hộp 5 bông trà sen sấy khô
      ✔️ Túi hộp 5 bông trà sen sấy khô 
      Nếu bạn phân vân vì chưa chọn được món quà nào ý nghĩa dịp tết này thì hãy chọn ngay Trà Sen Hương Việt nhé!!!
      —-------------------
      - Địa chỉ: Số D6B-08 Xuân La, phường Xuân La, quận Tây Hồ, HN
      - Hotline: 0934522122 `,
      price: 100,
      images: [
        { id: 1, url: "https://i.pinimg.com/736x/c5/ad/7e/c5ad7e615fda9d44c186a7e4896610db.jpg", alt: "Image 1" },
        { id: 2, url: "https://i.pinimg.com/736x/cc/45/76/cc4576c4c29de6eb451ad73a36f1f5f6.jpg", alt: "Image 2" },
        { id: 3, url: "https://i.pinimg.com/736x/99/08/50/9908502f2a0101a31fcb236c3b532acf.jpg", alt: "Image 3" },
      ],
      video: "https://youtu.be/ODPZl45OxgU",
    };

    // Return JSON Response
    return NextResponse.json(product);
  } catch (error) {
    console.error("An error occurred while fetching the product data:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
