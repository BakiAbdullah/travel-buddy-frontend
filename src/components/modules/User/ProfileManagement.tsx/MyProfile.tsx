/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.services";
import { IUserInfo } from "@/types/user.interface";
import {
  Award,
  Calendar,
  Camera,
  CarFront,
  Compass,
  EyeIcon,
  Globe,
  Heart,
  Loader2,
  Locate,
  Mail,
  MapPin,
  Mountain,
  Phone,
  Plane,
  Save,
  Shield,
  Star,
  UserPen,
  Users
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface MyProfileProps {
  userInfo: IUserInfo;
}


const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const getProfilePhoto = () => {
    if (userInfo.role === "ADMIN") {
      return userInfo.profileImage;
    } else if (userInfo.role === "USER") {
      return userInfo.profileImage;
    }
    return null;
  };

  const getProfileData = () => {
    if (userInfo.role === "ADMIN") {
      return userInfo;
    } else if (userInfo.role === "USER") {
      return userInfo;
    }
    return null;
  };

  const profilePhoto = getProfilePhoto();
  const profileData = getProfileData();
  console.log({profileData})

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateMyProfile(formData);

      if (result.success) {
        setSuccess(result.message);
        setPreviewImage(null);
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50/30 to-purple-50/50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-purple-950/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
              Manage your travel profile and preferences
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-full shadow-lg">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 capitalize">
              {userInfo.status}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column - Profile Card & Stats */}
            <div className="lg:col-span-4 space-y-6">
              {/* Profile Picture Card */}
              <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                <div className="relative h-32 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                </div>
                <CardContent className="flex flex-col items-center -mt-20 relative z-10 pb-8">
                  <div className="relative mb-4">
                    <Avatar className="h-40 w-40 ring-4 ring-white dark:ring-slate-900 shadow-2xl">
                      {previewImage || profilePhoto ? (
                        <AvatarImage
                          src={previewImage || (profilePhoto as string)}
                          alt={userInfo.name}
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="text-4xl bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                          {getInitials(userInfo.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <label
                      htmlFor="file"
                      className="absolute bottom-2 right-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-full p-3 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <Camera className="h-5 w-5" />
                      <Input
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={isPending}
                      />
                    </label>
                  </div>

                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                      {userInfo.name}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                      {userInfo.email}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full">
                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 capitalize">
                        {userInfo.role.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  {/* Rating Display */}
                  <div className="w-full p-4 bg-linear-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-2xl border border-yellow-200/50 dark:border-yellow-800/50">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">
                        {userInfo?.rating?.toFixed(1) || 0.0}
                      </span>
                    </div>
                    <p className="text-xs text-center text-slate-600 dark:text-slate-400">
                      Travel Buddy Rating
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Travel Stats Card */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <Award className="w-5 h-5 text-blue-600" />
                    Travel Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Countries Visited
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">
                      {userInfo.visitedCountries?.length || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-600 rounded-lg">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Travel Plans
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">
                      {userInfo.travelPlans?.length || 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-600 rounded-lg">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Reviews Given
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">
                      {userInfo.reviewsGiven?.length || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Profile Information & Travel Details */}
            <div className="lg:col-span-8 space-y-6">
              {/* Alerts */}
              {error && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-2xl text-sm flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-6 py-4 rounded-2xl text-sm flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {success}
                </div>
              )}

              {/* Personal Information Card */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <Users className="w-5 h-5 text-indigo-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-slate-700 dark:text-slate-300 font-semibold"
                      >
                        Full Name
                      </Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="name"
                          name="name"
                          defaultValue={profileData?.name || userInfo.name}
                          required
                          disabled={isPending}
                          className="pl-10 h-12 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-slate-700 dark:text-slate-300 font-semibold"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          disabled
                          className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="contactNumber"
                        className="text-slate-700 dark:text-slate-300 font-semibold"
                      >
                        Contact Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="contactNumber"
                          name="contactNumber"
                          defaultValue={profileData?.contactNumber || ""}
                          required
                          disabled={isPending}
                          className="pl-10 h-12 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Current Location */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="currentLocation"
                        className="text-slate-700 dark:text-slate-300 font-semibold"
                      >
                        Current Location
                      </Label>
                      <div className="relative">
                        <Locate className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="currentLocation"
                          name="currentLocation"
                          defaultValue={profileData?.currentLocation || ""}
                          required
                          disabled={isPending}
                          className="pl-10 h-12 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </div>
                    {/* Bio */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="bio"
                        className="text-slate-700 dark:text-slate-300 font-semibold"
                      >
                        Bio / About
                      </Label>
                      <div className="relative">
                        <UserPen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="bio"
                          name="bio"
                          defaultValue={profileData?.bio || ""}
                          required
                          disabled={isPending}
                          className="pl-10 h-12 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </div>
                    {/* Travel Interest */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="travelInterests"
                        className="text-slate-700 dark:text-slate-300 font-semibold"
                      >
                        Travel Interest
                      </Label>
                      <div className="relative">
                        <CarFront className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="travelInterests"
                          name="travelInterests"
                          defaultValue={
                            profileData?.travelInterests?.join(", ") || ""
                          }
                          required
                          disabled={isPending}
                          className="pl-10 h-12 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </div>
                    {/* Visited Countries */}
                    <div className="space-y-2">
                      <Label
                        htmlFor="visitedCountries"
                        className="text-slate-700 dark:text-slate-300 font-semibold"
                      >
                        Visited Countries
                      </Label>
                      <div className="relative">
                        <EyeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          id="visitedCountries"
                          name="visitedCountries"
                          defaultValue={
                            profileData?.visitedCountries?.join(", ") || ""
                          }
                          required
                          disabled={isPending}
                          className="pl-10 h-12 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-slate-200 dark:border-slate-800">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-5 w-5" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Travel Interests Card */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <Compass className="w-5 h-5 text-purple-600" />
                    Travel Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userInfo.travelInterests &&
                  userInfo.travelInterests.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {userInfo.travelInterests.map(
                        (interest: string, idx: number) => (
                          <div
                            key={idx}
                            className="px-4 py-2 bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-xl text-sm font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-2"
                          >
                            <Mountain className="w-4 h-4" />
                            {interest}
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                      No travel interests added yet.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Visited Countries Card */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Visited Countries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userInfo.visitedCountries &&
                  userInfo.visitedCountries.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {userInfo.visitedCountries.map(
                        (country: string, idx: number) => (
                          <div
                            key={idx}
                            className="px-4 py-2 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2"
                          >
                            <MapPin className="w-4 h-4" />
                            {country}
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                      No countries visited yet. Start your adventure!
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Travel Plans Card */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <Plane className="w-5 h-5 text-indigo-600" />
                    Upcoming Travel Plans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userInfo.travelPlans && userInfo.travelPlans.length > 0 ? (
                    <div className="space-y-4">
                      {userInfo.travelPlans.map((plan: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-6 bg-linear-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-950/20 border border-slate-200 dark:border-slate-700 rounded-2xl hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                              {plan.itinerary || "Travel Plan"}
                            </h4>
                            <div className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-full">
                              Upcoming
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(plan.startDateTime).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Plane className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                      <p className="text-slate-500 dark:text-slate-400 font-medium">
                        No travel plans yet.
                      </p>
                      <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
                        Start planning your next adventure!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
