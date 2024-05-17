import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="mt-4" style={{ fontSize: "32px" }}>
        Welcome authenticated=true!
      </h1>
      <h2 className="mt-4" style={{ fontSize: "24px" }}>
        This is the todo-app
      </h2>
      <Link href="/todos" className="mt-4">
        <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Get your todos sorted
        </div>
      </Link>
    </>
  );
}
