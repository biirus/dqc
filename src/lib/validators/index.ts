import { Validators } from "../../types";
import { compose } from "../compose";
import { converge } from "../converge";
import { prop } from "../prop";
import { isEmpty } from "./is-empty";
import { isLess } from "./is-less";
import { isNegative } from "./is-negative";
import { isNotEqual } from "./is-not-equal";
import { isZero } from "./is-zero";

import data from "../../data/models.json";

// const isMakeEmpty = compose(isEmpty, prop("make"));

const mpgToL100 = (value: number) => {
  // according to Google
  // 235.215/(1 US mpg) = 235.215 L/100km

  // however, according to the data this coefficient = 280 🤷
  return Math.round((280 / value) * 10) / 10; // round to first decimal place;
};

export const validators: Validators = {
  make: [compose(isEmpty, prop("make"))],

  model: [compose(isEmpty, prop("model"))],

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

export const run = () => {
  let x = 0;
  data.forEach((row) => {
    if (row.cylinders > 12) {
      console.log(row);
    }
    Object.entries(validators).forEach(([key, list]) => {
      const result = list.map((fn) => fn(row)).filter(Boolean);

      if (result.length > 0) {
        x += 1;
        // console.log(row.model, key, result);
      }
    });
  });

  console.log(x);
};

//  "make": "ASTON MARTIN",
//     "model": "RAPIDE",
//     "vehicleClass": "SUBCOMPACT",
//     "engine": 5.9,
//     "cylinders": 12,
//     "transmission": "A6",
//     "fuelType": "Z",
//     "fuelConsumptionCity": 18,
//     "fuelConsumptionHwy": 12.6,
//     "fuelConsumptionComb": 15.6,
//     "fuelConsumptionCombMGP": 18,
//     "co2": 359
