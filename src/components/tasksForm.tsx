"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form"; // adjust path as needed
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
// import { Switch } from "../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema } from "../schema/form";
import type { z } from "zod";
import type { Task } from "../types/types";

type Props = {
  onSubmit: (task: Omit<Task, "_id">) => void;
  onCancel: () => void;
  defaultDate: string;
};

type FormValues = z.infer<typeof taskFormSchema>;

export default function TaskForm({ onSubmit, onCancel, defaultDate }: Props) {
 const form = useForm<FormValues>({
  resolver: zodResolver(taskFormSchema),
  defaultValues: {
    name: "",
    description: "",
    start: defaultDate,
    end: defaultDate,
    duration: "",
    priority: "LOW",
    archived: false,
    status: "TODO",
    isDefault: false,
    parentId: "",
    children: "",
    owner: "",
    tags: "",
    completedAt: "",
    createdAt: "",
    updatedAt: "",
  },
});

const handleSubmit = (values: FormValues) => {
  const duration = values.duration?.trim()
    ? Number(values.duration)
    : null;
  const tags = values.tags?.trim() || null;
  const formatDate = (date: any) =>
    date ? new Date(date).toISOString() : null;

  onSubmit({
    id: crypto.randomUUID(),
    name: values.name,
    description: values.description || null,
    start: formatDate(values.start),
    end: formatDate(values.end),
    duration,
    priority: values.priority,
    archived: values.archived,
    status: values.status,
    isDefault: values.isDefault,
    parentId: values.parentId || null,
    children: values.children || "", // must be string
    owner: values.owner || null,
    tags,
    completedAt: formatDate(values.completedAt),
    createdAt: formatDate(values.createdAt),
    updatedAt: formatDate(values.updatedAt),
  });
};

  return (
    <Form {...form}>
      <h3 className="mx-auto text-center ">Create New Task</h3>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-[16px]">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-[15px]">
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

      

        <div className="grid grid-cols-3 gap-[20px]">
            <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (minutes)</FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder="e.g. 30" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TODO">To Do</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="DONE">Done</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        {/* <div className="grid grid-cols-2 gap-[15px]">
          <FormField
            control={form.control}
            name="archived"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Archived</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is Default</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div> */}

        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="children"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Children IDs (comma-separated)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="id1, id2" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="gap-y-[10px]">
          {["completedAt", "createdAt", "updatedAt"].map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as keyof FormValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldName.replace(/At$/, " At")}</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={
                        field.value && typeof field.value === "string"
                          ? new Date(field.value).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex justify-end gap-[15px]">
          <Button type="submit" className="bg-[#0f172a] text-[#cbd5e1] px-[16px] py-[8px]">Add Task</Button>
          <Button type="button" className="bg-[#8b0000] text-[#cbd5e1] px-[16px] py-[8px]" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
