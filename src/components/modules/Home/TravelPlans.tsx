/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { formatDate } from "@/utils/formatDate";
import { calculateDuration, getTravelTypeColor } from "@/utils/getTravelTypeColors";
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  Filter,
  Lock,
  MapPin,
  Search,
  User
} from "lucide-react";
import { useState } from "react";

export default function TravelPlans({ allTravelPlans }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const travelPlans = allTravelPlans

  const travelTypes = ["FAMILY", "SOLO", "FRIENDS"];

  const filteredPlans = travelPlans.filter((plan:any) => {
    const matchesSearch =
      plan.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.itinerary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "ALL" || plan.travelType === filterType;
    const matchesStatus =
      filterStatus === "ALL" ||
      (filterStatus === "COMPLETED" && plan.isCompleted) ||
      (filterStatus === "UPCOMING" && !plan.isCompleted);
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Travel Plans</h1>
          <p className="text-xl text-blue-50">
            Discover and join exciting travel adventures
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Travel Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                {travelTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="ALL">All Status</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-blue-600">
              {filteredPlans.length}
            </span>{" "}
            travel plans
          </p>
        </div>

        {/* Travel Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan: any) => (
            <div
              key={plan.id}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Card Header */}
              <div className="relative bg-linear-to-br from-indigo-600 to-purple-600 h-32 p-4 flex items-end">
                <div className="absolute top-4 right-4 flex gap-2">
                  {plan.visibility === "PUBLIC" ? (
                    <span className="bg-white bg-opacity-90 text-blue-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      Public
                    </span>
                  ) : (
                    <span className="bg-white bg-opacity-90 text-gray-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Private
                    </span>
                  )}
                  {plan.isCompleted && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {plan.destination}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* Travel Type Badge */}
                <div className="mb-4">
                  <span
                    className={`${getTravelTypeColor(
                      plan.travelType
                    )} px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {plan.travelType}
                  </span>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">
                    {formatDate(plan.startDateTime)} -{" "}
                    {formatDate(plan.endDateTime)}
                  </span>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">
                    {calculateDuration(plan.startDateTime, plan.endDateTime)}
                  </span>
                </div>

                {/* Budget */}
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">
                    ${plan.budgetRange.replace("-", " - $")}
                  </span>
                </div>

                {/* Itinerary */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {plan.itinerary}
                </p>

                {/* User Info */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-orange-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {plan.user.name}
                        </p>
                      </div>
                    </div>
                    <button className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results / Empty state */}
        {filteredPlans.length === 0 && (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              No travel plans found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
