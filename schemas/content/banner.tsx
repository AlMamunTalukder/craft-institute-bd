import { z } from "zod";

export const bannerSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required"),
  subtitle: z
    .string({
      required_error: "Subtitle is required",
    })
    .min(1, "Subtitle is required"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
  dateInfo: z
    .string({
      required_error: "Date information is required",
    })
    .min(1, "Date information is required"),
  ctaText: z
    .string({
      required_error: "CTA text is required",
    })
    .min(1, "CTA text is required"),
  ctaLink: z
    .string({
      required_error: "CTA link is required",
    })
    .url("Invalid URL"),
  bannerImage: z
    .string({
      required_error: "Banner image is required",
    })
    .min(1, "Banner image is required"),
  backgroundImage: z
    .string({
      required_error: "Background image is required",
    })
    .min(1, "Background image is required"),
  isActive: z.boolean({
    required_error: "Status is required",
  }),
});
