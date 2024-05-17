"use client";
import { logOut } from "@/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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
      <button
        type="submit"
        className="h-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={async () => {
          await logOut();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
