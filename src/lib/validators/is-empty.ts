import type { CheckError } from "../../types";

export const isEmpty = <T>(value: T | undefined): CheckError | null => {
  const checkError = { error: "empty" };

  if (typeof value === "undefined") {
    return checkError;
  }

  if (typeof value === "string" && value.length === 0) {
    return checkError;
  }

  if (Array.isArray(value) && value.length === 0) {
    return checkError;
  }

  return null;
};
