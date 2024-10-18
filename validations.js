import { z } from "zod";

// Define a regular expression for simple math expressions
const regex = /^(\d+(\.\d+)?[\+\-\*\/])*\d+(\.\d+)?$/;

// Create a Zod schema for math expressions
export const schema = z.string().regex(regex, {
  message:
    "Invalid math expression. Use numbers and operators (+, -, *, /) only.",
});

// Function to validate a math expression
export function isSimpleMathExpression(expression) {
  try {
    schema.parse(expression);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.errors[0].message);
    }
    return false;
  }
}
