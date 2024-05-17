import TodoList from "@/components/TodoList";
import { getTodos } from "@/services/todosService";
import React from "react";

export const revalidate = 0;

const TodosListPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const todos = await getTodos();
  return <TodoList todos={todos} />;
};

export default TodosListPage;
