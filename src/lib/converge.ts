import { prop } from "./prop";

export type Fn = (...args: any[]) => unknown;

export const converge =
  <TResult, Branches extends Fn[] = Fn[]>(
    convergeFunction: (...args: any[]) => TResult,
    branches: Branches
  ) =>
  <T>(value: T) => {
    const values = branches.map((func) => func(value));
    return convergeFunction(...values);
  };

const isLess = <T = number>(a: T, b: T) => a < b;
const getA = prop("a");
const getB = prop("b");

const value = { a: 1, b: 3 };

const isALessB = converge(isLess, [getA, getB]);

const i = isALessB(value);
console.log(i);
