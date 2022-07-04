import { CheckError } from "../../types";
import description from "../../data/description.json";

// assumtion:
// - model type is usually listed at the end of model value
// - model type is always 3 symbols
// - model type is splitted by a single space
export const isInvalidModel = (
  value: string | undefined
): CheckError | null => {
  const parts = String(value).split(" ");

  // doesn't have a model type
  if (parts.length < 2) {
    return null;
  }

  const modelType = parts.pop();

  // simple TS check
  if (!modelType) {
    return null;
  }

  // doesn't have a model type
  if (modelType.length > 3) {
    return null;
  }

  if (!description.model.includes(modelType)) {
    return { error: "invalid-model" };
  }

  return null;
};
