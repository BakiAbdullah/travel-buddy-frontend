import Logo from "@/assets/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { getUserInfo } from "@/services/auth/getUserInfo";
import { IUserInfo } from "@/types/user.interface";
import {
  Coins,
  InboxIcon,
  LayoutDashboard,
  PlaneIcon,
  Search,
  SquareUser,
  User2,
  UserCog
} from "lucide-react";
import Link from "next/link";

// Navigation links array to be used in both desktop and mobile menus
export const navigationLinks = [
  {
    href: "/explore-travelers",
    label: "Explore Travelers",
    icon: SquareUser,
    allowedRoles: ["COMMON", "USER"],
  },
  {
    href: "/my-travel-plans",
    label: "My Travel Plans",
    icon: InboxIcon,
    allowedRoles: ["USER"],
  },
  {
    href: "/find-travel-buddy",
    label: "Find Travel Buddy",
    icon: Search,
    allowedRoles: ["COMMON"],
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User2,
    allowedRoles: ["USER"],
  },
  {
    href: "/admin/dashboard",
    label: "Admin Dashboard",
    icon: LayoutDashboard,
    allowedRoles: ["ADMIN"],
  },
  {
    href: "/admin/dashboard/manage-users",
    label: "Manage Users",
    icon: UserCog,
    allowedRoles: ["ADMIN"],
  },
  {
    href: "/admin/dashboard/manage-travel-plans",
    label: "Manage Travel Plans",
    icon: PlaneIcon,
    allowedRoles: ["ADMIN"],
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User2,
    allowedRoles: ["ADMIN"],
  },
];

export default async function PublicNavbar() {
  const userInfo = (await getUserInfo()) as IUserInfo;
  console.log({ userInfo });
  
  return (
    <header
      data-tour="nav"
      className="border-b px-4 md:px-10 sticky top-0 z-40 bg-background/80 backdrop-blur-xs"
    >
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 mt-4 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon;

                    // If no user → treat as COMMON
                    const currentRole = userInfo?.role || "COMMON";

                    // If this role is NOT allowed → hide
                    if (!link.allowedRoles.includes(currentRole)) return null;

                    return (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          href={link.href}
                          className="text-foreground hover:text-primary flex-row items-center gap-2 py-1.5 font-medium"
                        >
                          <Icon
                            size={16}
                            className="text-muted-foreground/80"
                            aria-hidden="true"
                          />
                          <span>{link.label}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
          </div>
        </div>

        {/* Middle area */}
        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList className="gap-2">
            {navigationLinks.map((link, index) => {
              const Icon = link.icon;

              // If no user → treat as COMMON
              const currentRole = userInfo?.role || "COMMON";

              // If this role is NOT allowed → hide
              if (!link.allowedRoles.includes(currentRole)) return null;

              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.href}
                    className="text-foreground hover:text-primary flex-row items-center gap-2 py-1.5 font-medium"
                  >
                    <Icon
                      size={16}
                      className="text-muted-foreground/80"
                      aria-hidden="true"
                    />
                    <span>{link.label}</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Login & Logout */}
          <div className="flex items-center gap-4">
            {userInfo?.email ? (
              <Button
                // onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-sm cursor-pointer"
              >
                Logout
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  asChild
                  size="sm"
                  className="text-sm text-white cursor-pointer"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="text-sm bg-red-500 hover:bg-red-700 text-white cursor-pointer"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
