import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/server/uploadthing";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

 
 
// export const { useUploadThing, uploadFiles } =
//   generateReactHelpers<OurFileRouter>();