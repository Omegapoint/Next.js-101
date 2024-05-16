import { getTodos } from "@/services/todosService";
import React from "react";

const TodosListPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const todos = await getTodos();
  return (
    <ul>
      {todos.map((todo) => {
        return <li key={todo.id}>{todo.title}</li>;
      })}
    </ul>
  );
};

export default TodosListPage;
