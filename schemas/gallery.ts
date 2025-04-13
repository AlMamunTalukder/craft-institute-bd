import * as z from "zod";

export const CreateFolderSchema = z.object({
  name: z
    .string({
      required_error: "Please enter a folder name.",
      invalid_type_error: "Folder name must be a string.",
    })
    .min(3, { message: "Folder name must be at least 3 characters long." })
    .max(50, { message: "Folder name cannot exceed 50 characters." }),
});
