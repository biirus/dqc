export const isLess = <T = number>(a: T, b: T) => {
  if (a < b) {
    return { error: "isLess" };
  }

  return null;
};
