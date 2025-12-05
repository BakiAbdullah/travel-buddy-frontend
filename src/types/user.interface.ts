import { TUserRole } from "./userRole";

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
  profileImage?: string;
  needPasswordChange: boolean;
  contactNumber?: string;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  createdAt: string;
  updatedAt: string;
}
