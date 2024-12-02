import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((str) => str.trim())
    .reduce<[number[], number[]]>(
      ([left, right], line) => {
        const numbers = line.split("   ").map((num) => parseInt(num, 10));
        return [
          [...left, numbers[0]],
          [...right, numbers[1]],
        ];
      },
      [[], []],
    );

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);

  const [left, right] = lines.map((list) => list.sort());

  return left
    .reduce((sum, leftNumber, index) => {
      const rightNumber = right[index];
      return sum + Math.abs(leftNumber - rightNumber);
    }, 0)
    .toString();
};

const part2 = (rawInput: string) => {
  const [left, right] = parseInput(rawInput);

  return left
    .map((number) => number * right.filter((num) => num === number).length)
    .reduce((sum, curr) => (sum += curr), 0)
    .toString();
};

run({
  part1: {
    tests: [
      {
        input: `3   4
        4   3
        2   5
        1   3
        3   9
        3   3`,
        expected: "11",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
        4   3
        2   5
        1   3
        3   9
        3   3`,
        expected: "31",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
