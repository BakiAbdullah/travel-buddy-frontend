/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import { updateTravelPlanZodSchema } from "@/zod/travelPlan.validation";

export const updateTravelPlan = async (_prevState: any, formData: FormData) => {
  const id = formData.get("id") as string;

  const validationPayload: any = {
    destination: formData.get("destination") as string,
    startDateTime: formData.get("startDateTime") as string,
    endDateTime: formData.get("endDateTime") as string,
    budgetRange: formData.get("budgetRange") as string,
    travelType: formData.get("travelType") as string,
    visibility: formData.get("visibility") as string,
    itinerary: formData.get("itinerary") as string,
  };

  const validation = zodValidator(validationPayload, updateTravelPlanZodSchema);

  if (!validation.success && validation.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validation.errors,
    };
  }

  try {
    const response = await serverFetch.patch(`/travel-plans/${id}`, {
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
