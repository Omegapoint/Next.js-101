export default async function fetchTodo(id: string) {
  const res = await fetch(`http://localhost:8000/todos/${id}`);

  if (!res.ok) return undefined;

  const todo: Todo = await res.json();

  return todo;
}
