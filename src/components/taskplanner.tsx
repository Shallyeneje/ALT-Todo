import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from "../api/data";
import type { Task, TaskPriority, TaskStatus } from "../types/types";
import TaskForm from "./tasksForm";
import { useNavigate } from "react-router-dom";
import PaginationContainer from "./pagination";
import { Search } from "lucide-react";

export default function TaskPlanner() {
  const [showModal, setShowModal] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate] = useState<string>(today);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [TasksPerPage, setTasksPerPage] = useState(10);
  // const TasksPerPage = useState(10);

  const [currentPage, setCurrentPage] = useState(1);
  const deleteTask = useDeleteTask();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  // const Task = Task?.students || [];

  // ✅ React Query hooks
  // const { data: tasks = [], isLoading } = useGetTasks();
  const { data: tasks = [], isLoading } = useGetTasks();
  console.log("Fetched tasks:", tasks);

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  // const FilTasks = Array.isArray(tasks) ? tasks : [];

  const toggleStatus = (task: Task) => {
    const nextStatus: TaskStatus =
      task.status === "TODO"
        ? "IN_PROGRESS"
        : task.status === "IN_PROGRESS"
        ? "DONE"
        : "TODO";

    if (nextStatus === "DONE") {
      toast("🎉 Congratulations on finishing this task");
    }

    if (task.id) {
      updateTask.mutate({ id: task.id, updates: { status: nextStatus } });
    }
  };

  const togglePriority = (task: Task) => {
    const nextPriority: TaskPriority =
      task.priority === "LOW"
        ? "MEDIUM"
        : task.priority === "MEDIUM"
        ? "HIGH"
        : "LOW";

    if (nextPriority === "HIGH") {
      toast("This task needs immediate attention");
    }

    if (task.id) {
      updateTask.mutate({ id: task.id, updates: { priority: nextPriority } });
    }
  };

  const handleDeleteSelected = () => {
    selectedTaskIds.forEach((id) => {
      deleteTask.mutate(id); // Use your hook here
    });

    setSelectedTaskIds([]);
    toast("🗑️ Selected task(s) deleted");
  };
  const filteredTasks = tasks.filter((task: Task) => {
    const fullName = `${task.name} `.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastTask = currentPage * TasksPerPage;
  const indexOfFirstTask = indexOfLastTask - TasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen text-white font-sans p-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-b-3xl text-center relative">
        <div className="flex justify-between items-center">
          <div className="text-[#0f172a] text-lg">
            <div className="text-left">
              <h3 className="text-xl ">Today</h3>
              {/* <p className="text-xs text-gray-400 ">{tasks.length} Tasks</p> */}
              <p className="text-xs text-gray-400 ">
                {filteredTasks.length} of {tasks.length} Tasks
              </p>
            </div>
          </div>
          <h2 className="text-lg font-semibold text-[#0f172a]">
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>

          <div className="text-[#0f172a] text-lg">
            {/* <Clock /> */}
            <Button
              onClick={() => setShowModal(true)}
              className="bg-[#cbd5e1] text-[#0f172a] text-sm px-[15px] py-[8px] rounded-[8px] font-medium border border-[#0f172a]"
            >
              Add New
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mx-auto mt-[8px] px-[10px]"></div>
      </div>

      {/* Task List */}
      <div className="space-y-[20px]">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">My Tasks</h3>

          <div className="relative max-w-md min-w-[100px] ml-[20px] ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[20px] w-[20px] text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              className="w-full px-[20px] py-[8px] rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400 placeholder-gray-500"
              placeholder="Search Student by name, ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Delete selected button moved to top */}
          {selectedTaskIds.length > 0 && (
            <Button
              className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded"
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete selected tasks?"
                );
                if (confirmDelete) {
                  handleDeleteSelected();
                }
              }}
            >
              Delete Selected
            </Button>
          )}
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : currentTasks.length > 0 ? (
          currentTasks.map((task: Task, idx: number) => {
            const isSelected = selectedTaskIds.includes(task.id || "");

            return (
              <div
                key={task.id || idx}
                className={`bg-[#cbd5e1] text-[#0f172a] rounded-lg p-[16px] flex justify-between items-start cursor-pointer hover:bg-[#bcd0df] ${
                  isSelected ? "ring-2 ring-red-500" : ""
                }`}
              >
                {/* Select checkbox */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    const id = task.id!;
                    setSelectedTaskIds((prev) =>
                      e.target.checked
                        ? [...prev, id]
                        : prev.filter((taskId) => taskId !== id)
                    );
                  }}
                  className="accent-red-500 w-5 h-5 mt-1 mr-3"
                />

                {/* Task name + description */}
                <div
                  className="flex-1"
                  onClick={() => navigate(`/tasks/${task.id}`)}
                >
                  <h4 className="text-base">{task.name}</h4>
                  {task.description && (
                    <p className="text-sm text-gray-600">{task.description}</p>
                  )}
                </div>

                {/* Status toggle */}
                <input
                  type="checkbox"
                  checked={task.status === "DONE"}
                  ref={(el) => {
                    if (el) el.indeterminate = task.status === "IN_PROGRESS";
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => toggleStatus(task)}
                  className="accent-blue-600 w-5 h-5 mt-1 ml-2"
                />
                {/* priority toggle */}
                <input
                  type="checkbox"
                  checked={task.priority === "HIGH"}
                  ref={(el) => {
                    if (el) el.indeterminate = task.priority === "MEDIUM";
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => togglePriority(task)}
                  className="accent-blue-600 w-5 h-5 mt-1 ml-2"
                />

                {/* Priority toggle — only editable if task.updated === true */}
                {task.updates ? (
                  <input
                    type="checkbox"
                    checked={task.priority === "HIGH"}
                    ref={(el) => {
                      if (el) el.indeterminate = task.priority === "MEDIUM";
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => togglePriority(task)}
                    className="accent-blue-600 w-5 h-5 mt-1 ml-4"
                  />
                ) : (
                  <span className="text-sm font-semibold text-purple-700 mt-1 ml-4">
                    Priority: {task.priority}
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-400">No tasks for this date.</p>
        )}

        <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          {/* Rows per page selection */}
          <div className="flex items-center gap-2">
            <span>rows per page</span>
            <select
              value={TasksPerPage}
              onChange={(e) => setTasksPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center whitespace-nowrap">
              page {currentPage} of{" "}
              {Math.ceil(filteredTasks.length / TasksPerPage)}
            </span>
            <PaginationContainer
              totalItems={filteredTasks.length}
              itemsPerPage={TasksPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "16px",
          }}
          // className="fixed inset-0  bg-black bg-opacity-30 flex items-center justify-center z-50 p-[16px]"
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              maxWidth: "28rem",
              width: "100%",
            }}
            // className="bg-white p-[24px] rounded shadow max-w-md w-full"
          >
            <TaskForm
              defaultDate={selectedDate}
              onSubmit={(newTask) => {
                console.log("Submitting new task:", newTask);
                createTask.mutate(newTask);
                setShowModal(false);
              }}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
