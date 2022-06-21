export type CheckError = {
  error: string;
};

export type DataRow = {
  make: string;
  model: string | number;
  vehicleClass: string;
  engine: number | string;
  cylinders: number | string;
  transmission: string;
  fuelType: string;
  fuelConsumptionCity: number;
  fuelConsumptionHwy: number;
  fuelConsumptionComb: number;
  fuelConsumptionCombMPG: number;
  co2: number;
};

export type DataPoint = keyof DataRow;
export type Data = DataRow[];

export type ValidatorFn = <T extends DataRow>(row: T) => CheckError | null;
export type Validators = Partial<Record<DataPoint, ValidatorFn[]>>;
