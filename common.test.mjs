import assert from "node:assert";
import test from "node:test";

const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";

function cleanInput(inputValue, fieldName) {
  let cleanedValue = inputValue.trim().toUpperCase();

  if (cleanedValue.length === 0 || cleanedValue.length > 50) {
    return null;
  }

  for (let char of cleanedValue) {
    if (!allowedChars.includes(char)) {
      return null;
    }
  }

  return cleanedValue;
}

test("returns null for empty input", () => {
  const result = cleanInput("   ", "Title");
  assert.equal(result, null);
});


test("returns null for input lonmger than 50 characters", () => {
  const longInput = "A".repeat(51);
  const result = cleanInput(longInput, "Title");
  assert.equal(result, null);
});