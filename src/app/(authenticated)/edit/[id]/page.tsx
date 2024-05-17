import Todo from "@/components/Todo";
import { getTodoById } from "@/services/todosService";
import { redirect } from "next/navigation";

export const revalidate = 0;

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params: { id } }: Props) {
  const todo = await getTodoById(id);

  if (!todo) redirect("/");

  return <Todo {...todo} />;
}
