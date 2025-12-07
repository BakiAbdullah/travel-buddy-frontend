"use client";

import {
  Users,
  ShieldCheck,
  MapPin,
  Handshake,
  Sparkles,
  Compass,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Verified Travel Buddies",
      description:
        "Every traveler goes through identity & background verification to ensure a safe experience.",
      icon: ShieldCheck,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Find Perfect Matching Buddies",
      description:
        "Our smart algorithm matches you with travelers who share similar interests, budget, and travel style.",
      icon: Users,
      color: "from-purple-500 to-pink-500",
    },

    {
      title: "Smart Destination Suggestions",
      description:
        "AI-powered recommendations based on season, budget, popularity, and your preferences.",
      icon: Sparkles,
      color: "from-orange-500 to-yellow-500",
    },
    {
      title: "Plan Together, Travel Together",
      description:
        "Coordinate trips, share expenses, track progress — all in one place with real-time collaboration.",
      icon: Handshake,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Safe Journey Tracking",
      description:
        "Share live trip updates with your family or friends for full peace of mind.",
      icon: MapPin,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Explore With Confidence",
      description:
        "Discover hidden gems, local guides, and curated travel plans for unforgettable experiences.",
      icon: Compass,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="w-full py-20 px-6 md:px-16 bg-linear-to-b from-background to-muted/30">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Why Choose <span className="text-foreground">Travel Buddy?</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We make travel safer, smarter, and more enjoyable — with features
          built for modern explorers looking to connect with people and discover
          new adventures.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16 max-w-7xl mx-auto">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="p-6 backdrop-blur-xl cursor-pointer rounded-2xl bg-card border shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div
                className={`flex items-center justify-center bg-linear-to-r ${item.color} h-12 w-12 rounded-full text-white mb-4 mx-auto`}
              >
                {Icon && <Icon size={24} />}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 text-center">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
