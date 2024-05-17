import { LoginButton } from "@/components/LoginButton";

const LoginPage = () => {
  return (
    <div className="bg-gray-200 p-16">
      <div className="flex flex-col gap-4 justify-center items-center h-full">
        <h1 className="text-lg">Welcome to Next 101!</h1>
        <h2>Press this button for very secure login</h2>
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
