import { Todo } from "@/types/todos";

export const getTodos = async () => {
  try {
    const res = await fetch("http://localhost:8000/todos");
    const todos: Todo[] = await res.json();
    return todos;
  } catch (error) {
    throw new Error(error as string);
  }
};
