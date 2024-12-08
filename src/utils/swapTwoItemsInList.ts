export const swapTwoItemsInList = (
  list: any[],
  indexA: number,
  indexB: number,
) => {
  const newList = [...list];
  [newList[indexA], newList[indexB]] = [newList[indexB], newList[indexA]];
  return newList;
};
