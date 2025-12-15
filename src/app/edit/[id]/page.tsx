import Todo from "@/components/Todo";
import { getTodoById } from "@/services/todosService";
import { getUsers } from "@/services/userService";
import { getUsername } from "@/utils/getUsername";
import { redirect } from "next/navigation";

export const revalidate = 0;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function page({ params }: Props) {
  const { id } = await params;
  const todo = await getTodoById(id);
  const users = await getUsers();
  const username = getUsername();

  if (!todo) redirect("/");

  return <Todo todo={todo} currentUser={username} users={users} editing />;
}
