import { randomUUID } from "crypto";
import { homedir } from "os";

export function getUsername() {
  const userHomeDir = homedir().split("/").pop();
  const userName = userHomeDir
    ? `${userHomeDir?.charAt(0).toUpperCase()}${userHomeDir?.slice(1)}`
    : "Guest" + randomUUID().slice(0, 4);
  return userName;
}
