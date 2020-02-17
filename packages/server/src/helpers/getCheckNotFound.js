export default ctx => {
  return function getCheckNotFound(data) {
    return (name = 'Object') => {
      if (!data) throw ctx.e(`${name} not found`, { status: 404 });
      return Promise.resolve(data);
    };
  };
};
