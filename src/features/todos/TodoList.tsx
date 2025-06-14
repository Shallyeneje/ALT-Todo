import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchTodos } from '../../api/todo';
import type { Todo} from '../../types/types';



export default function TodoList() {
  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedTodos = todos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  return (
    <div>
      <ul className="space-y-2">
        {paginatedTodos.map((todo: Todo)=> (
          <li key={todo.id} className="p-4 border rounded bg-white shadow">
            <p className="font-semibold">{todo.title}</p>
            <p className="text-sm">{todo.completed ? '✅ Completed' : '❌ Incomplete'}</p>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="mt-4 flex gap-2">
        {Array.from({ length: Math.ceil(todos.length / ITEMS_PER_PAGE) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
