import type { Product, ProductCategory } from "@/types";

// TODO: Replace with the gym's real photos.
const PLACEHOLDER_IMG = "/images/placeholder-gym.svg";

export const PRODUCTS: Product[] = [
  {
    id: "prod-001",
    slug: "sample-product-1",
    name: "[PLACEHOLDER — ask the gym] Sample Product 1",
    subtitle: "Product details to be added by the gym.",
    category: "Sports Nutrition",
    suite: "YFZ Core",
    description: "Product details to be added by the gym.",
    shortDescription: "Product details to be added by the gym.",
    images: [PLACEHOLDER_IMG],
    variants: [
      {
        id: "var-001a",
        flavor: "Standard",
        size: "Standard",
        servings: 0,
        price: 0,
        compareAtPrice: 0,
        sku: "YFZ-SAMPLE-01",
        stock: 0,
        batch: "",
        expiryDate: "",
        reorderPoint: 0,
      },
    ],
    nutrition: [],
    aminoAcids: [],
    ingredients: "Ingredients to be provided by the gym.",
    usage: "Usage instructions to be provided by the gym.",
    coaUrl: "",
    coaVerified: false,
    tags: ["sample"],
    dietary: [],
    hsn: "",
    fssaiLic: "",
    rating: 0,
    reviewCount: 0,
    status: "draft",
    createdAt: "2026-11-14",
  },
  {
    id: "prod-002",
    slug: "sample-product-2",
    name: "[PLACEHOLDER — ask the gym] Sample Product 2",
    subtitle: "Product details to be added by the gym.",
    category: "Fitness Essentials",
    suite: "YFZ Core",
    description: "Product details to be added by the gym.",
    shortDescription: "Product details to be added by the gym.",
    images: [PLACEHOLDER_IMG],
    variants: [
      {
        id: "var-002a",
        flavor: "Standard",
        size: "Standard",
        servings: 0,
        price: 0,
        compareAtPrice: 0,
        sku: "YFZ-SAMPLE-02",
        stock: 0,
        batch: "",
        expiryDate: "",
        reorderPoint: 0,
      },
    ],
    nutrition: [],
    aminoAcids: [],
    ingredients: "Ingredients to be provided by the gym.",
    usage: "Usage instructions to be provided by the gym.",
    coaUrl: "",
    coaVerified: false,
    tags: ["sample"],
    dietary: [],
    hsn: "",
    fssaiLic: "",
    rating: 0,
    reviewCount: 0,
    status: "draft",
    createdAt: "2026-11-14",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category && p.status === "active");
}

export function getActiveProducts(): Product[] {
  return PRODUCTS.filter((p) => p.status === "active");
}

export type { ProductCategory };
