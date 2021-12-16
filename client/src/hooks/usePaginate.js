/* eslint-disable no-unused-vars*/
const usePaginate = ({ totalPageLength, currentPage, changePageHandler, disabled }) => {
  const range = (start, end) => {
    const length = end - start + 1;

    return Array.from({ length }).map((_, index) => index + start);
  };

  const startPage = 1;
  const endPage = totalPageLength;

  const siblingCount = 1;
  const boundCount = 1;

  const startPages = range(startPage, boundCount);
  const endPages = range(
    Math.max(totalPageLength - boundCount + 1, boundCount + 1),
    totalPageLength
  );

  const siblingsStart = Math.max(
    Math.min(currentPage + 1 - siblingCount, totalPageLength - boundCount - siblingCount * 2 - 1),
    boundCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(currentPage + 1 + siblingCount, boundCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : endPage - 1
  );

  const itemList = [
    'prev',
    ...startPages,
    ...(siblingsStart > boundCount + 2
      ? ['start-ellipsis']
      : boundCount + 1 < totalPageLength - boundCount
      ? [boundCount + 1]
      : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < totalPageLength - boundCount - 1
      ? ['end-ellipsis']
      : totalPageLength - boundCount > boundCount
      ? [totalPageLength - boundCount]
      : []),
    ...endPages,
    'next',
  ];

  const items = itemList.map((item, i) =>
    typeof item === 'number'
      ? {
          key: i,
          onClick: () => changePageHandler(item - 1),
          disabled,
          selected: item - 1 === currentPage,
          item,
        }
      : {
          key: i,
          onClick: () => changePageHandler(item === 'next' ? currentPage + 1 : currentPage - 1),
          disabled:
            disabled ||
            item.includes('ellipsis') ||
            (item === 'next' ? currentPage >= totalPageLength - 1 : currentPage - 1 < 0),
          selected: false,
          item,
        }
  );

  return {
    items,
  };
};

export default usePaginate;
