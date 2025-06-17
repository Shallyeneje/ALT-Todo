import { Clock, Menu } from "lucide-react";

const activities = [
  { icon: "💡", name: "Idea", tasks: 12 },
  { icon: "🍔", name: "Food", tasks: 9 },
  { icon: "🗂️", name: "Work", tasks: 14 },
  { icon: "🏋️‍♂️", name: "Sport", tasks: 5 },
];

const dates = [
  { date: "14", day: "Mon", active: true },
  { date: "15", day: "Tue", active: false },
  { date: "16", day: "Wed", active: false },
  { date: "17", day: "Thu", active: false },
];

export default function CreateTaskCategory() {
  return (
    <div className="min-h-screen bg-white px-[16px] py-[24px] font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-[24px]">
        <Menu className="text-black" />
        <h1 className="text-lg font-semibold">Create Task</h1>
        <Clock className="text-black" />
      </div>

      {/* Date Selector */}
      <div className="flex justify-between space-x-[4px] mb-[24px]">
        {dates.map(({ date, day, active }, idx) => (
          <div
            key={idx}
            className={`rounded-lg px-[16px] py-[8px] text-center w-[60px] ${
              active
                ? "bg-purple-500 text-white"
                : "bg-[#cbd5e1] text-black"
            }`}
          >
            <div className="text-md font-bold">{date}</div>
            <div className="text-xs">{day}</div>
          </div>
        ))}
      </div>

      {/* Activity Section */}
      <h2 className="text-lg font-semibold mb-[16px]">Choose Activity</h2>

      <div className="space-y-[16px]">
        {activities.map((act, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-[#cbd5e1] text-black p-[16px] rounded-xl shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{act.icon}</div>
              <div>
                <p className="text-sm font-medium">{act.name}</p>
                <p className="text-xs text-gray-600">{act.tasks} Tasks</p>
              </div>
            </div>
            <span className="text-xl">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}
