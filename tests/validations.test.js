import test from "node:test";
import assert from "node:assert";
import { schema, isSimpleMathExpression } from "../utils/validations.js";

test("Math Expression Schema", async (t) => {
  await t.test("validates correct simple expressions", (t) => {
    assert.strictEqual(isSimpleMathExpression("1+1"), true);
    assert.strictEqual(isSimpleMathExpression("2*3-4"), true);
    assert.strictEqual(isSimpleMathExpression("5.5/2.2"), true);
  });

  await t.test("rejects invalid expressions", (t) => {
    assert.strictEqual(isSimpleMathExpression("1+"), false);
    assert.strictEqual(isSimpleMathExpression("a+b"), false);
    assert.strictEqual(isSimpleMathExpression("1++1"), false);
  });

  await t.test("schema throws error for invalid expressions", (t) => {
    assert.throws(() => schema.parse("1+"));
    assert.throws(() => schema.parse("a+b"));
  });

  await t.test("schema does not throw for valid expressions", (t) => {
    assert.doesNotThrow(() => schema.parse("1+1"));
    assert.doesNotThrow(() => schema.parse("2*3-4"));
  });
});
