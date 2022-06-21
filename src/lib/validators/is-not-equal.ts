import { CheckError } from "../../types";

export const isNotEqual = <T = number>(a: T, b: T): CheckError | null => {
  if (a !== b) {
    return { error: "not-equal" };
  }

  return null;
};
