"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { FaPlus } from "react-icons/fa";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      <span className="flex items-center gap-2">
        <FaPlus />
        Add todo
      </span>
    </button>
  );
};

export default SubmitButton;
