import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Handles Zod validation errors and returns an array of error messages.
 * @param error - The ZodError instance
 * @returns An array of error messages
 */
export const handleValidationError = (error: ZodError): string[] => {
  return error.errors.map((err) => err.message);
};

/**
 * Global error handler for consistent error management.
 * @param error - The error object to handle.
 */
export const handleError = (error: unknown) => {
  try {
    if (typeof error === "string") {
      toast.error(error);
      return;
    }

    if (error instanceof Error) {
      const errorMessages = JSON.parse(error.message);

      if (Array.isArray(errorMessages)) {
        errorMessages.forEach((msg) => toast.error(msg));
      } else {
        toast.error(errorMessages || "An error occurred.");
      }
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  } catch (err: any) {
    toast.error(
      err.message || "An unexpected error occurred. Please try again.",
    );
  }
};
