import { stdin, stdout, exit } from "node:process";

stdin.on("data", (chunk) => {
  const input = chunk.toString().trim();

  if (input === "quit") {
    exit(0);
  }

  try {
    const value = eval(input);
    console.log(`${value}`);
    stdout.write("Enter your expression: ");
  } catch (ex) {
    console.log(`Unable to process the expression: ${input}`);
  }

  stdout.write("Enter your expression: ");
});

stdout.write("Enter your expression: ");
