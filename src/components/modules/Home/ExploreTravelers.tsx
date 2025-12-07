"use client";

import { getInitials } from "@/lib/formatters";
import { IUserInfo } from "@/types/user.interface";
import {
  Award,
  Calendar,
  Compass,
  Eye,
  Globe,
  Heart,
  MapPin,
  MessageCircle,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface AllUserInfoProps {
  allUsers: IUserInfo[];
}

const ExploreTravelers = ({ allUsers }: AllUserInfoProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const travelers = Array.isArray(allUsers) ? allUsers : [];

  const allInterests = Array.from(
    new Set(travelers.flatMap((t) => t.travelInterests ?? []))
  );

  const filteredTravelers = travelers
    .filter((traveler) => {
      const name = traveler.name?.toLowerCase() ?? "";
      const interests = traveler.travelInterests ?? [];

      const matchesSearch =
        name.includes(searchQuery.toLowerCase()) ||
        interests.some((i) =>
          i.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesInterest =
        selectedInterest === "all" || interests.includes(selectedInterest);

      return matchesSearch && matchesInterest;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortBy === "countries")
        return (
          (b.visitedCountries?.length ?? 0) - (a.visitedCountries?.length ?? 0)
        );
      return 0;
    });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50/30 to-purple-50/50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-purple-950/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-6">
            <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Discover Your Next Adventure Partner
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-slate-800 dark:text-white">Explore</span>{" "}
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Travel Buddies
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Connect with fellow travelers who share your interests and passion
            for exploration
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or interests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="countries">Most Traveled</option>
                </select>
              </div>
            </div>

            {/* Interest Filter Pills */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedInterest("all")}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  selectedInterest === "all"
                    ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                All ({travelers.length})
              </button>
              {allInterests.map((interest, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedInterest(interest!)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                    selectedInterest === interest
                      ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {interest ?? "no interests"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-900 dark:text-white">
              {filteredTravelers.length}
            </span>{" "}
            travelers found
          </p>
        </div>

        {/* Travelers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTravelers.map((traveler, index) => (
            <div
              key={traveler.id}
              className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:scale-[1.02]"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Card Header with Profile Image */}
              <div className="relative h-48 overflow-hidden bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

                {/* Status Badge */}
                {traveler.status === "ACTIVE" && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Active
                  </div>
                )}

                {/* Profile Picture */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                  {traveler.profileImage ? (
                    <Image
                      height={200}
                      width={200}
                      src={traveler.profileImage}
                      alt={traveler.name}
                      className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 shadow-2xl object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 shadow-2xl bg-linear-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                      {getInitials(traveler.name)}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="pt-20 px-6 pb-6">
                {/* Name and Rating */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {traveler.name}
                  </h3>

                  {/* Rating */}
                  {traveler.rating > 0 ? (
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-bold text-slate-900 dark:text-white">
                          {traveler.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        ({traveler.reviewsReceived!.length} reviews)
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-bold text-slate-900 dark:text-white">
                          {/* {traveler.rating.toFixed(1)}
                           */}
                          0.0
                        </span>
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {/* ({traveler.reviewsReceived!.length} reviews)
                         */}
                        (no reviews)
                      </span>
                    </div>
                  )}

                  {/* Travel Interests */}
                  {traveler.travelInterests!.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {traveler
                        .travelInterests!.slice(0, 3)
                        .map((interest, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded-full border border-purple-200 dark:border-purple-800"
                          >
                            {interest}
                          </span>
                        ))}
                      {traveler.travelInterests!.length > 3 && (
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full">
                          +{traveler.travelInterests!.length - 3}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded-full border border-purple-200 dark:border-purple-800">
                        No interests Yet
                      </span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl">
                    <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {traveler.visitedCountries!.length}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Countries
                    </p>
                  </div>

                  <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl">
                    <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mx-auto mb-1" />
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {traveler.travelPlans!.length}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Plans
                    </p>
                  </div>

                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-xl">
                    <Award className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {traveler.reviewsGiven.length}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Reviews
                    </p>
                  </div>
                </div>

                {/* Upcoming Trip (if any) */}
                {traveler.travelPlans!.length > 0 ? (
                  <div className="mb-4 p-4 bg-linear-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-950/20 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          Next Trip
                        </p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {traveler.travelPlans![0].destination!}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {new Date(
                            traveler.travelPlans![0].startDateTime!
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 p-4 bg-linear-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-950/20 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                          Next Trip
                        </p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          No upcoming trips yet!
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          Plan next adventure soon!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    <span>Connect</span>
                  </button>
                  <Link href={`/profile/${traveler.id}`} className="w-full">
                    <button className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 cursor-pointer">
                      <Eye className="w-4 h-4" />
                      <span>See Details</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTravelers.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              No Travelers Found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Try adjusting your search or filters to find more travel buddies
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ExploreTravelers;
