export async function getTodos(): Promise<Todo[]> {
  try {
    // These Todo items are fetched instantly from out own machines network
    const res = await fetch("http://localhost:8000/todos");
    const todos: Todo[] = await res.json();

    // Here we simulate a delay of 3 s to emultate some latency for loaders
    return new Promise((resolve) => setTimeout(() => resolve(todos), 3000));
  } catch (error) {
    throw new Error("Error occurred while fetching todos");
  }
}
export const getTodoById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:8000/todos/${id}`);
    const todo: Todo = await res.json();
    return todo;
  } catch (error) {
    throw new Error("Error occurred while fetching todos");
  }
};
