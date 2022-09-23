export const firstOne = <T>(input: T | T[]): T | undefined => {
  if (Array.isArray(input)) {
    return input.length ? input[0] : undefined
  }
  return input
}
