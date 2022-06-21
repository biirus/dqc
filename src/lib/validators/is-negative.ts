import { CheckError } from "../../types";

export const isNegative = (value: number): CheckError | null => {
  if (value < 0) {
    return { error: "negative" };
  }

  return null;
};
