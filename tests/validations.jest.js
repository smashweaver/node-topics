//import { jest } from "@jest/globals";
import { schema, isSimpleMathExpression } from "../validations";

describe("Math Expression Schema", () => {
  test("validates correct simple expressions", () => {
    expect(isSimpleMathExpression("1+1")).toBe(true);
    expect(isSimpleMathExpression("2*3-4")).toBe(true);
    expect(isSimpleMathExpression("5.5/2.2")).toBe(true);
  });

  test("rejects invalid expressions", () => {
    //jest.spyOn(console, "error").mockImplementation(() => {});
    expect(isSimpleMathExpression("1+")).toBe(false);
    expect(isSimpleMathExpression("a+b")).toBe(false);
    expect(isSimpleMathExpression("1++1")).toBe(false);
  });

  test("schema throws error for invalid expressions", () => {
    //jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => schema.parse("1+")).toThrow();
    expect(() => schema.parse("a+b")).toThrow();
  });

  test("schema does not throw for valid expressions", () => {
    expect(() => schema.parse("1+1")).not.toThrow();
    expect(() => schema.parse("2*3-4")).not.toThrow();
  });
});
