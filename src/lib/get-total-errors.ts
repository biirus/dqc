import { CheckResult } from "./hooks/use-check";

export const getTotalErrors = (checkResult: CheckResult) => {
  const totalErrors = checkResult.reduce((rowSum, result) => {
    const rowErrors = result.reduce((keySum, key) => {
      const [, keyResult] = key;

      return keySum + keyResult.length;
    }, 0);

    return rowSum + rowErrors;
  }, 0);

  return totalErrors;
};
