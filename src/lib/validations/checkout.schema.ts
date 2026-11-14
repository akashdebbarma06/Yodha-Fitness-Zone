import { z } from "zod";

export const checkoutSchema = z.object({
  addressId: z.string().uuid(),
  // Product prices and payable totals must be fetched/calculated server-side.
});
