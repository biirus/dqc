export const prop =
  <K extends string>(name: K) =>
  <T>(value: Record<K, T>) => {
    return value[name];
  };
