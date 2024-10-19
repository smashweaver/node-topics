import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline";
import { promisify } from "node:util";
import { isSimpleMathExpression } from "./utils/validations.js";

async function calc() {
  const rl = readline.createInterface({ input, output });
  const question = promisify(rl.question).bind(rl);

  while (true) {
    const expr = await question("Enter your expression: ");

    if (expr === "quit") {
      console.log("goodbye!");
      break;
    }

    if (isSimpleMathExpression(expr)) {
      const value = eval(expr);
      console.log(`${value}`);
    } else {
      console.log(`Unable to process the expression: ${expr}`);
    }
  }

  rl.close();
}

calc();
