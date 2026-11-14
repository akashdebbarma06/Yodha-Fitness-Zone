import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2).max(160),
  slug: z.string().trim().min(2).max(180),
  description: z.string().max(10000).optional(),
  price: z.number().nonnegative(),
  isPublished: z.boolean().default(false),
});
export type ProductInput = z.infer<typeof productSchema>;
