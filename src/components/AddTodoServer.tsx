"use client";

import React, { ChangeEvent, useActionState, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { createTodo } from "@/actions";
const initialState = {
  message: "",
};
const AddTodoServer = () => {
  //const [state, formAction] = useActionState(createTodo, initialState);

  /*   const [inputValue, setInputValue] = useState<string>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setInputValue(name);
  }; */
  return (
    <form className="flex gap-2 items-center" action={createTodo}>
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
