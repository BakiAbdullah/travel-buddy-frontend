
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
        href: "/dashboard/travel-plans",
        icon: "Calendar",
        roles: ["USER"],
      },
      {
        title: "Add Travel Plan",
        href: "/dashboard/create-travel-plan",
        icon: "ClipboardList",
        roles: ["USER"],
      },
    ],
  },
  {
    title: "Medical Records",
    items: [
      {
        title: "My Prescriptions",
        href: "/dashboard/my-prescriptions",
        icon: "FileText", 
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
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Users",
        href: "/admin/dashboard/users-management",
        icon: "Users", // ✅ String
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Travel Management",
    items: [
      {
        title: "Appointments",
        href: "/admin/dashboard/appointments-management",
        icon: "Calendar", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Schedules",
        href: "/admin/dashboard/schedules-management",
        icon: "Clock", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Specialities",
        href: "/admin/dashboard/specialities-management",
        icon: "Hospital", // ✅ String
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
