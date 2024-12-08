import { stdin, stdout } from "node:process";
import * as readline from "node:readline";
import { CommandRegistry, CommandRegistryContract } from "./commandRegistry.js";

export class UIContract {
  /**
   * Prompt the user for a command
   */
  prompt() {
    throw new Error("Not implemented");
  }

  /**
   * Diisplay a message
   *
   * @param {string} message
   */
  print(message) {}

  /**
   * Display an error message
   *
   * @param {string} error
   */
  printError(error) {
    throw new Error("Not implemented");
  }

  /**
   * Close and release resources
   */
  close() {
    throw new Error("Not implemented");
  }

  /** start the command loop */
  start() {
    throw new Error("Not implemented");
  }
}

export class ConsoleUI extends UIContract {
  /**
   * @param {CommandRegistryContract} cmdRegistry
   */
  constructor(cmdRegistry) {
    super();

    /** @type {readline.Interface} */
    this.rl = readline.createInterface({
      input: stdin,
      output: stdout,
      prompt: "Enter command> ",
    });

    /** @type {CommandRegistryContract} */
    this.commands = cmdRegistry;
  }

  prompt() {
    this.rl.prompt();
  }

  print(message) {
    console.info(message);
  }

  printError(error) {
    console.error(error);
  }

  start() {
    this.rl.on("line", async (input) => {
      const [cmd, ...args] = input.trim().split(/\s+/);

      const handler = this.commands.getHandler(cmd);
      if (handler) {
        const [message, error] = await handler(args);
        if (message) {
          this.print(`  ${message}\n`);
        }
        if (error) {
          this.printError(`  ${error} \n`);
        }
      } else {
        this.printError(`\n  Unkown command\n`);
      }

      this.prompt();
    });

    this.rl.on("close", () => {
      process.exit(0);
    });

    this.prompt();
  }

  close() {
    this.rl.close();
  }
}
