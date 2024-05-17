export const getTodos = async () => {
  try {
    const res = await fetch("http://localhost:8000/todos");
    const todos: Todo[] = await res.json();
    return todos;
  } catch (error) {
    throw new Error("Error occurred while fetching todos");
  }
};
export const getTodoById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:8000/todos/${id}`);
    const todo: Todo = await res.json();
    return todo;
  } catch (error) {
    throw new Error("Error occurred while fetching todos");
  }
};
