/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, MapPin, Calendar, Users, Award, Heart } from "lucide-react";
import Image from "next/image";
import { getAllUsers } from "@/services/user/getAllUsers";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TopRatedTraveler {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  averageRating: number;
  totalReviews: number;
  completedTrips: number;
  location?: string;
  bio?: string;
  specialties?: string[];
  joinedDate: string;
  isVerified: boolean;
}

const TopRatedTravelers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const [travelers, setTravelers] = useState<TopRatedTraveler[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback data for when API is not available or returns empty
  const fallbackTravelers: TopRatedTraveler[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      averageRating: 4.9,
      totalReviews: 47,
      completedTrips: 23,
      location: "New York, USA",
      bio: "Adventure seeker and cultural enthusiast. Love exploring hidden gems and meeting locals!",
      specialties: ["Adventure", "Cultural", "Photography"],
      joinedDate: "2023-01-15",
      isVerified: true
    },
    {
      id: "2", 
      name: "Marco Silva",
      email: "marco@example.com",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      averageRating: 4.8,
      totalReviews: 32,
      completedTrips: 18,
      location: "São Paulo, Brazil",
      bio: "Backpacker and nature lover. Always ready for the next mountain to climb!",
      specialties: ["Hiking", "Nature", "Budget Travel"],
      joinedDate: "2023-03-22",
      isVerified: true
    },
    {
      id: "3",
      name: "Emma Chen",
      email: "emma@example.com", 
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      averageRating: 4.9,
      totalReviews: 38,
      completedTrips: 21,
      location: "Singapore",
      bio: "Food enthusiast and city explorer. Let's discover the best local cuisines together!",
      specialties: ["Food Tours", "City Exploration", "Luxury Travel"],
      joinedDate: "2022-11-08",
      isVerified: true
    },
    {
      id: "4",
      name: "Alex Thompson", 
      email: "alex@example.com",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      averageRating: 4.7,
      totalReviews: 29,
      completedTrips: 15,
      location: "London, UK",
      bio: "History buff and museum lover. Perfect companion for cultural and educational trips!",
      specialties: ["History", "Museums", "Architecture"],
      joinedDate: "2023-05-10",
      isVerified: true
    },
    {
      id: "5",
      name: "Yuki Tanaka",
      email: "yuki@example.com",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", 
      averageRating: 4.8,
      totalReviews: 41,
      completedTrips: 19,
      location: "Tokyo, Japan",
      bio: "Tech-savvy traveler who loves both modern cities and traditional experiences.",
      specialties: ["Technology", "Traditional Culture", "Solo Travel"],
      joinedDate: "2022-12-03",
      isVerified: true
    },
    {
      id: "6",
      name: "David Rodriguez",
      email: "david@example.com",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      averageRating: 4.6,
      totalReviews: 25,
      completedTrips: 12,
      location: "Barcelona, Spain", 
      bio: "Beach lover and water sports enthusiast. Always up for coastal adventures!",
      specialties: ["Beach", "Water Sports", "Coastal Travel"],
      joinedDate: "2023-07-18",
      isVerified: true
    }
  ];

  useEffect(() => {
    const fetchTopRatedTravelers = async () => {
      try {
        setLoading(true);
        // Fetch users sorted by rating (you may need to adjust the query string based on your API)
        const response = await getAllUsers("sortBy=averageRating&order=desc&limit=6");
        console.log(response,'res from top buddy')
        
        if (response.success && response.data && response.data.length > 0) {
          // Transform API data to match our interface
          const transformedData = response.data.map((user: any) => ({
            id: user._id || user.id,
            name: user.name || `${user.firstName} ${user.lastName}`.trim(),
            email: user.email,
            profileImage: user.profileImage || user.avatar,
            averageRating: user.averageRating || user.rating || 4.5,
            totalReviews: user.totalReviews || user.reviewCount || 0,
            completedTrips: user.completedTrips || user.tripCount || 0,
            location: user.location || user.city,
            bio: user.bio || user.description,
            specialties: user.specialties || user.interests || [],
            joinedDate: user.createdAt || user.joinedDate,
            isVerified: user.isVerified || false
          }));
          setTravelers(transformedData);
        } else {
          // Use fallback data if API doesn't return data
          setTravelers(fallbackTravelers);
        }
      } catch (error) {
        console.error("Error fetching top rated travelers:", error);
        // Use fallback data on error
        setTravelers(fallbackTravelers);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedTravelers();
  }, []);

  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30
      });

      gsap.set(".traveler-card", {
        opacity: 0,
        y: 50,
        scale: 0.95
      });

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate title and description
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      // Animate traveler cards with stagger
      .to(".traveler-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15
      }, "-=0.2");

      // Add hover animations for cards
      const cards = document.querySelectorAll('.traveler-card');
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { 
            scale: 1.05, 
            y: -10,
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { 
            scale: 1, 
            y: 0,
            duration: 0.3, 
            ease: "power2.out" 
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? "fill-yellow-400 text-yellow-400" 
            : i < rating 
            ? "fill-yellow-200 text-yellow-200" 
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm text-blue-600 font-medium mb-8">
              <Award className="w-4 h-4 mr-2" />
              TOP RATED TRAVELERS
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Meet Our Travel<br />
              Community Stars
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-lg animate-pulse">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div ref={titleRef}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm text-blue-600 font-medium mb-8">
              <Award className="w-4 h-4 mr-2" />
              TOP RATED TRAVELERS
            </div>
            
            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Meet Our Travel<br />
              Community Stars
            </h2>
          </div>
          
          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            Discover our most trusted and highly-rated travel companions who have created 
            unforgettable experiences and built lasting friendships around the world.
          </p>
        </div>

        {/* Travelers Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {travelers.map((traveler, index) => (
            <div
              key={traveler.id}
              className="traveler-card group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="relative p-8">
                {/* Profile Section */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                      <Image
                        src={traveler.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(traveler.name)}&background=3b82f6&color=fff`}
                        alt={traveler.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {traveler.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {traveler.name}
                  </h3>
                  
                  {traveler.location && (
                    <div className="flex items-center justify-center gap-1 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{traveler.location}</span>
                    </div>
                  )}
                </div>

                {/* Rating Section */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {renderStars(traveler.averageRating)}
                    <span className="ml-2 text-lg font-bold text-gray-900">
                      {traveler.averageRating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {traveler.totalReviews} reviews • {traveler.completedTrips} trips completed
                  </p>
                </div>

                {/* Bio */}
                {traveler.bio && (
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {traveler.bio}
                  </p>
                )}

                {/* Specialties */}
                {traveler.specialties && traveler.specialties.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {traveler.specialties.slice(0, 3).map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-lg font-bold text-gray-900">{traveler.totalReviews}</span>
                    </div>
                    <p className="text-xs text-gray-600">Reviews</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-lg font-bold text-gray-900">{traveler.completedTrips}</span>
                    </div>
                    <p className="text-xs text-gray-600">Trips</p>
                  </div>
                </div>

                {/* Connect Button */}
                <div className="mt-6">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <Heart className="w-4 h-4 inline mr-2" />
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to Join Our Top Rated Community?
            </h3>
            <p className="text-gray-600 mb-6">
              Start your journey, build great relationships, and earn your place among our travel stars!
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Traveling
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRatedTravelers;