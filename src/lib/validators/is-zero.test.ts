import { isZero } from "./is-zero";

describe("isZero Validator", () => {
  it("should return a check error if A is equal 0", () => {
    expect(isZero(0)).toEqual({ error: "zero" });
  });

  it('should return "null" if A is not equal 0', () => {
    expect(isZero(1)).toBeNull();
  });
});
