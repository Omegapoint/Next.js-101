import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startpage",
};

export default function Layout({
  children,
  todos,
}: Readonly<{
  children: React.ReactNode;
  todos: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center p-24">
        {children}
        {todos}
      </main>
    </>
  );
}
