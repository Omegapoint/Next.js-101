"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const createTodo = async (data: Todo) => {
  try {
    await fetch("http://localhost:8000/todos", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw new Error("Error occurred while posting todo");
  }
  revalidatePath("/add-server");
};

export const logOut = async () => {
  cookies().delete("authenticated");
  redirect("/login");
};
