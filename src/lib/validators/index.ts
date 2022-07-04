import { Validators } from "../../types";
import { compose } from "../compose";
import { converge } from "../converge";
import { prop } from "../prop";
import { isEmpty } from "./is-empty";
import { isLess } from "./is-less";
import { isNegative } from "./is-negative";
import { isNotEqual } from "./is-not-equal";
import { isZero } from "./is-zero";

import { isInvalidFuelType } from "./is-invalid-fuel-type";
import { isInvalidTransmission } from "./is-invalid-transmission";
import { isInvalidModel } from "./is-invalid-model";
import { roundToFirstDecimal } from "../round-to-decimal";

const mpgToL100 = (value: number) => {
  // according to Google
  // 235.215/(1 US mpg) = 235.215 L/100km

  // however, according to the data this coefficient = 280 🤷
  return roundToFirstDecimal(280 / value); // round to first decimal place;
};

export const validators: Validators = {
  make: [compose(isEmpty, prop("make"))],

  model: [
    compose(isInvalidModel, prop("model")),
    compose(isEmpty, prop("model")),
  ],

  vehicleClass: [compose(isEmpty, prop("vehicleClass"))],

  engine: [
    compose(isNegative, prop("engine")),
    compose(isZero, prop("engine")),
    compose(isEmpty, prop("engine")),
  ],

  cylinders: [
    compose(isNegative, prop("cylinders")),
    compose(isZero, prop("cylinders")),
    compose(isEmpty, prop("cylinders")),
  ],

  fuelType: [
    compose(isInvalidFuelType, prop("fuelType")),
    compose(isEmpty, prop("fuelType")),
  ],

  transmission: [
    compose(isInvalidTransmission, prop("transmission")),
    compose(isEmpty, prop("transmission")),
  ],

  // by a general logic a city fuel consumtion should be >= than hwy or comb
  fuelConsumptionCity: [
    // city consumption is less than combined
    converge(isLess, [
      prop("fuelConsumptionCity"),
      prop("fuelConsumptionComb"),
    ]),
    // city consumption is less than hwy
    converge(isLess, [prop("fuelConsumptionCity"), prop("fuelConsumptionHwy")]),
    // city consumption is negative
    compose(isNegative, prop("fuelConsumptionCity")),
    // city consumption is zero
    compose(isZero, prop("fuelConsumptionCity")),
    // city consumption is empty
    compose(isEmpty, prop("fuelConsumptionCity")),
  ],

  fuelConsumptionHwy: [
    // city consumption is negative
    compose(isNegative, prop("fuelConsumptionHwy")),
    // city consumption is zero
    compose(isZero, prop("fuelConsumptionHwy")),
    // city consumption is empty
    compose(isEmpty, prop("fuelConsumptionHwy")),
  ],

  // by a general logic a comb fuel consumtion should be >= than hwy
  fuelConsumptionComb: [
    // city consumption is less than combined
    converge(isLess, [
      prop("fuelConsumptionCity"),
      prop("fuelConsumptionComb"),
    ]),
    // city consumption is less than hwy
    converge(isLess, [prop("fuelConsumptionCity"), prop("fuelConsumptionHwy")]),
    // city consumption is negative
    compose(isNegative, prop("fuelConsumptionCity")),
    // city consumption is zero
    compose(isZero, prop("fuelConsumptionCity")),
    // city consumption is empty
    compose(isEmpty, prop("fuelConsumptionCity")),
  ],

  fuelConsumptionCombMPG: [
    // MPG is not the same as L/100
    converge(isNotEqual, [
      prop("fuelConsumptionComb"),
      compose(mpgToL100, prop("fuelConsumptionCombMPG")),
    ]),

    // city consumption is negative
    compose(isNegative, prop("fuelConsumptionCombMPG")),
    // city consumption is zero
    compose(isZero, prop("fuelConsumptionCombMPG")),
    // city consumption is empty
    compose(isEmpty, prop("fuelConsumptionCombMPG")),
  ],

  co2: [
    compose(isNegative, prop("co2")),
    compose(isZero, prop("co2")),
    compose(isEmpty, prop("co2")),
  ],
};
