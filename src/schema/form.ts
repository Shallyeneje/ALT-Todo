import { z } from "zod";

export const taskFormSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  start: z.string(),
  end: z.string(),
  duration: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  archived: z.boolean(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  isDefault: z.boolean(),
  parentId: z.string().optional(),
  children: z.string().optional(),
  owner: z.string().optional(),
  tags: z.string().optional(),
  completedAt: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
