"use client"

import { createReviewAction } from "@/services/reviews/review";
import { IUserInfo } from "@/types/user.interface";
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
  isCompleted?: boolean;
  travelRequests?: TravelRequest[];
  user?: IUserInfo;
};

type Props = { plans: TravelPlan[]; currentUserId?: string };

export default function TravelHistoryWithReview({
  plans = [],
  currentUserId,
}: Props) {
  const [openPlan, setOpenPlan] = useState<TravelPlan | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  console.log(currentUserId, 'Current User')

  const openBuddies = (plan: TravelPlan) => setOpenPlan(plan);
  const closeModal = () => setOpenPlan(null);

  const getBuddies = (plan: TravelPlan) =>
    (plan.travelRequests ?? [])
      .filter((r) => (r.status ?? "").toUpperCase() === "ACCEPTED")
      .map((r) => r.requester);

  const submitReview = async (planId: string, buddyId: string) => {
    console.log({planId}, {buddyId})
    setSubmitting(true);
    try {
        const res = await createReviewAction({
        travelPlanId: planId,
        targetUserId: buddyId,
        rating,
        comment,
      });

      if (res.success) {
        toast("Review posted successfully!");
        closeModal();
      } else {
        toast.error(res.message || "Failed to post review");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
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
            const buddies = getBuddies(plan);

            const isOwner = currentUserId === plan.user!.id;

            return (
              <div
                key={plan.id}
                className="border rounded p-4 shadow flex flex-col justify-between"
              >
                <h3 className="text-lg font-semibold">
                  {plan.title ?? plan.destination}
                </h3>
                <div className="text-sm text-gray-500 mt-1">
                  Participants: {buddies.length}
                </div>
                <div className="mt-2 text-sm text-green-600">Completed</div>
                <div className="mt-4 flex gap-2">
                  {buddies.length > 0 ? (
                    <button
                      className={`px-3 py-1 rounded ${
                        isOwner
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                      onClick={() => isOwner && openBuddies(plan)}
                    >
                      Review Buddies
                    </button>
                  ) : (
                    <button
                      className="px-3 py-1 bg-gray-200 text-gray-600 rounded"
                      disabled
                    >
                      No Buddies
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* Modal */}
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
              {/* Rating */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} ⭐
                    </option>
                  ))}
                </select>
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your experience..."
                  className="w-full border rounded px-3 py-2 min-h-[100px]"
                />
              </div>
              {/* Buddies */}
              {getBuddies(openPlan).map((b) => (
                <div
                  key={b.id}
                  className="border rounded p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {b.profileImage ? (
                      <Image
                        height={40}
                        width={40}
                        src={b.profileImage}
                        alt={b.name!}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        {b.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <div>{b.name ?? b.email}</div>
                  </div>
                  <button
                    className={`px-3 py-1 rounded ${
                      currentUserId === openPlan.user!.id
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                    onClick={() =>
                      currentUserId === openPlan.user!.id &&
                      submitReview(openPlan.id, b.id)
                    }
                    disabled={submitting || currentUserId !== openPlan.user!.id}
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
