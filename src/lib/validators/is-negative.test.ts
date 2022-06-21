import { isNegative } from "./is-negative";

describe("isNegative Validator", () => {
  it("should return a check error if A less than 0", () => {
    expect(isNegative(-1)).toEqual({ error: "negative" });
  });

  it('should return "null" if A more or equal 0', () => {
    expect(isNegative(0)).toBeNull();
    expect(isNegative(3)).toBeNull();
  });
});
