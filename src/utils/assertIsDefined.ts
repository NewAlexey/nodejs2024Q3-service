export function assertIsDefined(
  value: unknown,
  exception: new (...args: any[]) => Error,
  ...args: any[]
) {
  if (value === null || value === undefined) {
    throw new exception(...args);
  }
}
