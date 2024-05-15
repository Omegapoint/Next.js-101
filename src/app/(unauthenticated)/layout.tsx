import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-gray-500 p-16">{children}</div>
    </main>
  );
}
