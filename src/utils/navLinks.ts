import {
  InboxIcon,
  LayoutDashboard,
  PenBox,
  PlaneIcon,
  Search,
  SquareUser,
  User2,
  UserCircle,
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
    href: "/travel-plans",
    label: "Travel Plans",
    icon: Search,
    allowedRoles: ["COMMON"],
  },
  {
    href: "/about",
    label: "About",
    icon: UserCircle,
    allowedRoles: ["COMMON"],
  },
  {
    href: "/blogs",
    label: "Blogs",
    icon: PenBox,
    allowedRoles: ["COMMON"],
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User2,
    allowedRoles: ["USER"],
  },
  {
    href: "/dashboard/my-travel-plans",
    label: "My Travel Plans",
    icon: InboxIcon,
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
