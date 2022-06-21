import type { CheckError } from "../../types";

export const isEmpty = <T>(value: T | undefined): CheckError | null => {
  if (!Boolean(value)) {
    return { error: "empty" };
  }

  return null;
};
