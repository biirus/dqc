import { isInvalidModel } from "./is-invalid-model";

describe("isInvalidModel Validator", () => {
  it("should return a check error if the value has a model type and it's not listed in description", () => {
    expect(isInvalidModel("VERANO XXX")).toEqual({ error: "invalid-model" });
  });

  it('should return "null" if the value has a model type and it is listed in description or does not have a model type at all', () => {
    expect(isInvalidModel("does't a model type")).toBeNull();
    expect(isInvalidModel("VERANO")).toBeNull();
    // has a valid model type
    expect(isInvalidModel("VERANO AWD")).toBeNull();
  });
});
