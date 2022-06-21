import description from "../../data/description.json";

import { CheckError } from "../../types";

export const pickModel = (value: string) => {
  // the last "word" in a model value means a model type
  const parts = value.split(" ");
  const hasModelType = parts.length > 1;

  return hasModelType ? parts.pop() : undefined;
};

export const isModelMissing = (value: string): CheckError | null => {
  // check the model type
  const model = pickModel(value);

  if (model && !description.model.includes(model)) {
    return { error: "missing" };
  }

  return null;
};
