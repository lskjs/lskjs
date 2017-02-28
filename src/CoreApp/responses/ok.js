
export default (ctx) => {
  return function ok(data) {
    // console.log('ok', data);
    const info = {
      code: 0,
      message: 'ok',
    };
    return this.pack(data, info);
  };
};
