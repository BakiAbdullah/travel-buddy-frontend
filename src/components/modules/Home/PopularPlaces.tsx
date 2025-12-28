"use client"
import Image from "next/image";
import PopularImage from "@/assets/p1.jpg";
import PopularImage2 from "@/assets/luca-bravo-O453M2Liufs-unsplash.jpg";
import PopularImage3 from "@/assets/p3.jpg";
import PopularImage4 from "@/assets/le-tuan-anh-0gA-8stF6uE-unsplash.jpg";
import PopularImage5 from "@/assets/clint-mckoy-GJVPcHLKUi0-unsplash.jpg";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PopularPlaces = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, descriptionRef.current, buttonsRef.current], {
        opacity: 0,
        y: 30
      });

      gsap.set(".place-card", {
        opacity: 0,
        y: 50,
        scale: 0.9
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

      // Animate title
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      // Animate description
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      // Animate buttons
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      // Animate cards with stagger
      .to(".place-card", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15
      }, "-=0.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const places = [
    {
      id: 1,
      title: "Country above the clouds",
      subtitle: "THE BEAUTY OF BROMO",
      category: "Most Interesting",
      image: PopularImage,
      avatars: [
        "/api/placeholder/40/40",
        "/api/placeholder/40/40",
        "/api/placeholder/40/40",
      ],
      size: "large",
    },
    {
      id: 2,
      title: "Lava Jeep Tour",
      subtitle: "JEEPS GO AROUND BROMO",
      image: PopularImage5,
      size: "medium",
    },
    {
      id: 3,
      title: "Hiking on Bromo",
      subtitle: "MEMORABLE EXPERIENCE",
      image: PopularImage4,
      size: "small",
    },
    {
      id: 4,
      title: "Luhur Poten Temple",
      subtitle: "CULTURE AND TRADITION",
      image: PopularImage2,
      size: "small",
    },
    {
      id: 5,
      title: "Bromo Horse Riding",
      subtitle: "UNFORGETTABLE EXPERIENCE",
      image: PopularImage3,
      size: "small",
    },
  ];

  return (
    <div ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-4xl mb-16">
          <div ref={titleRef}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              The Journey Of
              <br />
              Popular Destinations
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl"
            >
              This journey offers an unforgettable experience that blends
              adventure, culture, and natural beauty. Located in breathtaking
              destinations around the world.
            </p>

            <div ref={buttonsRef} className="flex gap-4 flex-shrink-0">
              <Button
                variant="outline"
                className="px-6 py-3 rounded-full border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Reminder me
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3 rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Places Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Large Card */}
          <div className="place-card lg:col-span-8 relative group cursor-pointer">
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
              <Image
                src={places[0].image}
                alt={places[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-3">
                    {places[0].category}
                  </span>
                  <p className="text-white/80 text-sm font-medium mb-2">
                    {places[0].subtitle}
                  </p>
                  <h3 className="text-white text-2xl lg:text-3xl font-bold">
                    {places[0].title}
                  </h3>
                </div>

                {/* Avatars */}
                <div className="flex -space-x-2">
                  {places[0].avatars?.map((avatar, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                    >
                      <Image
                        src={avatar}
                        alt={`Traveler ${index + 1}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Medium Card */}
          <div className="place-card lg:col-span-4 relative group cursor-pointer">
            <div className="relative h-[400] lg:h-[500px] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
              <Image
                src={places[1].image}
                alt={places[1].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <p className="text-white/80 text-sm font-medium mb-2">
                  {places[1].subtitle}
                </p>
                <h3 className="text-white text-xl lg:text-2xl font-bold">
                  {places[1].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Small Cards */}
          {places.slice(2).map((place, index) => (
            <div
              key={place.id}
              className="place-card lg:col-span-4 relative group cursor-pointer"
            >
              <div className="relative h-[300px] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                <Image
                  src={place.image}
                  alt={place.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Play Button */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <p className="text-white/80 text-sm font-medium mb-2">
                    {place.subtitle}
                  </p>
                  <h3 className="text-white text-lg lg:text-xl font-bold">
                    {place.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularPlaces;