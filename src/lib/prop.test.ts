import { prop } from "./prop";

describe("prop", () => {
  it("should return a property of an object", () => {
    const row = { a: 1, b: 2 };
    const getA = prop("a");

    expect(getA(row)).toEqual(1);
  });
});
