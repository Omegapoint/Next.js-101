import TodoList from "@/components/TodoList";
import { getTodos } from "@/services/todosService";
import { getUsers } from "@/services/userService";
import { getUsername } from "@/utils/getUsername";

export const revalidate = 0;

const TodosListPage = () => {
  const todos = getTodos(); // Intentionally not awaited
  const username = getUsername();
  const users = getUsers();
  return (
    <TodoList todosPromise={todos} username={username} usersPromise={users} />
  );
};

export default TodosListPage;
