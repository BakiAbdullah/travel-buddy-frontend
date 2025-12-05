import { TUserRole } from "./userRole";

export interface NavItem {
    title: string;
    href: string;
    icon: string; // ✅ Changed from LucideIcon to string
    badge?: string | number;
    description?: string;
    roles: TUserRole[];
}

export interface NavSection {
    title?: string;
    items: NavItem[];
}
