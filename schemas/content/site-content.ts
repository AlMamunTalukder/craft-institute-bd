import { z } from "zod";

export const siteContentSchema = z.object({
  logoLight: z
    .string({
      required_error: "Please upload a light logo",
    })
    .optional(),

  logoDark: z
    .string({
      required_error: "Please upload a dark logo",
    })
    .optional(),

  tagline: z
    .string({
      required_error: "Please enter your company tagline",
    })
    .min(3, "Tagline is required"),

  email: z
    .string({
      required_error: "Please enter your email address",
    })
    .email("Invalid email address"),
  phone1: z
    .string({
      required_error: "Please enter your phone number",
    })
    .regex(
      /^\+?\d{1,4}?\s?\d{1,14}(?:\s?\d{1,13})?$/,
      "Invalid phone number format",
    )
    .min(7, "Phone number is too short"),
  phone2: z
    .string({
      required_error: "Please enter your phone number",
    })
    .regex(
      /^\+?\d{1,4}?\s?\d{1,14}(?:\s?\d{1,13})?$/,
      "Invalid phone number format",
    )
    .min(7, "Phone number is too short")
    .optional(),
  address: z
    .string({
      required_error: "Please enter your address",
    })
    .min(3, "Address is required"),

  facebook: z
    .string({
      required_error: "Please enter your Facebook URL",
    })
    .url("Must be a valid URL"),
  facebookGroup: z
    .string({
      required_error: "Please enter your Facebook Group URL",
    })
    .url("Must be a valid URL"),
  whatsapp: z
    .string({
      required_error: "Please enter your WhatsApp URL",
    })
    .url("Must be a valid URL"),
  youtube: z
    .string({
      required_error: "Please enter your YouTube URL",
    })
    .url("Must be a valid URL"),
  telegram: z
    .string({
      required_error: "Please enter your Telegram URL",
    })
    .url("Must be a valid URL"),
});
