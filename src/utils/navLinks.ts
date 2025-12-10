import {
  InboxIcon,
  LayoutDashboard,
  PlaneIcon,
  Search,
  SquareUser,
  User2,
  UserCog
} from "lucide-react";

// Navigation links array to be used in both desktop and mobile menus
export const navigationLinks = [
  {
    href: "/explore-travelers",
    label: "Explore Travelers",
    icon: SquareUser,
    allowedRoles: ["COMMON", "USER"],
  },
  {
    href: "/dashboard/my-travel-plans",
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