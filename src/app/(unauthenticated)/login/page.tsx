import { LoginButton } from "@/components/LoginButton";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <h1 className="text-lg">Welcome to Kompetensdag!</h1>
      <LoginButton />
    </div>
  );
};

export default LoginPage;
