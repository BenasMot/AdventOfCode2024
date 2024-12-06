import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const mulPattern = "mul\\((?<num1>\\d+),(?<num2>\\d+)\\)";
const doPattern = "(?<enable>do\\(\\))";
const dontPattern = "(?<disable>don't\\(\\))";

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const matcher = new RegExp(mulPattern, "g");
  const sum = [...input.matchAll(matcher)].reduce((sum, matchResult) => {
    const { num1, num2 } = matchResult.groups as Record<string, string>;
    return sum + parseInt(num1, 10) * parseInt(num2, 10);
  }, 0);
  return sum.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const matcher = new RegExp(`${mulPattern}|${doPattern}|${dontPattern}`, "g");
  const sum = [...input.matchAll(matcher)].reduce(
    ({ sum, enabled }, matchResult) => {
      const { num1, num2, enable, disable } = matchResult.groups as Record<
        string,
        string
      >;
      enable && (enabled = true);
      disable && (enabled = false);

      if (enable || disable || !enabled) {
        return { sum, enabled };
      }

      return { sum: sum + parseInt(num1, 10) * parseInt(num2, 10), enabled };
    },
    { sum: 0, enabled: true },
  );
  return sum.sum.toString();
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: "161",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: "48",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
