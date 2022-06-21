import { isNotEqual } from "./is-not-equal";

describe("isNotEqual Validator", () => {
  it("should return a check error if A is not equal B", () => {
    expect(isNotEqual(1, 2)).toEqual({ error: "not-equal" });
    expect(isNotEqual("hey", "ho")).toEqual({ error: "not-equal" });
  });

  it('should return "null" if A is equal B', () => {
    expect(isNotEqual(1, 1)).toBeNull();
    expect(isNotEqual("hey", "hey")).toBeNull();
  });
});
