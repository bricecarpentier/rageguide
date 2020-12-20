import z from "zod";

export const schema = z.object({
  type: z.literal("ReceiveSuggestion"),
  payload: z.object({
    id: z.string(),
    label: z.string(),
  }),
});

export type ReceiveSuggestion = z.infer<typeof schema>;
