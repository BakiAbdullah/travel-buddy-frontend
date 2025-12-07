/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Star,
  Globe,
  Compass,
} from "lucide-react";
import Image from "next/image";
import { IUserInfo } from "@/types/user.interface";

interface MyProfileProps {
  userData: IUserInfo;
}

export default function UserProfile({userData}:MyProfileProps) {


  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: any) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
              <Image
                height={150}
                width={150}
                src={userData.profileImage!}
                alt={userData?.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="mt-3 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                <h1 className="text-4xl font-bold text-gray-900">
                  {userData?.name}
                </h1>
                <p className="text-gray-600 mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <MapPin className="w-4 h-4" />
                  {userData?.currentLocation}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {userData.status}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {userData.role}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg italic border-l-4 border-indigo-500 pl-4 py-2 bg-indigo-50 rounded">
              {userData.bio}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contact Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900 font-medium">{userData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900 font-medium">
                  {userData.contactNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Globe className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-900">
              {userData.visitedCountries!.length}
            </p>
            <p className="text-gray-600">Countries Visited</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Compass className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-900">
              {userData?.travelInterests!.length}
            </p>
            <p className="text-gray-600">Travel Interests</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3 fill-yellow-400" />
            <p className="text-3xl font-bold text-gray-900">
              {userData?.rating.toFixed(1)}
            </p>
            <p className="text-gray-600">Average Rating</p>
            <p className="text-sm text-gray-500 mt-1">
              ({userData?.reviewsReceived?.length} reviews)
            </p>
          </div>
        </div>

        {/* Travel Interests */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Travel Interests
          </h2>
          <div className="flex flex-wrap gap-3">
            {userData?.travelInterests!.map((interest, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium shadow-md"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Visited Countries */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Visited Countries
          </h2>
          <div className="flex flex-wrap gap-3">
            {userData?.visitedCountries!.map((country, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium border-2 border-green-200"
              >
                {country}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-bold text-gray-900">
                {userData.rating.toFixed(1)}
              </span>
              <span className="text-gray-500">
                ({userData?.reviewsReceived?.length} reviews)
              </span>
            </div>
          </div>

          {userData?.reviewsReceived?.length > 0 ? (
            <div className="space-y-6">
              {userData?.reviewsReceived?.slice(0, 2).map((review: any) => (
                <div
                  key={review.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                >
                  <div className="flex items-start gap-4">
                    <Image
                      height={150}
                      width={150}
                      src={review?.reviewer?.profileImage || ''}
                      alt={review?.reviewer?.name || ''}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {review?.reviewer?.name}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {review?.reviewer?.location}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(review?.date)}
                        </span>
                      </div>
                      <div className="mb-3">{renderStars(review?.rating)}</div>
                      <p className="text-gray-700 leading-relaxed">
                        {review?.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No reviews yet</p>
            </div>
          )}

          {userData?.reviewsReceived?.length > 2 && (
            <button className="w-full mt-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-medium">
              View All {userData?.reviewsReceived?.length} Reviews
            </button>
          )}
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Account Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Member Since</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <p className="text-gray-900 font-medium">
                  {formatDate(userData.createdAt)}
                </p>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Last Updated</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <p className="text-gray-900 font-medium">
                  {formatDate(userData.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
