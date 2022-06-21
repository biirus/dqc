import { CheckError } from "../../types";

export const isZero = (value: number): CheckError | null => {
  if (value === 0) {
    return { error: "zero" };
  }

  return null;
};
