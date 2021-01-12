export default () =>
  function resOk(data) {
    return this.pack(data, {
      code: 0,
    });
  };
