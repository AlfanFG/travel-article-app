import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | undefined) {
  return date ? moment(date).format("DD MMM YYYY") : "-";
}

export function getError(err: unknown) {
  let message = "Failed to fetch articles. Please try again.";
  if (err && typeof err === "object" && "response" in err) {
    const errorObj = err as {
      response?: { data?: { error?: { message?: string } } };
    };
    message =
      errorObj.response?.data?.error?.message ||
      "Failed to fetch articles. Please try again.";
  }

  return message;
}
