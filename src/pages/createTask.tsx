import {  ArrowLeftIcon, Clock10Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";

const CreateTask = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [month] = useState("June 2025"); // static for now

  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-white p-4 font-sans max-w-sm mx-auto shadow rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <ArrowLeftIcon className="text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-800">Create Task</h2>
        <Clock10Icon className="text-gray-700 rotate-45" />
      </div>

      {/* Calendar */}
      <div className="bg-gray-200 p-[20px] rounded-md mb-[16px] text-center">
        <p className=" block mx-auto p-[5px] text-[20px] bg-[#0f172a] w-1/5 font-medium text-[#fff] mb-2">{month}</p>
        <div className="grid grid-cols-7 gap-[10px]">
          {dates.map((day) => (
            <div
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm cursor-pointer ${
                selectedDate === day
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      
      {/* Input Fields */}
      <input
        type="Task text"
        placeholder="Name"
        className="w-11/12 border border-gray-300 rounded-md p-[8px] mb-[12px] text-sm placeholder-gray-400"
      />
      <textarea
        placeholder="Task Description..."
        rows={3}
        className="w-11/12 border border-gray-300 rounded-md p-[8px] mb-[16px] text-sm placeholder-gray-400"
      />

      {/* Submit Button */}
      <Button className="block w-1/3 bg-[#0f172a]  text-accent mx-auto py-[10px] rounded-md text-sm font-semibold">
        Create Task
      </Button>
    </div>
  );
};

export default CreateTask;
