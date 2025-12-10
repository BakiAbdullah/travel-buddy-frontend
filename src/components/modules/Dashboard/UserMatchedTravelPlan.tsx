"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from "@/utils/formatDate";
import { calculateDuration, getMatchScoreColor, getTravelTypeColor } from "@/utils/getTravelTypeColors";
import {
  ArrowBigLeft,
  Calendar,
  Clock,
  DollarSign,
  Filter,
  Globe,
  Heart,
  Mail,
  MapPin,
  Phone,
  Search,
  Send,
  TrendingUp,
  Users
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function UserMatchedTravelPlan({ matchedTravelPlans }:any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const sampleData = matchedTravelPlans.data;
  

  const handleSendRequest = (plan:any) => {
    alert(
      `Sending travel request to ${plan.user.name} for ${plan.destination}!`
    );
  };

  const handleViewDetails = (plan:any) => {
    setSelectedPlan(plan);
  };

  const filteredPlans = sampleData.filter((plan:any) => {
    const matchesSearch =
      plan.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === "ALL" || plan.travelType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 mt-14 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center gap-3 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Matched Travel Plans
              </h1>
              <p className="text-gray-600 mt-1">
                Find your perfect travel companions
              </p>
            </div>

            <Link
              className=" px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-medium text-sm flex items-center justify-center gap-2"
              href={"/"}
            >
              <ArrowBigLeft className="w-4 h-4" />
              Back Home
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <p className="text-xs text-gray-600 font-medium">
                  Total Matches
                </p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {sampleData.length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-red-600" />
                <p className="text-xs text-gray-600 font-medium">High Match</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {sampleData.filter((p: any) => p.matchScore >= 90).length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-600 font-medium">
                  Active Plans
                </p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {sampleData.length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-gray-600 font-medium">
                  Destinations
                </p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(sampleData.map((p: any) => p.destination)).size}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by destination or traveler name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none bg-white cursor-pointer"
              >
                <option value="ALL">All Types</option>
                <option value="SOLO">Solo</option>
                <option value="FRIENDS">Friends</option>
                <option value="FAMILY">Family</option>
                <option value="COUPLE">Couple</option>
              </select>
            </div>
          </div>
        </div>

        {/* Travel Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPlans.map((plan: any) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Card Header */}
              <div className="bg-linear-to-r from-indigo-50 to-purple-50 p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Image
                      height={100}
                      width={100}
                      src={plan.user.profileImage}
                      alt={plan.user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {plan.user.name}
                      </h3>
                      <p className="text-xs text-gray-600">{plan.user.email}</p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getMatchScoreColor(
                      plan.matchScore
                    )}`}
                  >
                    {plan.matchScore}% Match
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    {plan.destination}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getTravelTypeColor(
                      plan.travelType
                    )}`}
                  >
                    <Users className="w-3 h-3" />
                    {plan.travelType}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-green-200 bg-green-50 text-green-700">
                    <Globe className="w-3 h-3" />
                    {plan.visibility}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Dates */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">
                      {formatDate(plan.startDateTime)} -{" "}
                      {formatDate(plan.endDateTime)}
                    </span>
                    <span className="text-gray-500 ml-2">
                      ({calculateDuration(plan.startDateTime, plan.endDateTime)}{" "}
                      days)
                    </span>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="font-medium text-gray-900">
                    ${plan.budgetRange}
                  </span>
                </div>

                {/* Itinerary */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      Itinerary
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {plan.itinerary}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Mail className="w-3 h-3" />
                    <span>{plan.user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Phone className="w-3 h-3" />
                    <span>{plan.user.contactNumber}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => handleViewDetails(plan)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium text-sm"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleSendRequest(plan)}
                  className="flex-1 px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-medium text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Request
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPlans.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No matches found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterType("ALL");
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
