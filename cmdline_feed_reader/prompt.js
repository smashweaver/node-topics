import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline";
import { promisify } from "node:util";

export function usePrompt(promptText = "Enter something") {
  const rl = readline.createInterface({ input, output });
  const question = promisify(rl.question).bind(rl);
  const prompt = question.bind(null, `${promptText}: `);
  const close = () => rl.close();

  return [prompt, close];
}
