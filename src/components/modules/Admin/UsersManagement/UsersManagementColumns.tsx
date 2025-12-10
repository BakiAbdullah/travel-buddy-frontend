"use client";

import { Column } from "@/components/shared/DashboardComponents/ManagementTable";

import { IUserInfo } from "@/types/user.interface";
import {
  ClipboardCheck,
  ListStart,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

export const UsersManagementColumns: Column<IUserInfo>[] = [
  {
    header: "Name",
    accessor: (user) => (
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-indigo-600" />
        <span className="font-medium text-gray-900">{user.name}</span>
      </div>
    ),
    sortKey: "name",
  },
  {
    header: "Email",
    accessor: (user) => (
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-red-600" />
        <span className="font-medium text-gray-900">{user.email}</span>
      </div>
    ),
    sortKey: "email",
  },
  {
    header: "Rating",
    accessor: (user) => (
      <div className="flex items-center gap-2">
        <Star className="w-4 h-4 text-amber-600" />
        <span className="font-medium text-gray-900">{user.rating}</span>
      </div>
    ),
    sortKey: "rating",
  },
  {
    header: "Status",
    accessor: (user) => (
      <div className="flex items-center justify-center gap-2 bg-green-500 rounded-full w-16">
        <span className="font-medium text-white">{user.status}</span>
      </div>
    ),
    sortKey: "status",
  },
  {
    header: "Is Verified",
    accessor: (user) => (
      <div className="flex  items-center justify-center gap-2 bg-cyan-500 rounded-full w-24">
        <span className="font-medium text-white">
          {user.isVerified ? "Verified" : "Not Verified"}
        </span>
      </div>
    ),
    sortKey: "status",
  },
  {
    header: "Contact Number",
    accessor: (user) => (
      <div className="flex items-center  gap-2">
        <Phone className="w-4 h-4 text-blue-600" />
        <span className="font-medium text-gray-900">{user.contactNumber}</span>
      </div>
    ),
    sortKey: "contactNumber",
  },
  {
    header: "Travel Plans",
    accessor: (plans) => (
      <div className="flex items-center gap-2">
        <ClipboardCheck className="w-4 h-4 text-slate-600" />
        <span className="font-medium text-gray-900">
          {plans.travelPlans?.length || 0}
        </span>
      </div>
    ),
    sortKey: "contactNumber",
  },
  {
    header: "Reviews Given",
    accessor: (review) => (
      <div className="flex items-center gap-2">
        <ListStart className="w-4 h-4 text-amber-600" />
        <span className="font-medium text-gray-900">
          {review.reviewsGiven?.length || 0}
        </span>
      </div>
    ),
    sortKey: "contactNumber",
  },
];
