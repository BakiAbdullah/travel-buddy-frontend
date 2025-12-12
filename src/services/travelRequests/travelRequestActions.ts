/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export async function createTravelRequest(planId: string, note?: string) {
  try {
    const response = await serverFetch.post(
      `/travel-request/${planId}/requests`,
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: note || "" }),
      }
    );

    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to send request",
    };
  }
}

export async function getMyTravelRequest() {
  try {
    const response = await serverFetch.get(`/travel-request/users/requests`);

    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to send request",
    };
  }
}

export const changeRequestStatus = async (id: string, payload: string) => {
  try {
    const response = await serverFetch.patch(`/travel-request/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: "Failed to update travel plan",
    };
  }
};
