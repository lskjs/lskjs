export function getFindParams(store) {
  return {
    search: store.search,
    filter: store.filter,
    sort: store.sort,
  };
}

export default getFindParams;
