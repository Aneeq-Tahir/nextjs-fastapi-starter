import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const API_ENDPOINT =
   process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const parseCookie = (cookieString: string) => {
   return cookieString
      .split("; ")
      .map((pair) => pair.split("="))
      .reduce((cookieObj: Record<string, string>, [key, value]) => {
         cookieObj[key.toLowerCase()] = value;
         return cookieObj;
      }, {});
};
