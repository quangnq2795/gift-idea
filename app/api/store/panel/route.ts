import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const getPanelImages = (storeId: string) => {
    console.log("Fetching images for store:", storeId);
    return [
        { id: 1, url: "https://media.istockphoto.com/id/1392898327/vi/anh/c%E1%BA%A3nh-quan-th%C3%A0nh-ph%E1%BB%91-hi%E1%BB%87n-%C4%91%E1%BA%A1i-v%C3%A0-kh%C3%A1i-ni%E1%BB%87m-m%E1%BA%A1ng-l%C6%B0%E1%BB%9Bi-truy%E1%BB%81n-th%C3%B4ng.jpg?s=2048x2048&w=is&k=20&c=VeESnjc2wVjc2ykyizANElv8GrYQedpVL5KaWVtGKpI=" },
        { id: 2, url: "https://media.istockphoto.com/id/2160884499/vector/abstract-subtle-swirl-organic-concept-design-background.jpg?s=2048x2048&w=is&k=20&c=Zlp2cu3XVqVxbcW3k4eCNP79W0kEfyrfv7JMbFuwaRk=" },
        { id: 3, url: "https://media.istockphoto.com/id/1854521028/photo/modern-bakery-cafe.jpg?s=2048x2048&w=is&k=20&c=sOETY59d-1OSZ3H0t3fPuE_1KuDs4eU9ioeQXUFeRoo=" },
    ];
};

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const storeId = searchParams.get("storeId");

    if (!storeId) {
        return NextResponse.json({ error: "Missing storeId" }, { status: 400 });
    }

    const images = getPanelImages(storeId);
    console.log("Fetched images:", images);
    return NextResponse.json(images);
}
