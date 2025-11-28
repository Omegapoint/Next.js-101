"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINK = "p-4 hover:underline";
const ACTIVE_LINK = "text-blue-500 underline";

const Header = () => {
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-baseline px-16">
      <nav className="inline-flex">
        <Link
          href="/"
          className={`${LINK} ${pathname === "/" ? ACTIVE_LINK : ""}`}
        >
          Home
        </Link>
        <Link
          href="/add-client"
          className={`${LINK} ${pathname === "/add-client" ? ACTIVE_LINK : ""}`}
        >
          Add from Client
        </Link>
        <Link
          href="/add-server"
          className={`${LINK} ${pathname === "/add-server" ? ACTIVE_LINK : ""}`}
        >
          Add from Server
        </Link>
        <Link
          href="/todos"
          className={`${LINK} ${pathname === "/todos" ? ACTIVE_LINK : ""}`}
        >
          Todo List
        </Link>
      </nav>
    </div>
  );
};

export default Header;
