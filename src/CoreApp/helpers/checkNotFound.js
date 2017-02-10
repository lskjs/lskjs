export default (ctx) => {
  return function checkNotFound(data) {
    if (!data) throw ctx.errors.e404('Object not found');
    return Promise.resolve(data);
  };
};
