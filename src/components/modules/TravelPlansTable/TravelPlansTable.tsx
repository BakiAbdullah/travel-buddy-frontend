"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Lock,
  Globe,
  Plus,
} from "lucide-react";
import { ITravelPlan } from "@/types/user.interface";

interface MyTravelPlansProps {
  allTravelPlans: any; // can be ITravelPlan[] or { data: ITravelPlan[] }
}

export default function TravelPlansTable({
  allTravelPlans,
}: MyTravelPlansProps) {
  // ✅ Local UI state for deletes
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const travelPlans = useMemo<ITravelPlan[]>(() => {
    if (!allTravelPlans) return [];

    // ✅ If real array
    if (Array.isArray(allTravelPlans)) {
      return allTravelPlans;
    }

    // ✅ If object like { 0: {...}, 1: {...} }
    if (typeof allTravelPlans === "object") {
      return Object.values(allTravelPlans) as ITravelPlan[];
    }

    return [];
  }, [allTravelPlans]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Filter visible plans
  const visiblePlans = useMemo(() => {
    return travelPlans.filter((plan) => !deletedIds.includes(plan.id));
  }, [travelPlans, deletedIds]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTravelTypeColor = (
    type: "FRIENDS" | "SOLO" | "FAMILY" | "COUPLE"
  ) => {
    const colors: Record<string, string> = {
      FRIENDS: "bg-blue-100 text-blue-700 border-blue-200",
      SOLO: "bg-purple-100 text-purple-700 border-purple-200",
      FAMILY: "bg-green-100 text-green-700 border-green-200",
      COUPLE: "bg-pink-100 text-pink-700 border-pink-200",
    };
    return colors[type] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const handleView = (plan: ITravelPlan) => {
    alert(`Viewing: ${plan.destination}`);
    setActiveDropdown(null);
  };

  const handleEdit = (plan: ITravelPlan) => {
    alert(`Editing: ${plan.destination}`);
    setActiveDropdown(null);
  };

  const handleDelete = (planId: string) => {
    if (confirm("Are you sure you want to delete this travel plan?")) {
      setDeletedIds((prev) => [...prev, planId]);
    }
    setActiveDropdown(null);
  };

  const toggleDropdown = (planId: string) => {
    setActiveDropdown((prev) => (prev === planId ? null : planId));
  };

  const publicPlansCount = visiblePlans.filter(
    (p) => p.visibility === "PUBLIC"
  ).length;

  const privatePlansCount = visiblePlans.filter(
    (p) => p.visibility === "PRIVATE"
  ).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Travel Plans
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and organize your upcoming adventures
              </p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
              <Plus className="w-4 h-4" />
              Create New Plan
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
              {visiblePlans.length} Total Plans
            </span>
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
              {publicPlansCount} Public
            </span>
            <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
              {privatePlansCount} Private
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Destination
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Travel Dates
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Budget
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Visibility
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Itinerary
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {visiblePlans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span className="font-medium text-gray-900">
                        {plan.destination}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <div>{formatDate(plan.startDateTime)}</div>
                        <div className="text-gray-500 text-xs">
                          to {formatDate(plan.endDateTime)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{plan.budgetRange}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${getTravelTypeColor(
                        plan.travelType
                      )}`}
                    >
                      <Users className="w-3 h-3" />
                      {plan.travelType}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm">
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
                  </td>

                  <td className="px-6 py-4 text-sm max-w-xs truncate">
                    {plan.itinerary}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div ref={dropdownRef} className="relative inline-block">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(plan.id);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-600" />
                      </button>

                      {activeDropdown === plan.id && (
                        <>
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleView(plan);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(plan);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(plan.id);
                              }}
                              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {visiblePlans.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center mt-6">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Travel Plans Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start planning your next adventure!
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium mx-auto">
              <Plus className="w-4 h-4" />
              Create Your First Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
