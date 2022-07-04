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
