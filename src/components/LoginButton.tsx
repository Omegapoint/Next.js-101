"use client";
import { redirect } from "next/navigation";
import React, { MouseEventHandler } from "react";

export const LoginButton = () => {
  const handleLoginClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const res = await fetch("/api/login", { method: "POST" });
    console.log(res);
    if (res.ok) redirect("/");
  };
  return (
    <button className="p-2 rounded-sm bg-white" onClick={handleLoginClick}>
      LoginButton
    </button>
  );
};
