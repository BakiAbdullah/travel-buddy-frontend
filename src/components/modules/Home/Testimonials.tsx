"use client";
import { useState } from "react";
import {
  Heart,
  MapPin,
  Calendar,
  Star,
  Quote,
  Users,
  Camera,
  Plane,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah & Emma",
      trip: "Backpacking Through Southeast Asia",
      location: "Thailand, Vietnam, Cambodia",
      duration: "3 weeks",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
      avatar1:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      avatar2:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
      rating: 5,
      story:
        "We were both solo travelers looking for someone to share the adventure with. Meeting through Travel Buddy was the best decision! Emma's sense of humor made every moment memorable, and we've stayed friends ever since.",
      highlight: "Made a lifelong friend",
      tag: "Adventure",
      year: "2024",
    },
    // {
    //   id: 2,
    //   name: "Marcus & Yuki",
    //   trip: "Photography Expedition in Iceland",
    //   location: "Reykjavik, Iceland",
    //   duration: "2 weeks",
    //   image:
    //     "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
    //   avatar1:
    //     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    //   avatar2:
    //     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    //   rating: 5,
    //   story:
    //     "As a photographer, I wanted someone who shared my passion. Yuki was perfect! We spent hours chasing the Northern Lights and captured breathtaking moments together. The app's matching algorithm really understood what I was looking for.",
    //   highlight: "Perfect creative partnership",
    //   tag: "Photography",
    //   year: "2023",
    // },
    {
      id: 3,
      name: "Priya & Lisa",
      trip: "Yoga Retreat in Bali",
      location: "Ubud, Bali",
      duration: "10 days",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      avatar1:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&q=80",
      avatar2:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80",
      rating: 5,
      story:
        "I was nervous about traveling alone for a wellness retreat. Finding Lisa through Travel Buddy changed everything! We shared the same wellness goals and supported each other throughout the journey. It was transformative!",
      highlight: "Found inner peace together",
      tag: "Wellness",
      year: "2024",
    },
    {
      id: 4,
      name: "Alex & Jordan",
      trip: "Hiking the Inca Trail",
      location: "Cusco, Peru",
      duration: "5 days",
      image:
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
      avatar1:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
      avatar2:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
      rating: 5,
      story:
        "The Inca Trail was on my bucket list for years, but I didn't want to do it alone. Jordan had the same fitness level and determination. We pushed each other to the summit and celebrated together at Machu Picchu!",
      highlight: "Conquered mountains together",
      tag: "Adventure",
      year: "2023",
    },
    // {
    //   id: 5,
    //   name: "Sofia & Mia",
    //   trip: "European Food Tour",
    //   location: "Italy, France, Spain",
    //   duration: "4 weeks",
    //   image:
    //     "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
    //   avatar1:
    //     "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80",
    //   avatar2:
    //     "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    //   rating: 5,
    //   story:
    //     "Both foodies at heart, we wanted to explore authentic European cuisine. Travel Buddy connected us perfectly! From pasta making in Rome to wine tasting in Bordeaux, every meal was an adventure. We're planning our next trip!",
    //   highlight: "Culinary adventures shared",
    //   tag: "Food & Culture",
    //   year: "2024",
    // },
    {
      id: 6,
      name: "David & Ryan",
      trip: "Surfing Safari in Australia",
      location: "Gold Coast, Australia",
      duration: "2 weeks",
      image:
        "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&q=80",
      avatar1:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&q=80",
      avatar2:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
      rating: 5,
      story:
        "Wanted to improve my surfing skills but needed a buddy with similar experience. Ryan was the perfect match! We pushed each other in the waves and had an absolute blast. The app's detailed profiles made finding the right companion easy.",
      highlight: "Caught the perfect wave",
      tag: "Sports",
      year: "2023",
    },
  ];

  const stats = [
    {
      number: "50K+",
      label: "Success Stories",
      icon: <Heart className="w-6 h-6" />,
    },
    {
      number: "150+",
      label: "Countries",
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      number: "98%",
      label: "Satisfaction Rate",
      icon: <Star className="w-6 h-6" />,
    },
    { number: "24/7", label: "Support", icon: <Users className="w-6 h-6" /> },
  ];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % testimonials.length);
  };

  const prevStory = () => {
    setCurrentStory(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const featured = testimonials[currentStory];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-6">
            <Heart className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Real Stories, Real Connections
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-slate-800 dark:text-white">
              Success Stories from
            </span>
            <br />
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Travelers Like You
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover how Travel Buddy helped thousands of adventurers find their
            perfect companions and create unforgettable memories around the
            world.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="p-3 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-800 dark:text-white mb-1">
                  {stat.number}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Story */}
        <div className="mb-20">
          <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-[650px]">
                <Image
                  width={600}
                  height={400}
                  src={featured.image}
                  alt={featured.trip}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Tag Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-slate-900 text-sm font-bold rounded-full shadow-lg">
                    {featured.tag}
                  </span>
                </div>

                {/* Year Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
                    {featured.year}
                  </span>
                </div>

                {/* Avatars */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="flex -space-x-4">
                    <Image
                      width={300}
                      height={300}
                      src={featured.avatar1}
                      alt="Traveler 1"
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                    />
                    <Image
                      width={300}
                      height={300}
                      src={featured.avatar2}
                      alt="Traveler 2"
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                    />
                  </div>
                  <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                    <p className="text-sm font-bold text-slate-900">
                      {featured.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <Quote className="w-12 h-12 text-blue-500/30 mb-4" />
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                    {featured.trip}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(featured.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {featured.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {featured.duration}
                      </span>
                    </div>
                  </div>

                  {/* Story */}
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {featured.story}
                  </p>

                  {/* Highlight */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {featured.highlight}
                    </span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex gap-3">
                    <button
                      onClick={prevStory}
                      className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </button>
                    <button
                      onClick={nextStory}
                      className="p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </button>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {currentStory + 1} / {testimonials.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      

        {/* CTA Section */}
        <div className="text-center bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 shadow-2xl">
          <Camera className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your Own Story?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who found their perfect companions and
            explored the world together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl hover:bg-slate-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
              <span>Find Your Travel Buddy</span>
              <Plane className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold rounded-2xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
              <Play className="w-5 h-5" />
              <span>Watch Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
