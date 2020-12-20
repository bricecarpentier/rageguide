export class InvalidValueError extends Error {
  constructor(key: string, value: string) {
    super(`${value} is not a suitable value for ${key}`);
  }
}

export class ValueOutOfBoundsError extends Error {
  constructor(key: string, value: string, bounds: [string, string]) {
    const msg = `${value} does not fit the bounds for ${key} (${bounds[0]}, ${bounds[1]})`;
    super(msg);
  }
}
