/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ArrowUpRight,
  Calendar,
  MapPin,
  MoreHorizontal,
  Star,
  TrendingUp,
  Users
} from "lucide-react";

interface AdminDashboardContentProps {
  users: any[];
  travelPlans: any[];
  reviews: any[];
}

const AdminDashboardContent = ({ users, travelPlans, reviews }: AdminDashboardContentProps) => {
  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => !user.isDeleted).length;
  const totalTravelPlans = travelPlans.length;
  const activeTravelPlans = travelPlans.filter(plan => plan.status === 'ACTIVE').length;
  const totalReviews = reviews.length;
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  // Recent activities
  const recentUsers = users.slice(0, 4);
  const recentTravelPlans = travelPlans.slice(0, 4);
  const recentReviews = reviews.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Minimalist Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-2xl font-light text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1 font-light">Travel Buddy Analytics</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-500 font-medium">Live</span>
          </div>
        </div>

        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="group">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-light text-gray-900">{totalUsers.toLocaleString()}</p>
                <p className="text-xs text-gray-500 font-medium">Total Users</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">{activeUsers} active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-light text-gray-900">{totalTravelPlans.toLocaleString()}</p>
                <p className="text-xs text-gray-500 font-medium">Travel Plans</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">{activeTravelPlans} active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  <Star className="h-6 w-6 text-amber-600" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-light text-gray-900">{totalReviews.toLocaleString()}</p>
                <p className="text-xs text-gray-500 font-medium">Reviews</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Star className="w-3 h-3 text-amber-500 fill-current" />
                  <span className="text-xs text-gray-600">{averageRating} average</span>
                </div>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                  <TrendingUp className="h-6 w-6 text-violet-600" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-violet-600 transition-colors" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-light text-green-600">98.5%</p>
                <p className="text-xs text-gray-500 font-medium">Uptime</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Users */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-light text-gray-900">Recent Users</h3>
                  <button className="p-1 hover:bg-gray-50 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentUsers.map((user: any, index: number) => (
                    <div key={user.id || index} className="flex items-center space-x-3 group">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-medium">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        {!user.isDeleted && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.name || 'Unknown User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email || 'No email'}
                        </p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${user.isDeleted ? 'bg-gray-300' : 'bg-green-500'}`}></div>
                    </div>
                  ))}
                  {recentUsers.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No users found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Travel Plans */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-light text-gray-900">Recent Travel Plans</h3>
                  <button className="p-1 hover:bg-gray-50 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentTravelPlans.map((plan: any, index: number) => (
                    <div key={plan.id || index} className="group">
                      <div className="flex items-start justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 mb-1">
                              {plan.destination || 'Unknown Destination'}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {plan.startDate ? new Date(plan.startDate).toLocaleDateString() : 'No date'}
                              </span>
                              <span>${plan.budget || 'Not specified'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${plan.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-xs text-gray-500 font-medium">{plan.status || 'Unknown'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {recentTravelPlans.length === 0 && (
                    <div className="text-center py-8">
                      <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No travel plans found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-light text-gray-900">Recent Reviews</h3>
              <button className="p-1 hover:bg-gray-50 rounded-lg transition-colors">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentReviews.map((review: any, index: number) => (
                <div key={review.id || index} className="group">
                  <div className="p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-medium">
                          {review.reviewer?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {review.reviewer?.name || 'Anonymous'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-amber-400 fill-current" />
                        <span className="text-xs font-medium text-gray-600">{review.rating || 0}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-3">
                      {review.comment || review.review || 'No comment provided'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'No date'}
                    </p>
                  </div>
                </div>
              ))}
              {recentReviews.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Star className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No reviews found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;