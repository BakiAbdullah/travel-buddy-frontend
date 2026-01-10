"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import adventureBg from "@/assets/luca-bravo-O453M2Liufs-unsplash.jpg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ChooseYourAdventure = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const brand = brandRef.current;
    const title = titleRef.current;
    const buttons = buttonsRef.current;

    if (!section || !brand || !title || !buttons) return;

    // Set initial states
    gsap.set([brand, title], { opacity: 0, y: 50 });
    gsap.set(buttons.children, { opacity: 0, y: 30, scale: 0.9 });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate elements
    tl.to(brand, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    })
      .to(
        title,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        buttons.children,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

    // Add button hover animations
    const buttonElements = buttons.querySelectorAll("a");
    buttonElements.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, { scale: 1.05, duration: 0.3, ease: "power2.out" });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${adventureBg.src || adventureBg})`,
          backgroundColor: "#8B4513", // Fallback color
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element adventure-floating absolute top-1/4 left-1/6 w-2 h-2 bg-white/10 rounded-full"></div>
        <div className="floating-element adventure-floating absolute top-3/4 right-1/4 w-1 h-1 bg-white/15 rounded-full"></div>
        <div className="floating-element adventure-floating absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/10 rounded-full"></div>
        <div className="floating-element adventure-floating absolute top-1/3 right-1/3 w-1 h-1 bg-white/20 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 mx-auto">
        {/* Brand/Logo */}
        <p
          ref={brandRef}
          className="text-white/80 text-sm font-medium tracking-[0.2em] uppercase mb-8"
        >
          Trip Mate{" "}
        </p>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="adventure-title text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-12"
        >
          Choose Your Adventure,{" "}
          <span className="block">We&apos;re Ready To Make It Happen.</span>
        </h1>

        {/* Action Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/signup"
            className="adventure-button bg-white text-gray-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[140px]"
          >
            Signup
          </Link>
          <Link
            href="/login"
            className="adventure-button bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[140px]"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="adventure-scroll w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourAdventure;
