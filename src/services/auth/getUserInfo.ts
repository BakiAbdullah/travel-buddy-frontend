/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/serverFetch";
import { IUserInfo } from "@/types/user.interface";
import { getCookie } from "./cookieHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserInfo = async (): Promise<IUserInfo | any> => {
  let userInfo: IUserInfo | any;

  try {
    const response = await serverFetch.get("/auth/me", {
      cache: "no-store",
      next: { tags: ["userInfo"] },
    });

    const result = await response.json();

    if (result.success) {
      const accessToken = await getCookie("accessToken");

      if (!accessToken) {
        throw new Error("Access Token is missing!");
      }
      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      userInfo = {
        name: verifiedToken.name || "Unknown User",
        email: verifiedToken.email,
        role: verifiedToken.role,
      };
    }

    userInfo = {
      name:
        result?.data?.admin?.name ||
        result?.data?.user?.name ||
        result?.data?.name ||
        "Unknown User",
      ...result?.data,
    };
    return userInfo;
  } catch (err: any) {
    console.error("Error fetching user info:", err);
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "COMMON",
    };
  }
};
