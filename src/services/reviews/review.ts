// src/actions/reviews.server.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";
import { zodValidator } from "@/lib/zodValidator";
import {
  CreateReviewDTO,
  createReviewSchema
} from "@/zod/review.validation";


/**
 * Server action - create review
 * Use directly as <form action={createReviewAction}> in client component
 */
export const createReviewAction = async (formData: FormData) => {
  const payload: any = {
    travelPlanId: formData.get("travelPlanId") as string,
    rating: Number(formData.get("rating")),
    comment: (formData.get("comment") as string) || "",
  };

  const validation = zodValidator(payload, createReviewSchema);
  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validation.errors,
    };
  }

  try {
    const res = await serverFetch.post("/reviews", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.data as CreateReviewDTO),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error("createReviewAction error", err);
    return { success: false, message: "Failed to create review" };
  }
};

/**
 * Server action - update review
 */
// export const updateReviewAction = async (formData: FormData) => {
//   const payload: any = {
//     reviewId: formData.get("reviewId") as string,
//     rating: Number(formData.get("rating")),
//     comment: (formData.get("comment") as string) || "",
//   };

//   const validation = zodValidator(payload, updateReviewSchema);
//   if (!validation.success) {
//     return {
//       success: false,
//       message: "Validation failed",
//       errors: validation.errors,
//     };
//   }

//   try {
//     const { reviewId, ...body } = validation.data as UpdateReviewDTO;
//     const res = await serverFetch.patch(
//       `/reviews/${encodeURIComponent(reviewId)}`,
//       {
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       }
//     );
//     const json = await res.json();
//     return json;
//   } catch (err) {
//     console.error("updateReviewAction error", err);
//     return { success: false, message: "Failed to update review" };
//   }
// };


/**
 * Fetch reviews for a travel plan (server helper)
 */
// export const fetchReviews = async (travelPlanId: string) => {
//   try {
//     const res = await serverFetch.get(
//       `/reviews?planId=${encodeURIComponent(travelPlanId)}`
//     );
//     if (!res.ok) throw new Error("Failed to fetch reviews");
//     return (await res.json()) as any[]; // adjust type if you have an exact type
//   } catch (err) {
//     console.error("fetchReviews error:", err);
//     return [];
//   }
// };

/**
 * Fetch review stats (avg rating + count)
 */
// export const fetchReviewStats = async (travelPlanId: string) => {
//   try {
//     const res = await serverFetch.get(
//       `/reviews/${encodeURIComponent(travelPlanId)}/stats`
//     );
//     if (!res.ok) throw new Error("Failed to fetch review stats");
//     return (await res.json()) as {
//       avgRating: number;
//       totalReviews: number;
//     } | null;
//   } catch (err) {
//     console.error("fetchReviewStats error:", err);
//     return null;
//   }
// };


