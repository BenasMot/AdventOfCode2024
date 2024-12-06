import run from "aocrunner";
import { toTrimmedLines } from "../utils/toTrimmedLines.js";

type Coord = [number, number];

const coordsRight = (start: Coord): Coord[] => [
  start,
  [start[0] + 1, start[1]],
  [start[0] + 2, start[1]],
  [start[0] + 3, start[1]],
];
const coordsLeft = (start: Coord): Coord[] => [
  start,
  [start[0] - 1, start[1]],
  [start[0] - 2, start[1]],
  [start[0] - 3, start[1]],
];
const coordsUp = (start: Coord): Coord[] => [
  start,
  [start[0], start[1] - 1],
  [start[0], start[1] - 2],
  [start[0], start[1] - 3],
];
const coordsDown = (start: Coord): Coord[] => [
  start,
  [start[0], start[1] + 1],
  [start[0], start[1] + 2],
  [start[0], start[1] + 3],
];
const coordsUpRight = (start: Coord): Coord[] => [
  start,
  [start[0] + 1, start[1] - 1],
  [start[0] + 2, start[1] - 2],
  [start[0] + 3, start[1] - 3],
];
const coordsUpLeft = (start: Coord): Coord[] => [
  start,
  [start[0] - 1, start[1] - 1],
  [start[0] - 2, start[1] - 2],
  [start[0] - 3, start[1] - 3],
];
const coordsDownRight = (start: Coord): Coord[] => [
  start,
  [start[0] + 1, start[1] + 1],
  [start[0] + 2, start[1] + 2],
  [start[0] + 3, start[1] + 3],
];
const coordsDownLeft = (start: Coord): Coord[] => [
  start,
  [start[0] - 1, start[1] + 1],
  [start[0] - 2, start[1] + 2],
  [start[0] - 3, start[1] + 3],
];

const parseInput = (rawInput: string) =>
  toTrimmedLines(rawInput).map((line) => line.split(""));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const count = input.reduce((count, row, y, map) => {
    const rowCount = row.reduce((rowCount, cell, x) => {
      const matchers = [
        coordsUp,
        coordsDown,
        coordsLeft,
        coordsRight,
        coordsUpRight,
        coordsUpLeft,
        coordsDownLeft,
        coordsDownRight,
      ].map((fn) => fn([x, y]));
      const matches = matchers
        .map((matcher) => {
          const mathces = matcher.map(([x, y]) => map[y]?.[x]);
          const word = mathces.join("");
          return word === "XMAS";
        })
        .filter(Boolean);

      return rowCount + matches.length;
    }, 0);
    return count + rowCount;
  }, 0);

  return count.toString();
};

const xMatcher = (coord: Coord) => [
  [coord[0] - 1, coord[1] - 1],
  [coord[0] + 1, coord[1] - 1],
  coord,
  [coord[0] - 1, coord[1] + 1],
  [coord[0] + 1, coord[1] + 1],
];

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const count = input.reduce((count, row, y, map) => {
    const rowCount = row.reduce((rowCount, cell, x) => {
      const matchers = [xMatcher].map((fn) => fn([x, y]));
      const matches = matchers
        .map((matcher) => {
          const mathces = matcher.map(([x, y]) => map[y]?.[x]);
          const word = mathces.join("");
          // M M   M S   S S   S M
          //  A     A     A     A
          // S S   M S   M M   S M
          return ["MMASS", "MSAMS", "SSAMM", "SMASM"].includes(word);
        })
        .filter(Boolean);

      return rowCount + matches.length;
    }, 0);
    return count + rowCount;
  }, 0);

  return count.toString();
};

run({
  part1: {
    tests: [
      { input: "XMAS", expected: "1" },
      {
        input: `MMMSXXMASM
        MSAMXMSMSA
        AMXSXMAAMM
        MSAMASMSMX
        XMASAMXAMM
        XXAMMXXAMA
        SMSMSASXSS
        SAXAMASAAA
        MAMMMXMMMM
        MXMXAXMASX`,
        expected: "18",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
        MSAMXMSMSA
        AMXSXMAAMM
        MSAMASMSMX
        XMASAMXAMM
        XXAMMXXAMA
        SMSMSASXSS
        SAXAMASAAA
        MAMMMXMMMM
        MXMXAXMASX`,
        expected: "9",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
