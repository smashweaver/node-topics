import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline";
import { PromptContract } from "../contracts/promptContract.js";

export class ConsolePrompt extends PromptContract {
  constructor() {
    super();
    this.handlers = new Map();
    this.rl = readline.createInterface({ input, output });
  }

  /**
   * @param {string} command
   * @param {Function} handler
   */
  on(command, handler) {
    this.handlers.set(command, handler);
  }

  start() {
    this.rl.setPrompt("Enter command: ");
    this.rl.prompt();

    this.rl.on("line", (input) => {
      const [cmd, ...args] = input.trim().split(/\s+/);

      const handler = this.handlers.get(cmd);
      if (handler) {
        handler(args);
      } else {
        console.log("\n  Unknown command. Type ? for help\n");
      }

      this.rl.prompt();
    });

    this.rl.on("close", () => {
      console.log("\n  Goodbye!\n");
      process.exit(0);
    });
  }

  close() {
    this.rl.close();
  }
}
