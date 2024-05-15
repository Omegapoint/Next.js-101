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
    if (res.ok) {
      router.push("/");
    } else {
      const responseJson = await res.json();
      setErrorMessage(responseJson.error);
      setError(true);
    }
  };
  return (
    <>
      <button className="p-2 rounded-sm bg-white" onClick={handleLoginClick}>
        LoginButton
      </button>
      {hasError && (
        <div>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
    </>
  );
};
