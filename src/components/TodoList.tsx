import { use } from "react";
import Todo from "./Todo";

type Props = {
  todosPromise: Promise<Todo[]>;
  username: string;
  usersPromise: Promise<User[]>;
};
export default function TodoList({
  todosPromise,
  username,
  usersPromise,
}: Props) {
  const todos = use(todosPromise);
  const users = use(usersPromise);
  return (
    <div className="flex-col gap-2">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} currentUser={username} users={users} />
      ))}
    </div>
  );
}
