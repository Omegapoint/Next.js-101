export default async function fetchTodos() {
  const res = await fetch(`http://localhost:8000/todos`);

  const todos: Todo[] = await res.json();

  return todos;
}
