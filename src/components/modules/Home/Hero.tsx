"use client";
import Image from "next/image";
import banner from "@/assets/andres-molina-5boA6Onp77c-unsplash.jpg";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set(
        [titleRef.current, subtitleRef.current, aboutSectionRef.current],
        {
          opacity: 0,
          y: 50,
        }
      );

      // Main timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate title
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      })
        // Animate subtitle
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        // Animate about section
        .to(
          aboutSectionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        );

      // Cloud blob animations - more realistic fume movement
      gsap.to(".cloud-path-1", {
        morphSVG:
          "M0,110 C90,70 170,90 250,75 C330,60 410,80 490,65 C570,50 650,75 730,60 C810,45 890,70 970,55 C1050,40 1130,65 1200,50 L1200,240 L0,240 Z",
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".cloud-path-2", {
        morphSVG:
          "M0,90 C110,50 210,70 310,55 C410,40 510,60 610,45 C710,30 810,55 910,40 C1010,25 1110,50 1200,35 L1200,240 L0,240 Z",
        duration: 15,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      gsap.to(".cloud-path-3", {
        morphSVG:
          "M0,80 C160,35 310,60 460,40 C610,20 760,45 910,25 C1060,5 1200,30 1200,15 L1200,240 L0,240 Z",
        duration: 18,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 4,
      });

      gsap.to(".cloud-path-4", {
        morphSVG:
          "M0,60 C210,15 410,40 610,20 C810,0 1010,25 1200,5 L1200,240 L0,240 Z",
        duration: 20,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      // Animate cloud details (small circles)
      gsap.to(".cloud-detail-1", {
        y: -15,
        x: 20,
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".cloud-detail-2", {
        y: -10,
        x: -15,
        duration: 10,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1,
      });

      gsap.to(".cloud-detail-3", {
        y: -20,
        x: 25,
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });

      gsap.to(".cloud-detail-4", {
        y: -8,
        x: -10,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3,
      });

      gsap.to(".cloud-detail-5", {
        y: -12,
        x: 18,
        duration: 11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });

      // Alternative floating animation if morphSVG is not available
      gsap.to(".cloud-blob", {
        y: -10,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Background parallax
      gsap.to(".hero-bg", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Cloud blob scroll animation
      gsap.to(".cloud-blob", {
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "center bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative">
      {/* Hero Section with Temple Background */}
      <div className="relative h-screen w-full overflow-hidden bg-gray-200">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="hero-bg absolute inset-0">
            <Image
              src={banner}
              alt="Thailand Temple Background"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-200/40 via-black/20 to-white/10"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center h-full w-full">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              {/* Main Heading */}
              <div ref={titleRef} className="mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Find Your Perfect Travel Buddy: Adventure Awaits Together
                </h1>
              </div>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl"
              >
                Connect with like-minded travelers, share unforgettable
                journeys, and explore the world together. Your next adventure
                companion is just a click away.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>

        {/* Cloud Blob Transition */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg
            className="cloud-blob w-full h-40 md:h-48 lg:h-56"
            viewBox="0 0 1200 240"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="cloudGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="20%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="40%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="70%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,1)" />
              </linearGradient>
              <linearGradient
                id="fumeGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="30%" stopColor="rgba(255,255,255,0.2)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
              </linearGradient>
              <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
              <filter
                id="softBlur"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
              </filter>
            </defs>

            {/* Dense white cloud foundation - bottom layers */}
            <path
              d="M0,220 L1200,220 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,1)"
            />

            {/* Ultra-dense white cloud layer 1 */}
            <path
              d="M0,215 C50,212 100,214 150,213 C200,212 250,214 300,213 C350,212 400,214 450,213 C500,212 550,214 600,213 C650,212 700,214 750,213 C800,212 850,214 900,213 C950,212 1000,214 1050,213 C1100,212 1150,214 1200,213 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,1)"
            />

            {/* Ultra-dense white cloud layer 2 */}
            <path
              d="M0,210 C80,207 160,209 240,208 C320,207 400,209 480,208 C560,207 640,209 720,208 C800,207 880,209 960,208 C1040,207 1120,209 1200,208 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.99)"
              filter="url(#lightBlur)"
            />

            {/* Dense white cloud layer 3 */}
            <path
              d="M0,205 C100,202 200,204 300,203 C400,202 500,204 600,203 C700,202 800,204 900,203 C1000,202 1100,204 1200,203 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.98)"
              filter="url(#lightBlur)"
            />

            {/* Dense white cloud layer 4 */}
            <path
              d="M0,200 C120,197 240,199 360,198 C480,197 600,199 720,198 C840,197 960,199 1080,198 C1140,197 1200,199 1200,198 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.97)"
              filter="url(#softBlur)"
            />

            {/* Dense white cloud layer 5 */}
            <path
              d="M0,195 C150,192 300,194 450,193 C600,192 750,194 900,193 C1050,192 1200,194 1200,193 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.96)"
              filter="url(#softBlur)"
            />

            {/* Dense white cloud layer 6 */}
            <path
              d="M0,190 C180,187 360,189 540,188 C720,187 900,189 1080,188 C1140,187 1200,189 1200,188 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.95)"
              filter="url(#softBlur)"
            />

            {/* Dense white cloud layer 7 */}
            <path
              d="M0,185 C200,182 400,184 600,183 C800,182 1000,184 1200,183 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.94)"
              filter="url(#blur)"
            />

            {/* Dense white cloud layer 8 */}
            <path
              d="M0,180 C220,177 440,179 660,178 C880,177 1100,179 1200,178 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.93)"
              filter="url(#blur)"
            />

            {/* Dense white cloud layer 9 */}
            <path
              d="M0,175 C250,172 500,174 750,173 C875,172 1000,174 1200,173 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.92)"
              filter="url(#blur)"
            />

            {/* Dense white cloud layer 10 */}
            <path
              d="M0,170 C180,167 360,169 540,168 C720,167 900,169 1080,168 C1140,167 1200,169 1200,168 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.9)"
              filter="url(#blur)"
              opacity="0.95"
            />

            {/* Dense white cloud layer 11 */}
            <path
              d="M0,165 C160,162 320,164 480,163 C640,162 800,164 960,163 C1080,162 1200,164 1200,163 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.88)"
              filter="url(#blur)"
              opacity="0.9"
            />

            {/* Final dense white cloud blending layer */}
            <path
              d="M0,160 C120,157 240,159 360,158 C480,157 600,159 720,158 C840,157 960,159 1080,158 C1140,157 1200,159 1200,158 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.85)"
              filter="url(#blur)"
              opacity="0.85"
            />

            {/* Main cloud base */}
            <path
              className="cloud-path-base"
              d="M0,140 C120,100 240,120 360,110 C480,100 600,115 720,105 C840,95 960,110 1080,100 C1140,95 1200,105 1200,110 L1200,240 L0,240 Z"
              fill="url(#cloudGradient)"
              filter="url(#softBlur)"
            />

            {/* Cloud puffs layer 1 */}
            <path
              className="cloud-path-1"
              d="M0,120 C80,80 160,100 240,85 C320,70 400,90 480,75 C560,60 640,85 720,70 C800,55 880,80 960,65 C1040,50 1120,75 1200,60 L1200,240 L0,240 Z"
              fill="url(#fumeGradient)"
              filter="url(#blur)"
              opacity="0.7"
            />

            {/* Cloud puffs layer 2 */}
            <path
              className="cloud-path-2"
              d="M0,100 C100,60 200,80 300,65 C400,50 500,70 600,55 C700,40 800,65 900,50 C1000,35 1100,60 1200,45 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.4)"
              filter="url(#blur)"
              opacity="0.8"
            />

            {/* Wispy fumes layer 3 */}
            <path
              className="cloud-path-3"
              d="M0,90 C150,45 300,70 450,50 C600,30 750,55 900,35 C1050,15 1200,40 1200,25 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.3)"
              filter="url(#blur)"
              opacity="0.6"
            />

            {/* Top wispy details */}
            <path
              className="cloud-path-4"
              d="M0,70 C200,25 400,50 600,30 C800,10 1000,35 1200,15 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,0.2)"
              filter="url(#blur)"
              opacity="0.5"
            />

            {/* Small cloud details */}
            <circle
              className="cloud-detail-1"
              cx="200"
              cy="80"
              r="25"
              fill="rgba(255,255,255,0.3)"
              filter="url(#blur)"
              opacity="0.6"
            />
            <circle
              className="cloud-detail-2"
              cx="400"
              cy="60"
              r="20"
              fill="rgba(255,255,255,0.4)"
              filter="url(#blur)"
              opacity="0.7"
            />
            <circle
              className="cloud-detail-3"
              cx="600"
              cy="75"
              r="30"
              fill="rgba(255,255,255,0.3)"
              filter="url(#blur)"
              opacity="0.5"
            />
            <circle
              className="cloud-detail-4"
              cx="800"
              cy="55"
              r="18"
              fill="rgba(255,255,255,0.4)"
              filter="url(#blur)"
              opacity="0.6"
            />
            <circle
              className="cloud-detail-5"
              cx="1000"
              cy="70"
              r="22"
              fill="rgba(255,255,255,0.3)"
              filter="url(#blur)"
              opacity="0.7"
            />

            {/* Final solid base */}
            <path
              d="M0,180 C300,170 600,175 900,170 C1050,168 1200,172 1200,170 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,1)"
            />

            {/* Ultra-dense bottom coverage 1 */}
            <path
              d="M0,235 C60,234 120,235 180,234 C240,234 300,235 360,234 C420,234 480,235 540,234 C600,234 660,235 720,234 C780,234 840,235 900,234 C960,234 1020,235 1080,234 C1140,234 1200,235 1200,234 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,1)"
            />

            {/* Ultra-dense bottom coverage 2 */}
            <path
              d="M0,232 C40,231 80,232 120,231 C160,231 200,232 240,231 C280,231 320,232 360,231 C400,231 440,232 480,231 C520,231 560,232 600,231 C640,231 680,232 720,231 C760,231 800,232 840,231 C880,231 920,232 960,231 C1000,231 1040,232 1080,231 C1120,231 1160,232 1200,231 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,1)"
            />

            {/* Ultra-dense bottom coverage 3 */}
            <path
              d="M0,228 C30,227 60,228 90,227 C120,227 150,228 180,227 C210,227 240,228 270,227 C300,227 330,228 360,227 C390,227 420,228 450,227 C480,227 510,228 540,227 C570,227 600,228 630,227 C660,227 690,228 720,227 C750,227 780,228 810,227 C840,227 870,228 900,227 C930,227 960,228 990,227 C1020,227 1050,228 1080,227 C1110,227 1140,228 1170,227 C1185,227 1200,228 1200,227 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,1)"
            />

            {/* Ultimate seamless white blend */}
            <path
              d="M0,238 L1200,238 L1200,240 L0,240 Z"
              fill="rgba(255,255,255,1)"
            />
          </svg>
        </div>
      </div>

      {/* About Section */}
      <div className="relative bg-white pb-20">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-10 w-40 h-40 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="currentColor" />
              <circle
                cx="50"
                cy="30"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="35"
                cy="45"
                r="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="65"
                cy="45"
                r="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="65"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="absolute -right-20 bottom-10 w-32 h-32 opacity-5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="50" cy="40" r="8" fill="currentColor" />
              <circle cx="35" cy="65" r="4" fill="currentColor" />
              <circle cx="65" cy="65" r="4" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div
          ref={aboutSectionRef}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          {/* About Us Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 font-medium mb-8">
            About Trip Mate{" "}
          </div>

          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 max-w-4xl mx-auto">
            Connecting Travelers, Creating Memories
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
            Travel Buddy is the ultimate platform for solo travelers and
            adventure seekers to find their perfect travel companions. Whether
            you&apos;re planning a weekend getaway, a cultural expedition, or a
            month-long backpacking adventure, we connect you with like-minded
            travelers who share your passion for exploration. Join our community
            of wanderers, make lifelong friendships, and turn your travel dreams
            into shared experiences. Because the best journeys are the ones we
            take together.
          </p>

          {/* CTA Button */}
          <Button className="px-10 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-gray-900 text-white hover:bg-gray-800 border border-white/30">
            Find Your Trip Mate{" "}
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
