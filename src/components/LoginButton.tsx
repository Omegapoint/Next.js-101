"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginButton = () => {
  const [hasError, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const handleLoginClick = async () => {
    if (hasError) {
      setError(false);
    }
    const res = await fetch("/api/login", { method: "POST" });
    if (!res.ok) {
      const responseJson = await res.json();
      setErrorMessage(responseJson.error);
      setError(true);
    } else {
      router.push("/");
    }
  };
  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleLoginClick}
      >
        Login
      </button>
      {hasError && (
        <div>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
    </>
  );
};
