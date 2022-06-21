import { compose } from "./compose";

describe("compose", () => {
  it("should return a result of a functions composition", () => {
    const inc = (a: number) => a + 1;
    const double = (a: number) => a * 2;
    const calculate = compose(inc, double);

    expect(calculate(2)).toEqual(5);

    const map = (list: string[]) => list.map((row) => parseInt(row, 10));
    const reduce = (nums: number[]) => nums.reduce((sum, num) => sum + num);
    const sum = compose(reduce, map);

    expect(sum(["1", "2"])).toEqual(3);
  });
});
