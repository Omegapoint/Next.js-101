import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo List",
};

export default function LoginLayout({
  children,
  todos,
}: {
  children: React.ReactNode;
  todos: React.ReactNode;
}) {
  return (
    <>
      {children}
      {todos}
    </>
  );
}
