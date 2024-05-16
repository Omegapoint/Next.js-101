"use client";

import { useEffect, useRef } from "react";
import { SubmitButton } from "./SubmitButton";
import { createTodo } from "@/actions";
import { useFormState } from "react-dom";
import { toast } from "react-hot-toast";
import { FormState } from "@/types/todos";

const initialState: FormState = {
  message: "",
  status: 0,
};
const AddTodoServer = () => {
  const [formState, action] = useFormState(createTodo, initialState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.message) {
      if (formState.status == 200) {
        toast.success(formState.message);
      } else {
        toast.error(formState.message);
      }
      ref.current?.reset();
    }
  }, [formState.status, formState.message]);
  return (
    <form ref={ref} className="flex gap-2 items-center" action={action}>
      <input
        type="text"
        id="title"
        name="title"
        required
        className="text-2xl p-1 rounded-lg flex-grow w-full"
        placeholder="New Todo"
        autoFocus
      />
      <SubmitButton />
    </form>
  );
};

export default AddTodoServer;
