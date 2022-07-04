import { FC } from "react";
import { getSortedByProp } from "../lib/get-sorted-by-prop";
import { roundToFirstDecimal } from "../lib/round-to-decimal";
import { DataPoint } from "../types";

type Props = {
  prop: DataPoint;
  total: number;
};

export const Statistics: FC<Props> = (props) => {
  const { prop, total } = props;

  const sorted = getSortedByProp(prop);
  const propsToRender = Array.from({ length: 3 }).map((_, idx) => idx);

  let rest = 100;

  return (
    <table className="w-full text-left border-collapse z-10">
      <thead>
        <tr>
          <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
            <div className="py-2 pr-2 border-b border-slate-200 dark:border-slate-400/20">
              Value
            </div>
          </th>
          <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
            <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
              Stats
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="align-baseline">
        {propsToRender.map((_, idx) => {
          const [value, propTotal] = sorted[idx];
          const percentage = roundToFirstDecimal((propTotal / total) * 100);

          rest -= percentage;

          return (
            <tr key={value}>
              <td
                translate="no"
                className="py-2 pr-2 font-mono font-medium text-xs leading-6 whitespace-nowrap"
              >
                {value}
              </td>
              <td
                translate="no"
                className="py-2 pl-2 font-mono text-xs leading-6 text-purple-600 whitespace-pre "
              >
                {percentage + "%"}
              </td>
            </tr>
          );
        })}

        <tr>
          <td
            translate="no"
            className="py-2 pr-2 font-mono font-medium text-xs leading-6 whitespace-nowrap"
          >
            Rest
          </td>
          <td
            translate="no"
            className="py-2 pl-2 font-mono text-xs leading-6 text-purple-600 whitespace-pre "
          >
            {roundToFirstDecimal(rest) + "%"}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
