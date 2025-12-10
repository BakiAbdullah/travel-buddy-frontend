
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute } from "./auth-utils";
import { TUserRole } from "@/types/userRole";

export const getCommonNavItems = (role: TUserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["USER", "COMMON", "ADMIN"],
        },
        {
          title: "My Profile",
          href: `/profile`,
          icon: "User",
          roles: ["USER", "COMMON", "ADMIN"],
        },
      ],
    },
  ];
};

export const userNavItems: NavSection[] = [
  {
    title: "Manage Travel Plans",
    items: [
      {
        title: "My Travel Plans",
        href: "/dashboard/my-travel-plans",
        icon: "Calendar",
        roles: ["USER"],
      },
      {
        title: "Travel Requests",
        href: "/dashboard/travel-requests",
        icon: "ClipboardList",
        roles: ["USER"],
      },
    ],
  },

  {
    title: "Settings",
    items: [
      {
        title: "Change Password",
        href: "/change-password",
        icon: "Settings", // ✅ String
        roles: ["USER"],
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "Users Management",
    items: [
      {
        title: "Users",
        href: "/admin/dashboard/users-management",
        icon: "Users", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Travel Plans Management",
    items: [
      {
        title: "Manage Travel Plans",
        href: "/admin/dashboard/manage-travel-plans",
        icon: "Settings", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Manage Payments",
        href: "/admin/dashboard/manage-payments",
        icon: "Coins", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: TUserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "USER":
      return [...commonNavItems, ...userNavItems];
    default:
      return [];
  }
};
