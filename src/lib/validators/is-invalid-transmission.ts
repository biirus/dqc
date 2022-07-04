import { CheckError } from "../../types";
import description from "../../data/description.json";

export const isInvalidTransmission = (value: string): CheckError | null => {
  const gears = parseInt(value.replace(/\D/g, ""), 10);

  if (gears < 3 || gears > 8) {
    return { error: "invalid-transmission" };
  }

  const type = value.replace(gears.toString(), "");

  if (!description.transmition.includes(type)) {
    return { error: "invalid-transmission" };
  }

  return null;
};
