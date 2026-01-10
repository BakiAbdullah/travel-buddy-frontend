"use client";

import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { getUserInfo } from "@/services/auth/getUserInfo";
import { IUserInfo } from "@/types/user.interface";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { navigationLinks } from "@/utils/navLinks";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function PublicNavbar() {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Pages with a light navbar background from the start
  const lightBackgroundPages = [
    '/explore-travelers',
    '/dashboard',
    '/profile',
    '/travel-plans',
    '/matched-travel-plans',
    '/about',
    '/blogs',
    '/login',
    '/register'
  ];

  const isLightBackgroundPage = lightBackgroundPages.some(page => 
    pathname.startsWith(page)
  );

  useEffect(() => {
    // Get user info
    const fetchUserInfo = async () => {
      try {
        const info = await getUserInfo();
        setUserInfo(info as IUserInfo);
      } catch (error) {
        console.log("No user info available");
      }
    };

    fetchUserInfo();

    // Simple scroll detection
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldBeScrolled = scrollY > 50;
      
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);
  
  return (
    <header
      ref={navRef}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
        ${isScrolled || isLightBackgroundPage
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-white/10 backdrop-blur-sm'
        }
      `}
    >
      <div className={`
        container mx-auto px-6 transition-all duration-500 ease-out
        ${isScrolled ? 'py-4' : 'py-6'}
      `}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo isScrolled={isScrolled || isLightBackgroundPage} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${isScrolled || isLightBackgroundPage
                  ? 'text-gray-900 hover:bg-gray-100' 
                  : 'text-gray-900 bg-white/20 backdrop-blur-sm hover:bg-white/30'
                }
              `}
            >
              Home
            </Link>
            {navigationLinks.slice(0, 4).map((link, index) => {
              const currentRole = userInfo?.role || "COMMON";
              if (!link.allowedRoles.includes(currentRole)) return null;

              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`
                    text-sm font-medium transition-all duration-300 hover:opacity-80
                    ${isScrolled || isLightBackgroundPage ? 'text-gray-700' : 'text-gray-800'}
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            {userInfo?.email ? (
              <LogoutButton />
            ) : (
              <Button
                asChild
                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${isScrolled || isLightBackgroundPage
                    ? 'bg-gray-900 text-white hover:bg-gray-800' 
                    : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
                  }
                `}
              >
                <Link href="/login">Start Your Journey</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`
                    ${isScrolled || isLightBackgroundPage ? 'text-gray-900' : 'text-gray-900'}
                  `}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-48 p-2">
                <div className="space-y-1">
                  <Link href="/" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded">Home</Link>
                  {navigationLinks.map((link, index) => {
                    const currentRole = userInfo?.role || "COMMON";
                    if (!link.allowedRoles.includes(currentRole)) return null;

                    return (
                      <Link
                        key={index}
                        href={link.href}
                        className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  {!userInfo?.email && (
                    <Link href="/login" className="block px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded">
                      Start Your Journey
                    </Link>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}
