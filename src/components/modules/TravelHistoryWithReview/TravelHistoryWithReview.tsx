"use client";

import { createReviewAction } from "@/services/reviews/review";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type UserMini = {
  id: string;
  name?: string;
  email?: string;
  profileImage?: string;
};
type TravelRequest = {
  requester: UserMini;
  status?: string;
  requesterId: string;
};
type TravelPlan = {
  id: string;
  title?: string;
  destination?: string;
  startDateTime?: string;
  endDateTime?: string;
  isCompleted?: boolean;
  travelRequests?: TravelRequest[];
  user: { id: string; name?: string }; // plan owner
};

type Props = { plans: TravelPlan[]; currentUserId: string };

export default function TravelHistoryWithReview({
  plans = [],
  currentUserId,
}: Props) {
  const [openPlan, setOpenPlan] = useState<TravelPlan | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openBuddies = (plan: TravelPlan) => {
    setOpenPlan(plan);
    setRating(5);
    setComment("");
  };
  const closeModal = () => setOpenPlan(null);

  // Get only accepted buddies
  const getBuddiesForPlan = (plan: TravelPlan) =>
    (plan.travelRequests ?? [])
      .filter((r) => (r.status ?? "").toUpperCase() === "ACCEPTED")
      .map((r) => r.requester);

  const submitReview = async (planId: string, buddyId: string) => {
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.set("travelPlanId", planId);
      fd.set("targetUserId", buddyId);
      fd.set("rating", String(rating));
      fd.set("comment", comment);

      const res = await createReviewAction(fd);

      if (res.success) {
        toast("Review posted successfully!");
        closeModal();
      } else {
        toast(res.message || "Failed to post review");
      }
    } catch (err) {
      console.error(err);
      toast("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans
          .filter((p) => p.isCompleted)
          .map((plan) => {
            const buddies = getBuddiesForPlan(plan);
            const isOwner = currentUserId === plan.user.id;

            return (
              <article
                key={plan.id}
                className="border rounded-md p-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold">
                    {plan.title ?? plan.destination}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">
                    {plan.startDateTime
                      ? new Date(plan.startDateTime).toLocaleDateString()
                      : "Start N/A"}{" "}
                    -{" "}
                    {plan.endDateTime
                      ? new Date(plan.endDateTime).toLocaleDateString()
                      : "End N/A"}
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    Participants: {buddies.length}
                  </div>
                  <div className="mt-2 text-sm font-medium text-green-600">
                    Completed
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => (window.location.href = `/plans/${plan.id}`)}
                    className="px-3 py-1 border rounded hover:bg-gray-50"
                  >
                    View
                  </button>

                  {buddies.length > 0 && (
                    <button
                      onClick={() => openBuddies(plan)}
                      disabled={!isOwner}
                      className={`px-3 py-1 rounded ${
                        isOwner
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      Review Buddies
                    </button>
                  )}
                </div>
              </article>
            );
          })}
      </div>

      {openPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                Review Buddies — {openPlan.title ?? openPlan.destination}
              </h3>
              <button onClick={closeModal} className="text-gray-600">
                ✕
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-auto">
              {getBuddiesForPlan(openPlan).map((b) => (
                <div
                  key={b.id}
                  className="border rounded p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {b.profileImage ? (
                      <Image
                        height={100}
                        width={100}
                        src={b.profileImage}
                        alt={b.name!}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        {b.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <div>
                      <div className="font-medium">
                        {b.name ?? b.email ?? "Unnamed"}
                      </div>
                      <div className="text-sm text-gray-500">{b.email}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => submitReview(openPlan.id, b.id)}
                    disabled={
                      !currentUserId ||
                      currentUserId !== openPlan.user.id ||
                      submitting
                    }
                    className={`px-3 py-1 rounded ${
                      currentUserId === openPlan.user.id
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Write Review
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={closeModal} className="px-3 py-1 border rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
