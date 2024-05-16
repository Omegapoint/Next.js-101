"use client";

import React from "react";
import { SubmitButton } from "./SubmitButton";

const AddTodoServer = () => {
  /*   async function createInvoice(formData: FormData) {
    "use server";

    const rawFormData = {
      customerId: formData.get("customerId"),
      amount: formData.get("amount"),
      status: formData.get("status"),
    };
    console.log(rawFormData);
    // mutate data
    // revalidate cache
  } */
  return (
    <form className="flex gap-2 items-center">
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
