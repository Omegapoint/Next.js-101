"use server";

import { getRandomUUID } from "./utils/generateUUID";

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
      message: "Todo created for " + title,
      ok: true,
    };
  } catch (error) {
    formState = {
      message: "Todo failed for " + title,
      ok: false,
    };
  }
  return formState;
};
