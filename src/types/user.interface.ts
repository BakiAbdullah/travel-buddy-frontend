import { TUserRole } from "./userRole";

export type TravelRequestType = "ACCEPTED" | "REJECTED" | "CANCELLED";
export type TravelType = "SOLO" | "FAMILY" | "FRIENDS";
export type Visibility = "PUBLIC" | "PRIVATE";

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  bio: string;
  currentLocation?: string;
  role: TUserRole;
  isDeleted: boolean;
  isVerified: boolean;
  profileImage?: string;
  visitedCountries?: string[];
  travelPlans?: ITravelPlan[];
  travelInterests?: string[];
  rating: number;
  reviewsGiven: number[];
  reviewsReceived: number[];
  needPasswordChange: boolean;
  contactNumber?: string;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  createdAt: string;
  updatedAt: string;
}
export interface ITravelPlan {
  id: string;
  userId: string;
  user: IUserInfo;
  destination: string;
  itinerary: string;
  reviews: string[];
  budgetRange: string; // e.g. "1000 - 1100"
  travelRequests: string[];

  startDateTime: string; // ISO date string
  endDateTime: string; // ISO date string
  travelType: TravelType;
  visibility: Visibility;

  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
