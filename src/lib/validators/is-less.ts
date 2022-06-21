export const isLess = <T = number>(a: T, b: T) => {
  if (a < b) {
    return { error: "less" };
  }

  return null;
};
