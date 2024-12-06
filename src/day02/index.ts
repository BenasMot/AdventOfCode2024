import run from "aocrunner";
import { range } from "../utils/range.js";

const allIncreasing = (arr: number[]) => arr.join("") === arr.sort().join("");
const allDecreasing = (arr: number[]) =>
  arr.join("") === arr.sort((a, b) => b - a).join("");

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((row) =>
    row
      .trim()
      .split(" ")
      .map((num) => parseInt(num, 10)),
  );

const isSafeRow = (row: number[], allowBadLevel = false): boolean => {
  let isSafe = true;
  let sign = Math.sign(row[0] - row[1]);

  for (let i = 0; i < row.length - 1; i++) {
    const diff = row[i] - row[i + 1];

    const sameSign = Math.sign(diff) === sign;
    const goodSize = Math.abs(diff) >= 1 && Math.abs(diff) <= 3;
    isSafe = sameSign && goodSize;

    if (!isSafe) {
      if (allowBadLevel) {
        isSafe = range(0, row.length).some((index) =>
          isSafeRow(row.toSpliced(index, 1)),
        );

        if (!isSafe) {
          break;
        }
      } else {
        break;
      }
    }
  }

  return isSafe;
};

const part1 = (rawInput: string) => {
  const goodFloors = parseInput(rawInput).filter((row) => isSafeRow(row));

  return goodFloors.length.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).filter((row) => isSafeRow(row, true));

  return input.length.toString();
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
        1 2 7 8 9
        9 7 6 2 1
        1 3 2 4 5
        8 6 4 4 1
        1 3 6 7 9`,
        expected: "2",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
          1 2 7 8 9
          9 7 6 2 1
          1 3 2 4 5
          8 6 4 4 1
          1 3 6 7 9`,
        expected: "4",
      },
      {
        input: `69 70 69 66 63 60 58
        61 62 60 59 58 55 54 57
        69 70 67 64 63 61 61
        29 31 30 27 26 25 22 18
        63 65 62 59 57 54 47
        31 33 32 33 31 29
        94 95 92 89 91 94`,
        expected: "1",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
