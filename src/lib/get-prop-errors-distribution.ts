import { DataPoint } from "../types";
import { CheckResult } from "./hooks/use-check";

export const getPropErrorsDistribution = (
  checkResult: CheckResult,
  prop: DataPoint
) => {
  const distribution = {
    valid: 0,
    empty: 0,
    mismatched: 0,
  };

  checkResult.forEach((rowResult) => {
    rowResult.forEach(([key, errors]) => {
      if (key !== prop) {
        return;
      }

      if (errors.length === 0) {
        distribution.valid += 1;
        return;
      }

      errors.forEach(({ error }) => {
        if (error === "empty") {
          distribution.empty += 1;
        } else {
          distribution.mismatched += 1;
        }
      });
    });
  });

  return distribution;
};
