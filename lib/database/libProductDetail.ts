import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Interface matching the Product schema
interface ProductDetailProps {
  product: {
    id?: string;
    name: string;
    description: string;
    price: number;
    images: { id?: string; url: string; alt: string }[];
    video?: string;
  };
}

/**
 * Save a product to the database.
 * @param product The product data to save.
 */
export async function saveProduct(product: ProductDetailProps["product"]) {
  try {
    const savedProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        video: product.video,
        images: {
          create: product.images.map((img) => ({
            url: img.url,
            alt: img.alt,
          })),
        },
      },
      include: {
        images: true,
      },
    });
    return savedProduct;
  } catch (error) {
    console.error("Error saving product:", error);
    throw error;
  }
}

/**
 * Load a product by ID from the database.
 * @param id The ID of the product to load.
 */
export async function loadProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images.map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt,
      })),
      video: product.video || undefined,
    };
  } catch (error) {
    console.error("Error loading product:", error);
    throw error;
  }
}
