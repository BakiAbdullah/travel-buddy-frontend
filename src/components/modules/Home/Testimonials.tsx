/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getTestimonialsFromDB } from "@/services/reviews/review";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Quote,
  Star,
  Users,
  Award,
  Loader2,
  Play,
  Pause,
} from "lucide-react";
import Image from "next/image";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ReviewData {
  id: string;
  comment: string;
  rating: number;
  createdAt: string;
  reviewer: {
    id: string;
    name: string;
    profileImage: string;
    rating: number;
  };
  reviewed: {
    id: string;
    name: string;
    profileImage: string;
    rating: number;
  };
  travelPlan: {
    id: string;
    destination: string;
    destinationImages: string[];
    startDateTime: string;
    endDateTime: string;
  };
}

interface TransformedTestimonial {
  id: string;
  reviewerName: string;
  reviewedName: string;
  trip: string;
  location: string;
  duration: string;
  image: string;
  reviewerAvatar: string;
  reviewedAvatar: string;
  rating: number;
  story: string;
  highlight: string;
  tag: string;
  year: string;
  createdAt: string;
}

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  const [currentStory, setCurrentStory] = useState(0);
  const [testimonials, setTestimonials] = useState<TransformedTestimonial[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Fallback testimonials for when API is not available
  const fallbackTestimonials: TransformedTestimonial[] = useMemo(
    () => [
      {
        id: "1",
        reviewerName: "Sarah Johnson",
        reviewedName: "Emma Chen",
        trip: "Backpacking Through Southeast Asia",
        location: "Thailand, Vietnam, Cambodia",
        duration: "3 weeks",
        image:
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
        reviewerAvatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        reviewedAvatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        story:
          "We were both solo travelers looking for someone to share the adventure with. Meeting through Travel Buddy was the best decision! Emma's sense of humor made every moment memorable, and we've stayed friends ever since.",
        highlight: "Made a lifelong friend",
        tag: "Adventure",
        year: "2024",
        createdAt: "2024-01-15",
      },
      {
        id: "2",
        reviewerName: "Alex Thompson",
        reviewedName: "Jordan Smith",
        trip: "Hiking the Inca Trail",
        location: "Cusco, Peru",
        duration: "5 days",
        image:
          "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
        reviewerAvatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        reviewedAvatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        story:
          "The Inca Trail was on my bucket list for years, but I didn't want to do it alone. Jordan had the same fitness level and determination. We pushed each other to the summit and celebrated together at Machu Picchu!",
        highlight: "Conquered mountains together",
        tag: "Adventure",
        year: "2023",
        createdAt: "2023-08-22",
      },
      {
        id: "3",
        reviewerName: "Priya Patel",
        reviewedName: "Lisa Wong",
        trip: "Yoga Retreat in Bali",
        location: "Ubud, Bali",
        duration: "10 days",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        reviewerAvatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
        reviewedAvatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        story:
          "I was nervous about traveling alone for a wellness retreat. Finding Lisa through Travel Buddy changed everything! We shared the same wellness goals and supported each other throughout the journey. It was transformative!",
        highlight: "Found inner peace together",
        tag: "Wellness",
        year: "2024",
        createdAt: "2024-03-10",
      },
      {
        id: "4",
        reviewerName: "Marcus Rodriguez",
        reviewedName: "Kai Nakamura",
        trip: "European City Hopping",
        location: "Paris, Rome, Barcelona",
        duration: "2 weeks",
        image:
          "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&q=80",
        reviewerAvatar:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        reviewedAvatar:
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        story:
          "As a photography enthusiast, I wanted someone who shared my passion for capturing city life. Kai had the same eye for detail and we spent hours exploring hidden gems in each city. Our photo collection is incredible!",
        highlight: "Captured amazing memories",
        tag: "Photography",
        year: "2023",
        createdAt: "2023-09-15",
      },
      {
        id: "5",
        reviewerName: "Zara Ahmed",
        reviewedName: "Sophie Laurent",
        trip: "African Safari Adventure",
        location: "Kenya & Tanzania",
        duration: "12 days",
        image:
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
        reviewerAvatar:
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face",
        reviewedAvatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        story:
          "Going on safari was my dream, but I wanted to share it with someone equally excited about wildlife. Sophie's enthusiasm was contagious! We witnessed the Great Migration together and it was absolutely magical.",
        highlight: "Witnessed nature's wonders",
        tag: "Wildlife",
        year: "2024",
        createdAt: "2024-02-20",
      },
    ],
    []
  );

  // Transform API data to match UI requirements
  const transformReviewData = (
    reviews: ReviewData[]
  ): TransformedTestimonial[] => {
    return reviews
      .filter((review) => {
        // Validate required fields
        return (
          review &&
          review.id &&
          review.reviewer?.name &&
          review.reviewed?.name &&
          review.travelPlan?.destination &&
          review.travelPlan?.startDateTime &&
          review.travelPlan?.endDateTime &&
          review.rating &&
          review.createdAt
        );
      })
      .map((review) => {
        // Safely calculate duration with fallback
        let duration = 1;
        try {
          const startDate = new Date(review.travelPlan.startDateTime);
          const endDate = new Date(review.travelPlan.endDateTime);
          const calculatedDuration = Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
          );
          duration = calculatedDuration > 0 ? calculatedDuration : 1;
        } catch (error) {
          console.warn(
            "Error calculating duration for review:",
            review.id,
            error
          );
        }

        // Generate destination image based on location
        const getDestinationImage = (destination: string) => {
          if (!destination)
            return "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80";

          const imageMap: { [key: string]: string } = {
            nepal:
              "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
            thailand:
              "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
            peru: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
            bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
            iceland:
              "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
            australia:
              "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&q=80",
          };

          const key = destination.toLowerCase();
          return (
            imageMap[key] ||
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
          );
        };

        // Generate tag based on destination or rating
        const getTag = (destination: string, rating: number) => {
          if (rating >= 5) return "Excellent";
          if (rating >= 4) return "Great Experience";
          if (
            (destination && destination.toLowerCase().includes("mountain")) ||
            destination?.toLowerCase().includes("trek")
          )
            return "Adventure";
          if (
            (destination && destination.toLowerCase().includes("beach")) ||
            destination?.toLowerCase().includes("coast")
          )
            return "Beach";
          return "Travel";
        };

        // Generate highlight based on rating and comment
        const getHighlight = (rating: number, comment: string) => {
          if (rating >= 5) return "Perfect travel companion";
          if (rating >= 4) return "Great travel experience";
          if (comment && comment.toLowerCase().includes("friend"))
            return "Made new friends";
          if (comment && comment.toLowerCase().includes("adventure"))
            return "Amazing adventure";
          return "Memorable journey";
        };

        // Safely get year with fallback
        let year = "2024";
        try {
          year = new Date(review.createdAt).getFullYear().toString();
        } catch (error) {
          console.warn("Error parsing date for review:", review.id, error);
        }

        return {
          id: review.id,
          reviewerName: review.reviewer?.name || "Anonymous",
          reviewedName: review.reviewed?.name || "Travel Buddy",
          trip: `Adventure in ${
            review.travelPlan?.destination || "Unknown Destination"
          }`,
          location: review.travelPlan?.destination || "Unknown Location",
          duration: duration > 1 ? `${duration} days` : "1 day",
          image:
            review.travelPlan?.destinationImages?.[0] ||
            getDestinationImage(review.travelPlan?.destination || ""),
          reviewerAvatar:
            review.reviewer?.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              review.reviewer?.name || "User"
            )}&background=3b82f6&color=fff`,
          reviewedAvatar:
            review.reviewed?.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              review.reviewed?.name || "Buddy"
            )}&background=8b5cf6&color=fff`,
          rating: Math.max(1, Math.min(5, review.rating || 4)), // Ensure rating is between 1-5
          story:
            review.comment ||
            "Had an amazing travel experience together! The connection through Travel Buddy made this trip unforgettable.",
          highlight: getHighlight(review.rating || 4, review.comment || ""),
          tag: getTag(review.travelPlan?.destination || "", review.rating || 4),
          year,
          createdAt: review.createdAt,
        };
      });
  };

  // Fetch testimonials from the database
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getTestimonialsFromDB();
        console.log({ response }, "from testimonials component");

        // Handle the consistent response structure
        if (
          response &&
          response.success &&
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          // Filter reviews with rating >= 4 for testimonials
          const highRatedReviews = response.data.filter((review: any) => {
            return review && typeof review === "object" && review.rating >= 4;
          });

          if (highRatedReviews.length > 0) {
            const transformedTestimonials =
              transformReviewData(highRatedReviews);
            if (transformedTestimonials.length > 0) {
              setTestimonials(transformedTestimonials);
            } else {
              console.warn(
                "No valid testimonials after transformation, using fallback"
              );
              setTestimonials(fallbackTestimonials);
            }
          } else {
            console.warn("No high-rated reviews found, using fallback");
            setTestimonials(fallbackTestimonials);
          }
        } else {
          console.warn(
            "API response invalid or empty, using fallback testimonials"
          );
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError("Failed to load testimonials");
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [fallbackTestimonials]);

  // GSAP Animations
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(".stat-card", {
        opacity: 0,
        y: 50,
        scale: 0.9,
      });

      gsap.set(featuredRef.current, {
        opacity: 0,
        y: 50,
      });

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate title and description
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        // Animate stats
        .to(
          ".stat-card",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
          },
          "-=0.2"
        )
        // Animate featured story
        .to(
          featuredRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  // Auto-play functionality
  const startAutoPlay = () => {
    if (testimonials.length > 1 && isAutoPlaying && !isPaused) {
      autoPlayRef.current = setTimeout(() => {
        setCurrentStory((prev) => (prev + 1) % testimonials.length);
      }, 5000); // Change slide every 5 seconds
    }
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  // Auto-play effect
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [currentStory, testimonials.length, isAutoPlaying, isPaused]);

  const nextStory = () => {
    if (testimonials.length > 1) {
      stopAutoPlay();
      setCurrentStory((prev) => (prev + 1) % testimonials.length);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000); // Resume auto-play after 3 seconds
    }
  };

  const prevStory = () => {
    if (testimonials.length > 1) {
      stopAutoPlay();
      setCurrentStory(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000); // Resume auto-play after 3 seconds
    }
  };

  const goToStory = (index: number) => {
    if (testimonials.length > 1) {
      stopAutoPlay();
      setCurrentStory(index);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000); // Resume auto-play after 3 seconds
    }
  };

  // Touch/Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && testimonials.length > 1) {
      nextStory();
    }
    if (isRightSwipe && testimonials.length > 1) {
      prevStory();
    }
  };

  const featured =
    testimonials.length > 0
      ? testimonials[Math.min(currentStory, testimonials.length - 1)]
      : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-lg text-gray-600">Loading testimonials...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Testimonials Yet
            </h2>
            <p className="text-gray-600">
              Be the first to share your travel experience!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-white py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div ref={titleRef}>
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 font-medium mb-8">
              <span className="text-sm font-semibold text-slate-700">
                Real Stories, Real Connections
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 max-w-2xl mx-auto">
              Success Stories from Travelers Like You
            </h2>
          </div>

          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            Discover how Travel Buddy helped thousands of adventurers find their
            perfect companions and create unforgettable memories around the
            world.
          </p>
        </div>

        {/* Creative Testimonials Carousel */}
        {featured && (
          <div ref={featuredRef} className="mb-20">
            {/* Carousel Container */}
            <div className="relative">
              {/* Main Carousel */}
              <div
                className="relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Carousel Track */}
                <div
                  className="flex testimonial-slider-track"
                  style={{ transform: `translateX(-${currentStory * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={testimonial.id}
                      className="w-full hrink-0 testimonial-card"
                    >
                      {/* Creative Layout Structure */}
                      <div className="relative min-h-[700px] flex items-center justify-center">
                        {/* Background Image with Parallax Effect */}
                        <div className="absolute inset-0 overflow-hidden rounded-3xl">
                          <Image
                            width={1200}
                            height={700}
                            src={testimonial.image}
                            alt={testimonial.trip}
                            className="w-full h-full object-cover testimonial-image scale-110"
                          />
                          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-black/80"></div>
                          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30"></div>

                          {/* Auto-play progress indicator */}
                          {index === currentStory &&
                            isAutoPlaying &&
                            !isPaused && (
                              <div className="testimonial-progress"></div>
                            )}
                        </div>

                        {/* Floating Content Container */}
                        <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          {/* Left Side - Traveler Profiles */}
                          <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
                            {/* Traveler Avatars Stack */}
                            <div className="relative">
                              <div className="flex items-center justify-center">
                                {/* Main Avatar Circle */}
                                <div className="relative">
                                  <div className="w-32 h-32 rounded-full bg-linear-to-r from-blue-500 to-purple-600 p-1 shadow-2xl">
                                    <Image
                                      width={128}
                                      height={128}
                                      src={testimonial.reviewerAvatar}
                                      alt={testimonial.reviewerName}
                                      className="w-full h-full rounded-full object-cover testimonial-avatar"
                                    />
                                  </div>
                                  {/* Online Indicator */}
                                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                    <Heart className="w-4 h-4 text-white" />
                                  </div>
                                </div>

                                {/* Secondary Avatar */}
                                <div className="relative -ml-8">
                                  <div className="w-24 h-24 rounded-full bg-linear-to-r from-pink-500 to-orange-500 p-1 shadow-xl">
                                    <Image
                                      width={96}
                                      height={96}
                                      src={testimonial.reviewedAvatar}
                                      alt={testimonial.reviewedName}
                                      className="w-full h-full rounded-full object-cover testimonial-avatar"
                                    />
                                  </div>
                                  {/* Connection Line */}
                                  <div className="absolute top-1/2 -left-4 w-8 h-0.5 bg-linear-to-r from-blue-400 to-pink-400"></div>
                                </div>
                              </div>

                              {/* Names */}
                              <div className="text-center mt-4">
                                <h3 className="text-xl font-bold text-white mb-1">
                                  {testimonial.reviewerName} &{" "}
                                  {testimonial.reviewedName}
                                </h3>
                                <p className="text-blue-200 text-sm">
                                  Travel Companions
                                </p>
                              </div>
                            </div>

                            {/* Trip Stats */}
                            <div className="flex flex-col space-y-3 w-full max-w-xs">
                              <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <MapPin className="w-5 h-5 text-blue-400" />
                                <span className="text-white font-medium">
                                  {testimonial.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <Calendar className="w-5 h-5 text-purple-400" />
                                <span className="text-white font-medium">
                                  {testimonial.duration}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <Star className="w-5 h-5 text-yellow-400" />
                                <span className="text-white font-medium">
                                  {testimonial.rating}/5 Rating
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Center - Main Content */}
                          <div className="lg:col-span-8 testimonial-content">
                            {/* Quote Section */}
                            <div className="relative">
                              {/* Large Quote Mark */}
                              <Quote className="w-16 h-16 text-white/20 absolute -top-4 -left-4" />

                              {/* Main Quote */}
                              <div className="relative z-10 pl-8">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                  {testimonial.trip}
                                </h2>

                                {/* Story Text */}
                                <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-light">
                                  &rdquo;{testimonial.story}&rdquo;
                                </p>

                                {/* Highlight Badge */}
                                <div className="inline-flex items-center gap-3 px-6 py-4 bg-linear-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/30">
                                  <Heart className="w-6 h-6 text-pink-400" />
                                  <span className="text-lg font-semibold text-white">
                                    {testimonial.highlight}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Tags */}
                            <div className="flex flex-wrap gap-3 mt-8 pl-8">
                              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-full border border-white/30">
                                #{testimonial.tag}
                              </span>
                              <span className="px-4 py-2 bg-linear-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-sm text-white text-sm font-bold rounded-full border border-white/30">
                                {testimonial.year}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-10 right-10 w-20 h-20 bg-linear-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                        <div className="absolute bottom-20 left-20 w-32 h-32 bg-linear-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
                        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-linear-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-lg"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Navigation Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 left-6 z-20">
                <button
                  onClick={prevStory}
                  className="group p-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full shadow-2xl border border-white/30 testimonial-nav-button disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={testimonials.length <= 1}
                >
                  <ChevronLeft className="w-7 h-7 text-white group-hover:text-white transition-colors" />
                </button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 right-6 z-20">
                <button
                  onClick={nextStory}
                  className="group p-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full shadow-2xl border border-white/30 testimonial-nav-button disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={testimonials.length <= 1}
                >
                  <ChevronRight className="w-7 h-7 text-white group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            {/* Enhanced Bottom Controls */}
            <div className="flex items-center justify-between mt-10 px-6">
              {/* Stylized Dot Indicators */}
              <div className="flex items-center gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToStory(index)}
                    className={`relative testimonial-dot transition-all duration-300 ${
                      index === currentStory
                        ? "w-12 h-4 bg-linear-to-r from-blue-600 to-purple-600 rounded-full active"
                        : "w-4 h-4 bg-slate-400 hover:bg-slate-500 rounded-full"
                    }`}
                  >
                    {index === currentStory && (
                      <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Enhanced Auto-play Controls */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="flex items-center gap-3 px-6 py-3 bg-linear-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 rounded-full transition-all duration-300 shadow-lg"
                >
                  {isAutoPlaying && !isPaused ? (
                    <Pause className="w-5 h-5 text-slate-700" />
                  ) : (
                    <Play className="w-5 h-5 text-slate-700" />
                  )}
                  <span className="text-sm font-semibold text-slate-700">
                    {isAutoPlaying && !isPaused ? "Pause" : "Play"}
                  </span>
                </button>

                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                  <span className="text-sm font-bold text-slate-700">
                    {currentStory + 1}
                  </span>
                  <div className="w-8 h-0.5 bg-slate-300 rounded-full">
                    <div
                      className="h-full bg-linear-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ((currentStory + 1) / testimonials.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-slate-500">
                    {testimonials.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonials;
