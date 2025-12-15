import Paper from "@/components/Paper";
import Link from "next/link";

export default function DashboardLayout({
  children,
  myTasks,
}: {
  children: React.ReactNode;
  myTasks: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="flex gap-2">
        <Paper
          width="500px"
          height="500px"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 className="text-2xl">Your tasks</h2>
          {myTasks}
        </Paper>
        <Paper
          width="500px"
          height="500px"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link href="/todos" className="mt-4">
            <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Get your todos sorted
            </div>
          </Link>
        </Paper>
      </div>
    </>
  );
}
