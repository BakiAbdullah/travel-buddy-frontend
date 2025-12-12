"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboard.interface";
import { Bell, Menu, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { IUserInfo } from "@/types/user.interface";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import UserDropdown from "./UserDropdown";

interface DashboardNavbarContentProps {
  userInfo: IUserInfo;
  navItems?: NavSection[];
  dashboardHome?: string;
}
const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);

    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);

   const getCurrentGreeting = () => {
     const hour = new Date().getHours();
     if (hour < 12) return "Good Morning";
     if (hour < 18) return "Good Afternoon";
     return "Good Evening";
   };
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-xl shadow-md">
      <div className="flex h-17 items-center justify-between gap-4 px-4 md:px-6">
        {/* Left Section - Mobile Menu & Welcome */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Toggle */}
          <Sheet open={isMobile && isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <DashboardMobileSidebar
                userInfo={userInfo}
                navItems={navItems || []}
                dashboardHome={dashboardHome || ""}
              />
            </SheetContent>
          </Sheet>

          {/* Welcome Message - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <div className="p-1.5 bg-linear-to-br from-orange-500 to-fuchsia-400 rounded-lg shadow-md">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 leading-tight">
                {getCurrentGreeting()}, {userInfo.name}! 👋
              </p>
              <p className="text-xs text-gray-500">
                Ready for your next adventure?
              </p>
            </div>
          </div>

          {/* Welcome Message - Mobile (Simplified) */}
          <div className="md:hidden">
            <p className="text-sm font-semibold text-gray-900">
              Hi, {userInfo.name}! 👋
            </p>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </Button>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-gray-200 mx-1"></div>

          {/* User Dropdown */}
          <UserDropdown userInfo={userInfo} />
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden border-t border-gray-200 bg-white/95 px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-150 rounded-lg transition-colors">
          <Search className="h-4 w-4 text-gray-500 shrink-0" />
          <input
            type="text"
            placeholder="Search anything..."
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbarContent;
