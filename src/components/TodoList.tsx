import Todo from "./Todo";

export default async function TodoList({ todos }: { todos: Todo[] }) {
  const sortedTodos = todos.reverse();

  return (
    <div className="flex-col gap-2">
      {sortedTodos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
}
