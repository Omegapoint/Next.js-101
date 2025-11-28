"use client";

import { createTodo } from "@/actions";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import SubmitButton from "./SubmitButton";

const initialState: FormState = {
  message: "",
  ok: false,
};
const AddTodoServer = () => {
  const [formState, action] = useActionState(createTodo, initialState);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.message) {
      if (formState.ok) {
        toast.success(formState.message);
        ref.current?.reset();
      } else {
        toast.error(formState.message);
      }
    }
  }, [formState]);
  return (
    <form ref={ref} className="flex gap-2 items-center" action={action}>
      <input
        type="text"
        id="title"
        name="title"
        required
        className="text-2xl p-1 rounded-lg flex-grow"
        placeholder="New Todo"
        autoFocus
      />

      <SubmitButton />
    </form>
  );
};

export default AddTodoServer;
