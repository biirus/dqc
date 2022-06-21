import { converge } from "./converge";
import { prop } from "./prop";

describe("converge", () => {
  it("should return a result of a functions convergation", () => {
    const row = { a: 1, b: 2 };

    const sum = (a: number, b: number) => a + b;
    const calculate = converge(sum, [prop("a"), prop("b")]);

    expect(calculate(row)).toEqual(3);
  });
});
