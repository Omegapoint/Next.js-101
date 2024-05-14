"use client";
import { useRouter } from "next/navigation";
import React, { MouseEventHandler } from "react";

export const LoginButton = () => {
  const router = useRouter();
  const handleLoginClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const res = await fetch("/api/login", { method: "POST" });

    if (res.ok) router.push("/");
  };
  return (
    <button className="p-2 rounded-sm bg-white" onClick={handleLoginClick}>
      LoginButton
    </button>
  );
};
