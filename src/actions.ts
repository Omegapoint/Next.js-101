"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getRandomUUID } from "./utils/generateUUID";

export const createTodo = async (formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const title = formData.get("title");
  try {
    const res = await fetch("http://localhost:8000/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        title: title,
        completed: false,
        id: getRandomUUID(),
      }),
    });
    return await res.json();
  } catch (error) {
    throw new Error("Error occurred while posting todo");
  }
};

export const logOut = async () => {
  cookies().delete("authenticated");
  redirect("/login");
};
