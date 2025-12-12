import { z } from "zod";

export const createReviewSchema = z.object({
  travelPlanId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(2000).optional().or(z.literal("")),
});

export const updateReviewSchema = z.object({
  reviewId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(2000).optional().or(z.literal("")),
});

export type CreateReviewDTO = z.infer<typeof createReviewSchema>;
export type UpdateReviewDTO = z.infer<typeof updateReviewSchema>;
