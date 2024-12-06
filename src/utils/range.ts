export const range = (from: number, to: number) =>
  Array(to - from)
    .fill(from)
    .map((n, i) => n + i);
