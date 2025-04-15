import { z } from "zod";

export const instructorSchema = z.object({
  name: z
    .string({
      required_error: "Please enter a name",
    })
    .min(1, "Name is required"),
  bio: z
    .string({
      required_error: "Please enter a bio",
    })
    .optional(),
  image: z.string().url("Invalid image URL").optional(),
});
