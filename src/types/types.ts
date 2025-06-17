// types.ts

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  name: string;
  description: string | null;
  start: string | null;
  end: string | null;
  duration: number | null; // if it's in minutes/hours, otherwise string | null
  priority: TaskPriority;
  status: TaskStatus;
  archived: boolean;
  isDefault: boolean | null;
  parentId: string | null;
  children: string; // consider using: string[] if it's actually an array
  owner: string | null;
  tags: string | null;
  completedAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  updates ?: string ;
}