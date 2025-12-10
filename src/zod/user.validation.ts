import z from "zod";

export const updateUserZodSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").optional(),
  bio: z.string().min(10, "Name must be at least 10 characters long").optional(),

  email: z.string().email("Invalid email address").optional(),

  contactNumber: z
    .string()
    .min(11, "Contact number must be at least 11 digits")
    .max(15, "Contact number cannot exceed 15 digits")
    .optional(),

  travelInterests: z.array(z.string()).optional(),

  visitedCountries: z.array(z.string()).optional(),

  status: z.enum(["ACTIVE", "BLOCKED"]).optional(),

  role: z.enum(["USER", "ADMIN"]).optional(),

  needPasswordChange: z.boolean().optional(),
});
