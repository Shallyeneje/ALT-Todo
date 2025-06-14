// pages/TodoDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['todo', id],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
      if (!res.ok) throw new Error('Failed to fetch todo');
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todo</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <button className="text-blue-500 underline mb-4" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
      <p>Status: {data.completed ? 'Completed' : 'Incomplete'}</p>
    </div>
  );
}
