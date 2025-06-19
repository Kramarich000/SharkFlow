export default function TaskCard({ task }) {
  return (
    <div className="w-full p-4 rounded-xl border border-gray-300 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      )}
      <div className="mt-2 flex justify-between text-sm text-gray-500">
        <p>Статус: {task.status}</p>
        <p>Приоритет: {task.priority}</p>
      </div>
      {task.dueDate && (
        <p className="text-sm mt-1 text-right">
          До: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
