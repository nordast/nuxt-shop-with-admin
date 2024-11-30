import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Updater } from "@tanstack/vue-table";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
