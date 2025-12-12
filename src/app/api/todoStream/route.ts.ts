export const GET = async () => {
  try {
    // These Todo items are fetched instantly from out own machines network
    const res = await fetch("http://localhost:8000/todos");
    const todos: Todo[] = await res.json();

    // Here we simulate a stream that returns a todo item
    // per second then return that as a promise array to our BFF server
    const promiseResult: Promise<Todo[]> = Promise.all(
      todos.map(async (todo, index) => {
        return new Promise((resolve) =>
          setTimeout(() => resolve(todo), index * 300)
        );
      })
    );
    return promiseResult;

    // TODO: Implement streaming response
  } catch (error) {
    throw new Error("Error occurred while fetching todos");
  }
};
