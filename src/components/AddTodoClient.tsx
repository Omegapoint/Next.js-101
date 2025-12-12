"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { ToastLoader } from "./ToastLoader";

const initState: Partial<Todo> = {
  title: "",
  completed: false,
};

export default function AddTodoClient() {
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState(initState);
  const isMutating = isFetching || isPending;
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, completed } = data;
    const generatedID = crypto.randomUUID();
    setError("");
    setIsFetching(true);

    // TODO: Här sker anropet rakt mot DB, det borde göras via en next-route för att undvika CORS

    const res = new Promise<Response>((resolve) =>
      setTimeout(() => {
        fetch("http://localhost:8000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            completed: completed,
            id: generatedID,
          }),
        }).then((res) => resolve(res));
      }, 3000)
    );

    await toast.promise(res, {
      error: "Something went wrong",
      success: "Todo added",
      loading: <ToastLoader loadingMessage="Lägger till todo" />,
    });
    if ((await res).ok) {
      setData(initState);
      router.refresh();
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
  if (error) {
    return <p className="text-red-500 mt-4">{error}</p>;
  }
  return (
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
}
