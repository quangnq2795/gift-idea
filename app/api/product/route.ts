import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // Example if you're using Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id as string, 10) },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
