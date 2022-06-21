export type Fn = (...args: any[]) => unknown;
export type LastFnReturnType<T extends any[]> = ReturnType<T[0]>;

export const compose =
  <Branches extends Fn[] = Fn[]>(...fns: Branches) =>
  <T>(value: T) => {
    return fns.reduceRight(
      (result: unknown, fn) => fn(result),
      value
    ) as LastFnReturnType<Branches>;
  };
