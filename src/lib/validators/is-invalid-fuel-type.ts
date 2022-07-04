import { CheckError } from "../../types";
import description from "../../data/description.json";

export const isInvalidFuelType = (value: string): CheckError | null => {
  if (!description.fuelType.includes(value)) {
    return { error: "invalid-fuel-type" };
  }

  return null;
};
