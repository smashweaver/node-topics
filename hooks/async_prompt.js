import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline";
import { promisify } from "node:util";

export function useAsyncPrompt() {
  const rl = readline.createInterface({ input, output });
  const question = promisify(rl.question).bind(rl);
  const close = () => rl.close();

  return [question, close];
}
