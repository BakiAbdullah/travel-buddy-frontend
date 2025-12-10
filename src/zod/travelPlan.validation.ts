import z from "zod";

export const createTravelPlanZodSchema = z.object({
  destination: z
    .string()
    .min(3, "Destination must be at least 3 characters long"),
  startDateTime: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  endDateTime: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  budgetRange: z
    .string()
    .min(3, "Budget range must be at least 3 characters long"),
  travelType: z.enum(["SOLO", "FRIENDS", "FAMILY", "COUPLE"]),
  itinerary: z
    .string()
    .min(10, "Itinerary must be at least 10 characters long"),
  visibility: z.enum(["PUBLIC", "PRIVATE"]).optional(),
});

export const updateTravelPlanZodSchema = z.object({
  destination: z.string().min(3).optional(),
  startDateTime: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .optional(),
  endDateTime: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .optional(),
  budgetRange: z.string().min(3).optional(),
  travelType: z.enum(["SOLO", "FRIENDS", "FAMILY"]).optional(),
  itinerary: z.string().min(10).optional(),
  visibility: z.enum(["PUBLIC", "PRIVATE"]).optional(),
});
