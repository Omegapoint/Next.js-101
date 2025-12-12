"use client";
import { use } from "react";
import Todo from "./Todo";

type Props = {
  todosPromise: Promise<Todo[]>;
  username: string;
};
export default function TodoList({ todosPromise, username }: Props) {
  const todos = use(todosPromise);
  return (
    <div className="flex-col gap-2">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} currentUser={username} />
      ))}
    </div>
  );
}
