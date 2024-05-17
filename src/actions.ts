"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getRandomUUID } from "./utils/generateUUID";
import { revalidatePath } from "next/cache";

export const createTodo = async (formState: FormState, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const title = formData.get("title");
  const currentToastId = getRandomUUID();
  try {
    await fetch("http://localhost:8000/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: 1,
        title: title,
        completed: false,
        id: currentToastId,
      }),
    });
    formState = {
      message: "Toast created for " + title,
      ok: true,
    };
  } catch (error) {
    formState = {
      message: "Todo failed for " + title,
      ok: false,
    };
  }
  revalidatePath("/add-server");
  revalidatePath("/todos");
  return formState;
};

export const logOut = async () => {
  cookies().delete("authenticated");
  redirect("/login");
};
