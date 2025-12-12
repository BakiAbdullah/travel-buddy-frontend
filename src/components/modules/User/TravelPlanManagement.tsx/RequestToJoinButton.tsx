"use client";

import { createTravelRequest } from "@/services/travelRequests/travelRequestActions";
import { useState } from "react";
import { toast } from "sonner";

export default function RequestToJoinButton({ planId }: { planId: string }) {
  const [requested, setRequested] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const result = await createTravelRequest(planId);

    console.log(result, "from button")

    setLoading(false);

    if (result.success) {
      setRequested(true); // update UI state
    } else {
      toast(result.message);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={requested || loading}
      className={`px-4 py-2 rounded-lg text-white font-medium transition
        ${
          requested
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }
      `}
    >
      {requested ? "Requested" : loading ? "Sending..." : "Request To Join"}
    </button>
  );
}