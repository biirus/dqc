import data from "../data/models.json";
import { FC, useEffect } from "react";
import { AsyncState, CheckResult, useCheck } from "../lib/hooks/use-check";

type Props = {
  total: number;
  onStateChange: (state: AsyncState) => void;
  onComplete: (result: CheckResult) => void;
};

export const ProgressBar: FC<Props> = (props) => {
  const { total, onStateChange, onComplete } = props;
  const { idx, checkState, startCheck, result } = useCheck();

  useEffect(() => {
    onStateChange(checkState);

    if (checkState === "complete") {
      onComplete(result);
    }
  }, [checkState, onComplete, onStateChange, result]);

  const progress = (idx / total) * 100;

  return (
    <div className="flex gap-4 max-w-[90vw] w-[640px]">
      <div className="relative flex h-14 items-center justify-center text-2xl tabular-nums rounded-lg overflow-hidden bg-white shadow-lg flex-1">
        <div
          className="absolute inset-0 text-white tabular-nums text-2xl flex items-center justify-center bg-gradient-to-r from-sky-400 to-purple-500"
          style={{
            clipPath: `inset(0px calc(${100 - progress}%) 0px 0px)`,
          }}
        >
          {progress.toFixed(2) + "%"}
        </div>

        {checkState === "idle" ? "Data validation" : progress.toFixed(2) + "%"}
      </div>

      <button
        className="relative h-14 px-4 py-2 text-sm font-medium text-white bg-purple-500 shadow-lg  rounded-md transition-all disabled:opacity-80 disabled:pointer-events-none active:shadow-none focus:outline-none focus:ring-2 focus:ring-sky-400"
        disabled={checkState === "pending"}
        type="button"
        onClick={() => startCheck(data)}
      >
        <span className={`${checkState === "pending" ? "opacity-0" : ""}`}>
          Check data
        </span>

        <span
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            checkState === "pending" ? "" : "opacity-0"
          }`}
        >
          Checking...
        </span>
      </button>
    </div>
  );
};
