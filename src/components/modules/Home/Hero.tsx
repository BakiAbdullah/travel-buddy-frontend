"use client"
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Compass,
  Plane,
  Mountain,
  Camera,
  Globe,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("destination");

  const popularDestinations = [
    {
      name: "Bali",
      country: "Indonesia",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80",
      travelers: "2.5K",
    },
    {
      name: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80",
      travelers: "3.2K",
    },
    {
      name: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80",
      travelers: "4.1K",
    },
    {
      name: "Dubai",
      country: "UAE",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
      travelers: "2.8K",
    },
  ];

  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      text: "Find Travel Buddies",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "Discover Places",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Camera className="w-5 h-5" />,
      text: "Share Moments",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      text: "Global Community",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Floating Icons Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Plane className="absolute top-1/4 left-1/4 w-8 h-8 text-blue-400/30 dark:text-blue-500/20 animate-float" />
        <Mountain
          className="absolute top-1/3 right-1/4 w-10 h-10 text-purple-400/30 dark:text-purple-500/20 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <Compass
          className="absolute bottom-1/3 left-1/3 w-6 h-6 text-indigo-400/30 dark:text-indigo-500/20 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <Camera
          className="absolute bottom-1/4 right-1/3 w-7 h-7 text-pink-400/30 dark:text-pink-500/20 animate-float"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fadeIn">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-indigo-200/50 dark:border-indigo-800/50 rounded-full mb-6 shadow-lg">
              <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Join 50K+ Travelers Worldwide
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Explore the World
              </span>
              <br />
              <span className="text-slate-800 dark:text-white">
                With Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Travel Buddy
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Connect with like-minded travelers, discover amazing destinations,
              and create unforgettable memories together. Your next adventure
              starts here.
            </p>

            {/* Search Card */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 md:p-8">
                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
                  <button
                    onClick={() => setActiveTab("destination")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === "destination"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    Find Destination
                  </button>
                  <button
                    onClick={() => setActiveTab("buddy")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === "buddy"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    Find Buddy
                  </button>
                </div>

                {/* Search Form */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Where to?"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="When?"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-2xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  <button className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`p-2 bg-gradient-to-r ${feature.color} rounded-full text-white`}
                  >
                    {feature.icon}
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Popular Destinations */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                Trending Destinations
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {popularDestinations.map((dest, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="aspect-4/5 relative">
                      <Image
                        width={300}
                        height={300}
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h4 className="text-2xl font-bold text-white mb-1">
                          {dest.name}
                        </h4>
                        <p className="text-white/80 text-sm mb-3">
                          {dest.country}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                            <Users className="w-4 h-4 text-white" />
                            <span className="text-white text-sm font-semibold">
                              {dest.travelers}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/90 to-purple-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Compass className="w-12 h-12 mx-auto mb-3 animate-spin-slow" />
                          <p className="font-bold">Explore Now</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-3">
                <span>Start Your Journey</span>
                <Plane className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-bold rounded-2xl hover:bg-indigo-50 dark:hover:bg-slate-700 transform hover:scale-105 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
