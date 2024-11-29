import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Updater } from "@tanstack/vue-table";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function valueUpdater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref,
) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}

export function formatDateTime(
  date: string | Date,
  format: string = "DD.MM.YYYY HH:mm:ss",
) {
  return useDateFormat(new Date(date), format).value;
  // return new Date(date).toLocaleString();
}
