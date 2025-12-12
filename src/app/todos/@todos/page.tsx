import TodoList from "@/components/TodoList";
import { getTodos } from "@/services/todosService";
import { getUsername } from "@/utils/getUsername";

export const revalidate = 0;

const TodosListPage = () => {
  const todos = getTodos(); // Intentionally not awaited
  const username = getUsername();
  return <TodoList todosPromise={todos} username={username} />;
};

export default TodosListPage;
