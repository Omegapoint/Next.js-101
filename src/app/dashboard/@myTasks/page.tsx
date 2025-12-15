import TodoList from "@/components/TodoList";
import { getTodosByUsername } from "@/services/todosService";
import { getUsers } from "@/services/userService";
import { getUsername } from "@/utils/getUsername";

const MyTasksPage = () => {
  const username = getUsername();
  const todosPromise = getTodosByUsername(username);
  const users = getUsers();

  return (
    <TodoList
      todosPromise={todosPromise}
      username={username}
      usersPromise={users}
    />
  );
};

export default MyTasksPage;
