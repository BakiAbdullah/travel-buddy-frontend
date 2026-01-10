"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Shield, Zap, Headphones } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Users,
      title: "50K+ Active Users",
      description:
        "Join our thriving community of verified travelers from around the world, ready to share amazing adventures.",
    },
    {
      icon: Shield,
      title: "100% Safe & Verified",
      description:
        "Every travel buddy goes through our comprehensive verification process ensuring your safety and peace of mind.",
    },
    {
      icon: Zap,
      title: "Instant Matching",
      description:
        "Our smart algorithm instantly connects you with compatible travel companions based on your interests and preferences.",
    },
    {
      icon: Headphones,
      title: "24/7 Travel Support",
      description:
        "Get round-the-clock assistance from our dedicated support team throughout your entire travel journey.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, descriptionRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(".feature-item", {
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
        // Animate feature items with stagger
        .to(
          ".feature-item",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div ref={titleRef}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 font-medium mb-8">
              WHY CHOOSE Trip Mate{" "}
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Trusted Travel
              <br />
              Companion Platform
            </h2>
          </div>

          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            Connect with verified travel companions, explore amazing
            destinations safely, and create unforgettable memories with
            like-minded adventurers from around the world.
          </p>
        </div>

        {/* Features Section */}
        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-item text-center">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <Icon
                      className="w-12 h-12 text-gray-600"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-700 mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-base md:text-xl leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
