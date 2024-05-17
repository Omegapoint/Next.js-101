import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add from client",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
