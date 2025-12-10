"use client";

import { Column } from "@/components/shared/DashboardComponents/ManagementTable";
import { ITravelPlan } from "@/types/user.interface";
import { formatDate } from "@/utils/formatDate";
import { getTravelTypeColor } from "@/utils/getTravelTypeColors";
import {
  Calendar,
  DollarSign,
  Globe,
  Lock,
  MapPin,
  UserCircle,
  Users,
} from "lucide-react";

export const UserTravelPlansColumns: Column<ITravelPlan>[] = [
  {
    header: "User Name",
    accessor: (plan) => (
      <div className="flex flex-col">
        <span className="font-semibold">{plan.user?.name}</span>
        <span className="text-xs text-gray-500">{plan.user?.email}</span>
      </div>
    ),
  },

  {
    header: "Is Verified",
    accessor: (plan) => (
      <span className="inline-flex items-center border-purple-200 gap-1 px-3 py-1 rounded-full border bg-white text-gray-700">
        {plan.user.isVerified ? (
          <>
            <UserCircle className="w-3 h-3 text-green-500" /> Verified
          </>
        ) : (
          <>
            <UserCircle className="w-3 h-3 text-red-600" /> Not Verified
          </>
        )}
      </span>
    ),
  },

  {
    header: "Travel Destination",
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
      <span className="inline-flex items-center border-purple-200 gap-1 px-3 py-1 rounded-full border bg-white text-gray-700">
        {plan.visibility === "PRIVATE" ? (
          <>
            <Lock className="w-3 h-3 text-red-700" /> Private
          </>
        ) : (
          <>
            <Globe className="w-3 h-3 text-blue-700 " /> Public
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
];
