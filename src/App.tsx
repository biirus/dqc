import "./App.css";
import data from "./data/models.json";
import { useCallback, useState } from "react";
import { DataPoint } from "./types";

import { getTotalErrors } from "./lib/get-total-errors";
import { getPropErrorsDistribution } from "./lib/get-prop-errors-distribution";
import { ProgressBar } from "./components/ProgressBar";
import { PropSelect } from "./components/PropSelect";

import { AsyncState, CheckResult } from "./lib/hooks/use-check";
import { Statistics } from "./components/Statistics";

const TOTAL = data.length;

function App() {
  const [prop, setProp] = useState<DataPoint>("model");
  const [checkState, setCheckState] = useState<AsyncState>("idle");
  const [checkResult, setCheckResult] = useState<CheckResult>([]);

  const totalErrors = getTotalErrors(checkResult);
  const dist = getPropErrorsDistribution(checkResult, prop);

  const handleCheckComplete = useCallback((result: CheckResult) => {
    setCheckResult(result);
  }, []);

  return (
    <>
      <ProgressBar
        total={TOTAL}
        onStateChange={setCheckState}
        onComplete={handleCheckComplete}
      />

      <div
        className={`flex flex-col gap-4 scroll-p-4 overflow-auto bg-white rounded-xl shadow-md transition-all max-w-[90vw] w-[640px] ${
          checkState === "complete" ? "h-[80vh]" : "h-0"
        }`}
      >
        <div className="m-4">
          <div>Total rows scanned: {TOTAL}</div>
          <div>Total errors: {totalErrors}</div>
        </div>

        <div className="flex flex-col gap-2 items-baseline justify-between m-4 md:flex-row">
          <div>Select property to get a detailed info</div>
          <PropSelect selected={prop} onChange={setProp} />
        </div>

        <div className="m-4 flex flex-col gap-2">
          {Object.entries(dist).map(([key, value]) => (
            <div
              key={key}
              className="relative h-14  rounded-lg overflow-hidden  bg-gray-200 flex-1"
            >
              <div
                className={`tabular-nums transition-all whitespace-nowrap ${
                  key === "valid"
                    ? "bg-green-400"
                    : key === "mismatched"
                    ? "bg-orange-400"
                    : "bg-red-400"
                }`}
                style={{ width: (value / TOTAL) * 100 + "%" }}
              >
                <div className="px-4 py-2">
                  <span className="capitalize">{key}</span>: {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="m-4">
          <Statistics prop={prop} total={TOTAL} />
        </div>
      </div>
    </>
  );
}

export default App;
