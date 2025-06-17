import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type {Task} from '../types/types';
// import type { TaskPriority, TaskStatus} from "../types/types";
const BASE_URL = "https://api.oluwasetemi.dev/tasks";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(BASE_URL);
      return res.data.data;
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: any) => {
      return await axios.post(BASE_URL, task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// export const useUpdateTask = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
//       return await axios.patch(`${BASE_URL}/${id}`, updates);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["tasks"] });
//     },
//   });
// };
// hooks/useUpdateTask.ts
type UpdateTaskPayload = {
  id: string;
  updates: Partial<Task>;
  // {
  //   name: string;
  //   description: string;
  //    start: string | null;
  //     end: string | null;
  //     duration: number | null; 
  //     priority  ? : TaskPriority;
  //     status ? : TaskStatus;
  //     archived: boolean;
  //     isDefault: boolean | null;
  //     parentId: string | null;
  //     children: string;
  //     owner: string | null;
  //     tags: string | null;
  //     completedAt: string | null;
  //     createdAt: string | null;
  //     updatedAt: string | null;
  //     updates ?: string ;
  //   // Add more fields if necessary
  // };
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: UpdateTaskPayload) => {
      return await axios.patch(`${BASE_URL}/${id}`, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(`${BASE_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useGetTask = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data;
    },
    enabled: !!id, // prevent auto-fetch if id is undefined
  });
};

export const useGetChildrenTasks = (id: string) => {
  return useQuery({
    queryKey: ["task", id, "children"],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/${id}/children`);
      return res.data;
    },
    enabled: !!id,
  });
};
