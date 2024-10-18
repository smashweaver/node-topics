import { stdin as input, stdout as output, exit } from "node:process";
import * as readline from "node:readline";
import { promisify } from "node:util";

async function calc() {
  const rl = readline.createInterface({ input, output });
  const question = promisify(rl.question).bind(rl);

  while (true) {
    const expr = await question("Enter your expression: ");

    if (expr === "quit") {
      console.log("goodbye!");
      break;
    }

    try {
      const value = eval(expr);
      console.log(`${value}`);
    } catch (ex) {
      console.log(`Unable to process the expression: ${expr}`);
    }
  }

  rl.close();
}

calc();
