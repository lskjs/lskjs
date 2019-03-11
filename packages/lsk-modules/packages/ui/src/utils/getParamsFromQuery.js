function parse(json) {
  try {
    return JSON.parse(json);
  } catch (err) {
    return null;
  }
}

export default function getParamsFromQuery(query = {}, defaultParams = {}) {
  const params = {};
  if (query.filter && parse(query.filter)) params.filter = parse(query.filter);
  if (query.sort && parse(query.sort)) params.sort = parse(query.sort);
  if (query.sortBy) params.sortBy = query.sortBy;
  if (query.search) params.search = query.search;
  if (+query.skip) params.skip = +query.skip;
  if (+query.limit) params.limit = +query.limit;
  return {
    ...defaultParams,
    ...params,
  };
}
