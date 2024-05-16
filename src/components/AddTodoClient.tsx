"use client";

import { useState, useTransition, FormEvent, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { getRandomUUID } from "@/utils/generateUUID";
import { FaPlus } from "react-icons/fa";

const initState: Partial<Todo> = {
  userId: 1,
  title: "",
  completed: false,
};

export default function AddTodoClient() {
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState(initState);
  const isMutating = isFetching || isPending;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, userId, completed } = data;
    const generatedID = getRandomUUID();
    setError("");
    setIsFetching(true);

    const res = await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        userId: userId,
        completed: completed,
        id: generatedID,
      }),
    });
    if (res.ok) {
      toast.success("Todo added");
    } else {
      setError("We encountered an error during creating the todo");
      setIsFetching(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  const content = (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center "
      style={{ opacity: !isMutating ? 1 : 0.7 }}
    >
      <input
        type="text"
        id="title"
        name="title"
        value={data.title}
        onChange={handleChange}
        className="text-2xl p-1 rounded-lg flex-grow"
        placeholder="New Todo"
        autoFocus
      />
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        <span className="flex items-center gap-2">
          <FaPlus />
          Add todo
        </span>
      </button>
    </form>
  );

  return (
    <>
      {content} {error && <p className="text-red-500 mt-4">{error}</p>}
    </>
  );
}
