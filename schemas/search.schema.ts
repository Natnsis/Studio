import { z } from "zod";

export const SearchSchema = z.object({
  url: z
    .string()
    .url()
    .refine(
      (val) =>
        val.includes("youtube.com") ||
        val.includes("youtu.be"),
      {
        message: "Must be a valid YouTube URL",
      }
    ),
});

export type SearchType = z.infer<typeof SearchSchema>
