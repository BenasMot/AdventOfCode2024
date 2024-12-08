import run from "aocrunner";
import { getMiddleItem } from "../utils/getMiddleItem.js";
import { parseInt10 } from "../utils/parseInt10.js";
import { swapTwoItemsInList } from "../utils/swapTwoItemsInList.js";
import { sum } from "../utils/toSum.js";
import { toTrimmedLines } from "../utils/toTrimmedLines.js";

const parseInput = (rawInput: string) => {
  const [rules, pages] = rawInput.split("\n\n");
  return {
    rules: toTrimmedLines(rules).map((row) => row.split("|").map(parseInt10)),
    pages: toTrimmedLines(pages).map((row) => row.split(",").map(parseInt10)),
  };
};

const part1 = (rawInput: string) => {
  const { rules, pages } = parseInput(rawInput);

  const ruleCheckers = rules.map((rule) => {
    const checker = (list: number[]): boolean => {
      const pagesToCheck = list.filter((i) => rule.includes(i));
      return pagesToCheck.length !== 2 || pagesToCheck.join() === rule.join();
    };
    return checker;
  });

  return pages
    .filter((row) => ruleCheckers.every((checker) => checker(row)))
    .map(getMiddleItem)
    .reduce(sum, 0)
    .toString();
};

const part2 = (rawInput: string) => {
  const { rules, pages } = parseInput(rawInput);

  const ruleCheckers = rules.map((rule) => {
    const checker = (list: number[]): boolean => {
      const pagesToCheck = list.filter((i) => rule.includes(i));
      return pagesToCheck.length !== 2 || pagesToCheck.join() === rule.join();
    };
    return { rule, checker };
  });

  const badPages = pages.filter(
    (row) => !ruleCheckers.every(({ checker }) => checker(row)),
  );

  const fixedPages = badPages.map((row) => {
    let rowCopy = [...row];

    const rowIsCorrected = (row: number[]) =>
      ruleCheckers.every(({ checker }) => checker(row));

    while (!rowIsCorrected(rowCopy)) {
      ruleCheckers.forEach(({ rule, checker }) => {
        if (!checker(rowCopy)) {
          const [indexA, indexB] = rule.map((num) => rowCopy.indexOf(num));
          rowCopy = swapTwoItemsInList(rowCopy, indexA, indexB);
        }
      });
    }

    return rowCopy;
  });

  return fixedPages.map(getMiddleItem).reduce(sum, 0).toString();
};

run({
  part1: {
    tests: [
      {
        input: `47|53
        97|13
        97|61
        97|47
        75|29
        61|13
        75|53
        29|13
        97|29
        53|29
        61|53
        97|53
        61|29
        47|13
        75|47
        97|75
        47|61
        75|61
        47|29
        75|13
        53|13

        75,47,61,53,29
        97,61,53,29,13
        75,29,13
        75,97,47,61,53
        61,13,29
        97,13,75,29,47`,
        expected: "143",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
        97|13
        97|61
        97|47
        75|29
        61|13
        75|53
        29|13
        97|29
        53|29
        61|53
        97|53
        61|29
        47|13
        75|47
        97|75
        47|61
        75|61
        47|29
        75|13
        53|13

        75,47,61,53,29
        97,61,53,29,13
        75,29,13
        75,97,47,61,53
        61,13,29
        97,13,75,29,47`,
        expected: "123",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
