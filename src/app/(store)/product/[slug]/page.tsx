import { getProductBySlug, PRODUCTS } from "@/lib/data/products";
import { ProductDetailView } from "./ProductDetailView";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug) || PRODUCTS[0];

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
