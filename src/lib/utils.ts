import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// 클래스명을 합치고 중복을 제거하는 함수
// 예: cn("bg-red-500", "bg-blue-500") → "bg-blue-500" (마지막 것만 적용)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
