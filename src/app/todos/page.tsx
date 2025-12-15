import Link from "next/link";

const TodoListPage = () => {
  return (
    <>
      <h1>Todo List Page</h1>
      <Link href={"/add-server"}>Lägg till en todo</Link>
    </>
  );
};

export default TodoListPage;
