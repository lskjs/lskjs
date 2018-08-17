export default (ctx) => {
  return function getCheckNotFound(data) {
    return (name = 'Object') => {
      if (!data) throw ctx.errors.e404(name + ' not found');
      return Promise.resolve(data);
    }
  };
};