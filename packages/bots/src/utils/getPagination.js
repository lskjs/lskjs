import range from 'lodash/range';

// «
// »
export function getPages({ page = 1, max = 10, size = 5 } = {}) {
  const half = Math.floor(size / 2);
  let offset = page - half;
  if (offset >= size + half) offset -= half; // TODO: чтото в этом роде, не дотестировал
  if (offset < 1) offset = 1;
  const pages = range(size)
    .slice(0, max)
    .map((p) => p + offset);

  if (pages[0] > 1) pages[0] = 1;
  const last = pages.length - 1;
  if (pages[last] < max) pages[last] = max;
  // if (pages[0] < 1) pages = range(1, size);
  // pages = pages.slice(0, size + 1);

  return pages;
}
export function getPagination(initProps = {}) {
  const {
    first = (page) => `« ${page}`,
    last = (page) => `${page} »`,
    current = (page) => `- ${page} -`,
    ...props
  } = initProps;

  const { page: currentPage, max } = props;

  const pages = getPages(props);
  if (pages.length <= 1) return [];
  return pages.map((page) => ({
    page,
    text: page === currentPage ? current(page) : page === 1 ? first(page) : page === max ? last(page) : page.toString(),
  }));
}

export default getPagination;
