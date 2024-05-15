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
      <h2>Press this button for very secure login</h2>
      <button className="p-2 rounded-sm bg-white" onClick={handleLoginClick}>
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
