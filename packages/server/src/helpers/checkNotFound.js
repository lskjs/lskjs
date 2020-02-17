export default ctx => {
  return function checkNotFound(data) {
    if (!data) throw ctx.e('Object not found', { status: 404 });
    return Promise.resolve(data);
  };
};
