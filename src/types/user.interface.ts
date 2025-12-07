import { TUserRole } from "./userRole";

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  bio: string;
  currentLocation?: string;
  role: TUserRole;
  profileImage?: string;
  visitedCountries?: string[];
  travelPlans?: string[];
  travelInterests?: string[];
  rating: number;
  reviewsGiven: number[]
  needPasswordChange: boolean;
  contactNumber?: string;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  createdAt: string;
  updatedAt: string;
}
