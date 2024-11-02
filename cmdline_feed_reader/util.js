import { platform } from "node:process";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export async function open(url) {
  const command = getOpenCommand(url);
  await execAsync(command);
}

function getOpenCommand(url) {
  switch (platform) {
    case "win32":
      return `start ${url}`;
    case "darwin":
      return `open ${url}`;
    default:
      return `xdg-open ${url}`;
  }
}
