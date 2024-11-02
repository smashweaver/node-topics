import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline";
import { promisify } from "node:util";

export function usePrompt(promptText = "Enter something") {
  const rl = readline.createInterface({ input, output });
  const onLine = (callback) => rl.on("line", callback);
  const close = () => {
    rl.close();
    setTimeout(() => process.exit(0), 200);
  };
  const prompt = () => {
    rl.setPrompt(`${promptText}: `);
    rl.prompt();
  };

  return { prompt, close, onLine };
}
