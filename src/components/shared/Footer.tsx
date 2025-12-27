'use client';

import Logo from "@/assets/Logo";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLUListElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const logo = logoRef.current;
    const socialLinks = socialLinksRef.current;
    const linksContainer = linksContainerRef.current;
    const copyright = copyrightRef.current;

    if (!footer || !logo || !socialLinks || !linksContainer || !copyright) return;

    // Set initial states
    gsap.set([logo, socialLinks], { opacity: 0, y: 30 });
    gsap.set(linksContainer.children, { opacity: 0, y: 20 });
    gsap.set(copyright, { opacity: 0 });

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate logo and description
    tl.to(logo, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    // Animate social links with stagger
    .to(socialLinks.children, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4")
    // Animate footer links columns
    .to(linksContainer.children, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.3")
    // Animate copyright
    .to(copyright, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2");

    // Add floating animation for background elements
    gsap.to(".floating-element", {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5
    });

    // Add hover animations for social links
    const socialIcons = socialLinks.querySelectorAll('a');
    socialIcons.forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, { scale: 1.2, duration: 0.3, ease: "power2.out" });
      });
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative footer-background overflow-hidden"
    >
      {/* Background pattern overlay with animated elements */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%),
                           linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%)`
        }}
      ></div>
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element footer-floating-element absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full"></div>
        <div className="floating-element footer-floating-element absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400/30 rounded-full"></div>
        <div className="floating-element footer-floating-element absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-pink-400/20 rounded-full"></div>
        <div className="floating-element footer-floating-element absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400/25 rounded-full"></div>
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative mx-auto container space-y-8 px-4 py-16 text-white">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div ref={logoRef}>
            {/* Logo */}
            <Logo />
            <p className="mt-4 max-w-xs text-gray-300">
              Discover amazing destinations, plan unforgettable trips, and create 
              memories that last a lifetime with your trusted travel companion.
            </p>

            <ul ref={socialLinksRef} className="mt-8 flex gap-6">
              <li>
                <Link
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="footer-social-icon text-blue-500 transition duration-200"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="footer-social-icon text-pink-500 transition duration-200"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="footer-social-icon text-cyan-500 transition duration-200"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="footer-social-icon text-gray-400 transition hover:text-white duration-200"
                >
                  <span className="sr-only">YouTube</span>
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="footer-social-icon text-red-500 transition duration-200"
                >
                  <span className="sr-only">Pinterest</span>
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          <div ref={linksContainerRef} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="footer-section-title font-medium text-gray-200 mb-6">Services</p>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Trip Planning
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Hotel Booking
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Flight Reservations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Travel Insurance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="footer-section-title font-medium text-gray-200 mb-6">Destinations</p>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Popular Places
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Beach Destinations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Mountain Retreats
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    City Adventures
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="footer-section-title font-medium text-gray-200 mb-6">Support</p>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="/contact"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Travel FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    24/7 Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Travel Guides
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="footer-section-title font-medium text-gray-200 mb-6">Company</p>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    About Travel Buddy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="footer-link text-gray-300 transition hover:text-white hover:opacity-75"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p ref={copyrightRef} className="footer-copyright text-xs text-gray-400 pt-8 border-t border-gray-700">
          &copy; 2025. Travel Buddy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;