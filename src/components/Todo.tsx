"use client";

import { assignTodo } from "@/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEventHandler,
  MouseEvent,
  useState,
  useTransition,
} from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function Todo({
  todo,
  currentUser,
  users,
  editing,
}: {
  todo: Todo;
  currentUser: string;
  users: User[];
  editing?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isFetching || isPending;

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsFetching(true);

    const res = await fetch(`http://localhost:8000/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed,
      }),
    });

    await res.json();

    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data
      // from the server without losing
      // client-side browser or React state.
      router.refresh();
    });
  };

  const handleAssign = async (unassign: boolean, username?: string) => {
    setIsFetching(true);
    if (username === "") return;

    if (unassign) {
      const result = await assignTodo(todo.id, null);

      if (result.success) toast.success("You're unassigned to " + todo.title);
      else toast.error(result.error);
    } else {
      if (username) {
        const result = await assignTodo(todo.id, username);
        if (result.success) toast.success("You're assigned to " + todo.title);
        else toast.error(result.error);
      } else {
        toast.error("Must provide username if not unassigning");
      }
    }

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsFetching(true);

    const res = await fetch(`http://localhost:8000/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
      }),
    });

    await res.json();
    toast.success("Todo deleted");

    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data
      // from the server without losing
      // client-side browser or React state.
      router.refresh();
    });
  };

  const handleEdit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const todoTitle = formData.get("todoTitle");

    const res = await fetch(`http://localhost:8000/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todoTitle,
      }),
    });
    await res.json();
    toast.success("Todo deleted");

    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data
      // from the server without losing
      // client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <article
      className="my-4 flex justify-between items-center w-full border border-black rounded-md p-4"
      style={{ opacity: !isMutating ? 1 : 0.7 }}
    >
      <div className="flex flex-col gap-2">
        {editing ? (
          <form onSubmit={handleEdit}>
            <input name="todoTitle" defaultValue={todo.title} />
          </form>
        ) : (
          <label
            className={`text-2xl hover:underline ${
              todo.completed && "line-through"
            }`}
          >
            <Link href={`/edit/${todo.id}`}>{todo.title}</Link>
          </label>
        )}
        <label className={`text-xl opacity-80`}>{todo.assignedTo}</label>
      </div>

      {!todo.completed && (
        <>
          {!todo.assignedTo && (
            <select onChange={(e) => handleAssign(false, e.target.value)}>
              <option value={""}></option>
              {users.map((user) => (
                <option key={user.id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          )}
          {todo.assignedTo === currentUser && (
            <button
              onClick={() => handleAssign(true)}
              disabled={isPending}
              className="p-3 text-xl max-w-xs hover:cursor-pointer hover:text-green-800 "
            >
              Unassign
            </button>
          )}
        </>
      )}
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          id="completed"
          name="completed"
          onChange={handleChange}
          disabled={isPending}
          className="min-w-[2rem] min-h-[2rem]"
        />

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="p-3 text-xl max-w-xs hover:cursor-pointer hover:text-red-800"
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
}
