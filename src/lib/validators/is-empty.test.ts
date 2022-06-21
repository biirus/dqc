import { isEmpty } from "./is-empty";

describe("isEmpty Validator", () => {
  it("should return a check error if the value is empty", () => {
    expect(isEmpty("")).toEqual({ error: "empty" });
    expect(isEmpty(undefined)).toEqual({ error: "empty" });
    expect(isEmpty([])).toEqual({ error: "empty" });
  });

  it('should return "null" if the value is not empty', () => {
    expect(isEmpty(0)).toBeNull();
    expect(isEmpty("not empty")).toBeNull();
    expect(isEmpty([null])).toBeNull();
  });
});
