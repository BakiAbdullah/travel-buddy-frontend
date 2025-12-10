"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { updateUserZodSchema } from "@/zod/user.validation";

export const updateUser = async (_prevState: any, formData: FormData) => {
  const id = formData.get("id") as string;

  const validationPayload: any = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    contactNumber: formData.get("contactNumber") as string,

    // convert comma separated string → array
    travelInterests: (formData.get("travelInterests") as string)
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean),

    visitedCountries: (formData.get("visitedCountries") as string)
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  const validation = zodValidator(validationPayload, updateUserZodSchema);

  if (!validation.success && validation.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validation.errors,
    };
  }

  try {
    const response = await serverFetch.patch(`/users/update/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.data),

    
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to update travel plan",
      formData: validationPayload,
    };
  }
};