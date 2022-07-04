import { useCallback, useState } from "react";
import { CheckError, Data } from "../../types";
import { nonNullable } from "../guards";
import { validators } from "../validators";

export type KeyCheckResult = [key: string, errors: CheckError[]];
export type RowCheckResult = KeyCheckResult[];
export type CheckResult = RowCheckResult[];
export type AsyncState = "idle" | "pending" | "complete";

export const useCheck = () => {
  const [idx, setIdx] = useState(0);
  const [checkState, setCheckState] = useState<AsyncState>("idle");
  const [result, setResult] = useState<CheckResult>([]);

  const startCheck = useCallback((data: Data) => {
    const run = (idx: number, checkResult: CheckResult = []) => {
      setCheckState("pending");

      const row = data[idx];

      if (idx > data.length - 1) {
        setIdx(idx);
        setResult(checkResult);
        setCheckState("complete");

        return null;
      }

      // do not block the Main Thread
      // would be even better to use Web Workers
      //
      // or I could leave it as is -> a simple synchronous check
      // but it would froze a UI for some time (depends on a user's device)
      return setTimeout(() => {
        const rowResult = Object.entries(validators).map(([key, list]) => {
          const keyResult = list.map((fn) => fn(row)).filter(nonNullable);

          return [key, keyResult] as KeyCheckResult;
        });

        checkResult.push(rowResult);
        setIdx(idx);

        // recursively check next row
        run(idx + 1, checkResult);
      });
    };

    run(0, []);
  }, []);

  return {
    idx,
    result,
    checkState,
    startCheck,
  };
};
