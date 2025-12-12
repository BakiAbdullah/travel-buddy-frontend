/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column } from "@/components/shared/DashboardComponents/ManagementTable";

import { ITravelPlan } from "@/types/user.interface";
import { formatDate } from "@/utils/formatDate";
import { getTravelTypeColor } from "@/utils/getTravelTypeColors";
import { Calendar, DollarSign, Globe, Lock, MapPin, Users } from "lucide-react";

export const travelPlansColumns: Column<ITravelPlan>[] = [
  {
    header: "Destination",
    accessor: (plan) => (
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-indigo-600" />
        <span className="font-medium text-gray-900">{plan.destination}</span>
      </div>
    ),
    sortKey: "destination",
  },
  {
    header: "Travel Dates",
    accessor: (plan) => (
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-gray-400" />
        <div>
          <div>{formatDate(plan.startDateTime)}</div>
          <div className="text-gray-500 text-xs">
            to {formatDate(plan.endDateTime)}
          </div>
        </div>
      </div>
    ),
    sortKey: "destination",
  },

  {
    header: "Travel Type",
    accessor: (plan) => (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${getTravelTypeColor(
          plan.travelType
        )}`}
      >
        <Users className="w-3 h-3" />
        {plan.travelType}
      </span>
    ),
  },
  {
    header: "Visibility",
    accessor: (plan) => (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border bg-white text-gray-700">
        {plan.visibility === "PRIVATE" ? (
          <>
            <Lock className="w-3 h-3" /> Private
          </>
        ) : (
          <>
            <Globe className="w-3 h-3" /> Public
          </>
        )}
      </span>
    ),
  },
  {
    header: "Budget",
    accessor: (plan) => (
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-green-600" />
        <span className="font-medium">{plan.budgetRange}</span>
      </div>
    ),
  },
  {
    header: "Itinerary",
    accessor: (itinerary) => (
      <div className="flex flex-col">
        <span className="text-sm max-w-xs truncate">{itinerary.itinerary}</span>
      </div>
    ),
  },
  {
  header: "Trip Status",
  accessor: (trip) => {
    const now = new Date();
    const end = new Date(trip.endDateTime);

    const isCompleted = end < now; // 👈 End date passed = completed

    return (
      <div className="flex flex-col">
        <span className={`text-sm border rounded-full px-2  ${isCompleted ? "text-green-600 border-green-300" : "text-yellow-600 border-amber-300"}`}>
          {isCompleted ? "Completed" : "On Going"}
        </span>
      </div>
    );
  },
},
  {
    header: "Travel Requests",
    accessor: (plan) => (
      <div className="flex flex-col gap-1">
        {Array.isArray(plan.travelRequests) &&
        plan.travelRequests.length > 0 ? (
          // show up to 3 requests + a count badge
          <>
            <div className="flex flex-col gap-1 max-w-xs">
              {plan.travelRequests.slice(0, 3).map((r: any) => (
                <div
                  key={r.id}
                  className="flex flex-col items-center justify-between gap-1"
                >
                  <div className="flex items-center gap-2">
                    {/* <div className="text-sm font-medium">
                      {r.requester?.name ??
                        r.requesterName ??
                        r.requesterId ??
                        "Unknown"}
                    </div> */}
                    <div className="text-xs text-gray-500">
                      {/* optional show date */}
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleDateString()
                        : null}
                    </div>
                  </div>

                  <div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        r.status === "PENDING"
                          ? "bg-yellow-200 border border-yellow-400 text-yellow-800"
                          : r.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : r.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {plan.travelRequests.length > 3 && (
              <div className="text-xs text-gray-500 mt-1">
                +{plan.travelRequests.length - 3} more
              </div>
            )}
          </>
        ) : (
          <span className="text-sm text-gray-500">No requests</span>
        )}
      </div>
    ),
  },
];
