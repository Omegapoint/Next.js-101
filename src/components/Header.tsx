import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="flex">
      <Link href="/" className="p-4">
        Home
      </Link>
      <Link href="/add-client" className="p-4">
        Add Client
      </Link>
      <Link href="/add-server" className="p-4">
        Add Server
      </Link>
      <Link href="/todo-list" className="p-4">
        Todo List
      </Link>
    </nav>
  );
};

export default Header;
