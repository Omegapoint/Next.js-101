"use server";

import { randomUUID } from "crypto";

export const createTodo = async (formState: FormState, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const title = formData.get("title");
  const currentToastId = randomUUID();
  try {
    await fetch("http://localhost:8000/todos", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        completed: false,
        id: currentToastId,
      }),
    });
    formState = {
      message: `${title} added to the todo list`,
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

export const assignTodo = async (
  todoId: string,
  assignTo: string | null
): Promise<{ success: boolean; error: any }> => {
  let result: { success: boolean; error: any } = {
    success: true,
    error: undefined,
  };
  try {
    await fetch(`http://localhost:8000/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignedTo: assignTo,
      }),
    });
    result = { success: true, error: undefined };
  } catch (error) {
    if (error instanceof Error)
      result = { success: false, error: error.message };
  }
  return result;
};
