import { FC } from "react";
import { getPropErrorsDistribution } from "../lib/get-prop-errors-distribution";
import { CheckResult } from "../lib/hooks/use-check";
import { DataPoint } from "../types";

type Props = {
  total: number;
  prop: DataPoint;
  result: CheckResult;
};

export const PropErrosDistribution: FC<Props> = (props) => {
  const distribution = getPropErrorsDistribution(props.result, props.prop);

  return (
    <div>
      Valid: {distribution.valid}
      Empty: {distribution.empty}
      Mismatched: {distribution.mismatched}
    </div>
  );
};
