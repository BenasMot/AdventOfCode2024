export const toTrimmedLines = (input: string) =>
  input.split("\n").map((row) => row.trim());
