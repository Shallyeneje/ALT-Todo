import ErrorBoundary from '../components/errorBoundary';
import TaskPlanner from '../components/taskplanner';
// import TodoList from '../features/todos/TodoList';

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Todo List</h1> */}
      <ErrorBoundary>
      <TaskPlanner/>
      </ErrorBoundary>
      {/* <TodoList /> */}
    </main>
  );
}
