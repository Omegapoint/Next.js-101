"use server";
export const handleServerAction = async () => {
  await fetch("http://localhost:3000/api/login", { method: "POST" });
};
