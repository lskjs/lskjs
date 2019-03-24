
export default ctx => function ok(data) {
  return this.pack(data, {
    code: 0,
    message: 'ok',
  });
};
