import { z } from "zod";

export const habitSchema = z.object({
  name: z.string().min(1, "Name is required").max(40, "Name is too long"),
  icon: z.string().min(1, "Icon is required"),
  color: z.string().min(1, "Color is required"),
  schedule: z.array(z.number()).min(1, "Select at least one day to track"),
});

export type HabitFormValues = z.infer<typeof habitSchema>;
