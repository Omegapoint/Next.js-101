import { getUsername } from "@/utils/getUsername";
import Link from "next/link";

export default function Home() {
  const username = getUsername();
  return (
    <>
      <h1 className="mt-4" style={{ fontSize: "32px" }}>
        Welcome {username} to Next.js 101!
      </h1>
      <Link href={"/dashboard"}>Go to dashboard</Link>
    </>
  );
}
