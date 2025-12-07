"use client"

import { Star } from "lucide-react";
import Image from "next/image";

const TopRatedTravelers = () => {

  // const [currentStory, setCurrentStory] = useState(0);
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
    {
      id: 2,
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
    {
      id: 3,
      name: "David & Ryan",
      trip: "Surfing Safari in Australia",
      location: "Gold Coast, Australia",
      duration: "2 weeks",
      image:
        "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
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

  return (
    <>
      {/* All Stories Grid */}
      <div className="py-20 container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 text-center">
          Top Rated Travelers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials
            // .filter((_, idx) => idx !== currentStory)
            // .slice(0, 2)
            .map((testimonial, index) => (
              <div
                key={testimonial.id}
                // onClick={() =>
                //   setCurrentStory(testimonials.indexOf(testimonial))
                // }
                className="group cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    width={600}
                    height={400}
                    src={testimonial.image}
                    alt={testimonial.trip}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Avatars */}
                  <div className="absolute bottom-4 left-4 flex -space-x-3">
                    <Image
                      width={300}
                      height={300}
                      src={testimonial.avatar1}
                      alt="Traveler 1"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                    <Image
                      width={300}
                      height={300}
                      src={testimonial.avatar2}
                      alt="Traveler 2"
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  </div>

                  {/* Tag */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-full">
                      {testimonial.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {testimonial.trip}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {testimonial.story}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default TopRatedTravelers