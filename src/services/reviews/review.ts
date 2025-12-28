/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { serverFetch } from "@/lib/serverFetch";



/**
 * Server action - create review
 * Use directly as <form action={createReviewAction}> in client component
 */
export const createReviewAction = async (payload: {
  travelPlanId: string;
  targetUserId: string;
  rating: number;
  comment: string;
}) => {

  try {
    const res = await serverFetch.post("/reviews", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("createReviewAction error", err);
    return { success: false, message: "Failed to create review" };
  }
};


export async function getTestimonialsFromDB() {
  try {
    const response = await serverFetch.get(
      `/reviews/testimonials`
    );
    const result = await response.json();
    
    // Return consistent structure
    if (result && result.data) {
      return {
        success: true,
        data: result.data
      };
    } else {
      return {
        success: false,
        data: [],
        message: "No testimonials data found"
      };
    }
  } catch (error: any) {
    console.error("getTestimonialsFromDB error:", error);
    return {
      success: false,
      data: [],
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}




