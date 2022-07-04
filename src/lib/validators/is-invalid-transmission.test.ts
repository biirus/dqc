import { isInvalidTransmission } from "./is-invalid-transmission";

describe("isInvalidTransmission Validator", () => {
  it("should return a check error if the value is not listed in description", () => {
    expect(isInvalidTransmission("")).toEqual({
      error: "invalid-transmission",
    });

    expect(isInvalidTransmission("XXX")).toEqual({
      error: "invalid-transmission",
    });

    // invalid gears number
    expect(isInvalidTransmission("AV12")).toEqual({
      error: "invalid-transmission",
    });
    expect(isInvalidTransmission("AV1")).toEqual({
      error: "invalid-transmission",
    });

    // invalid type
    expect(isInvalidTransmission("AX3")).toEqual({
      error: "invalid-transmission",
    });
  });

  it('should return "null" if the value is listed in description', () => {
    expect(isInvalidTransmission("AV4")).toBeNull();
  });
});
