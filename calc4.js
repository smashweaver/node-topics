const { useAsyncPrompt } = await import("./hooks/async_prompt.js");
const { isSimpleMathExpression } = await import("./utils/validations.js");

export async function calc() {
  const [prompt, close] = useAsyncPrompt();
  const getExpression = prompt.bind(null, "Enter your expression: ");

  while (true) {
    const expr = await getExpression();

    if (expr === "quit") {
      console.log("\ngoodbye!");
      break;
    }

    if (isSimpleMathExpression(expr)) {
      const value = eval(expr);
      console.log(`${value}`);
    } else {
      console.log(`Unable to process the expression: ${expr}`);
    }
  }

  close();
}

calc();
