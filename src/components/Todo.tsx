"use client";

import { assignToMe } from "@/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function Todo({
  todo,
  currentUser,
}: {
  todo: Todo;
  currentUser: string;
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

  const handleAssignToMe = async () => {
    setIsFetching(true);

    const result = await assignToMe(todo.id);

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

  return (
    <article
      className="my-4 flex justify-between items-center w-full border border-black rounded-md p-4"
      style={{ opacity: !isMutating ? 1 : 0.7 }}
    >
      <label
        className={`text-2xl hover:underline ${
          todo.completed && "line-through"
        }`}
      >
        <Link href={`/edit/${todo.id}`}>{todo.title}</Link>
      </label>

      {!todo.assignedTo && (
        <button
          onClick={handleAssignToMe}
          disabled={isPending}
          className="p-3 text-xl max-w-xs hover:cursor-pointer hover:text-green-800"
        >
          Assign to me
        </button>
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
