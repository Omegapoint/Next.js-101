export async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch("http://localhost:8000/users");
    const users: User[] = await res.json();

    return users;
  } catch (error) {
    throw new Error("Error occurred while fetching users");
  }
}
