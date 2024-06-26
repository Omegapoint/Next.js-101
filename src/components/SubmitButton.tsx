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
      className={`text-white ${
        pending
          ? "hover:bg-gray-700 bg-gray-700 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          : "hover:bg-blue-800 bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      }  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none`}
    >
      <span className="flex items-center gap-2">
        <FaPlus />
        {pending ? "Adding todo..." : "Add todo"}
      </span>
    </button>
  );
};

export default SubmitButton;
