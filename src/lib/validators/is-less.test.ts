import { isLess } from "./is-less";

describe("isLess Validator", () => {
  it("should return a check error if A less than B", () => {
    expect(isLess(1, 3)).toEqual({ error: "less" });
  });

  it('should return "null" if A more or equal B', () => {
    expect(isLess(1, 1)).toBeNull();
    expect(isLess(3, 1)).toBeNull();
  });
});
