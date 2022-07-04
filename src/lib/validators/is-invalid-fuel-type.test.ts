import { isInvalidFuelType } from "./is-invalid-fuel-type";

describe("isInvalidFuelType Validator", () => {
  it("should return a check error if the value is not listed in description", () => {
    expect(isInvalidFuelType("")).toEqual({ error: "invalid-fuel-type" });
    expect(isInvalidFuelType("XXX")).toEqual({
      error: "invalid-fuel-type",
    });
  });

  it('should return "null" if the value is listed in description', () => {
    expect(isInvalidFuelType("X")).toBeNull();
  });
});
