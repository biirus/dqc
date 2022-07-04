import data from "../data/models.json";
import { DataPoint } from "../types";

export const getSortedByProp = (prop: DataPoint) => {
  const propMap = data.reduce((acc, row) => {
    const key = row[prop];

    if (!acc[key]) {
      acc[key] = 0;
    }

    acc[key] += 1;

    return acc;
  }, {} as Record<string, number>);

  const sorted = Object.entries(propMap).sort(([, totalA], [, totalB]) => {
    return totalB - totalA;
  });

  return sorted;
};
