
export default (ctx) => {
  return function err(err) {
    if (!err) {
      err = {
        code: 1,
        message: 'Неизвестная ошибка',
      };
    }
    if (typeof err === 'string') {
      err = {
        code: 1,
        message: err,
      };
    }
    if (!err.code) {
      err.code = 1;
    }
    if (this.statusCode < 400) {
      this.status(500);
    }
    return this.pack(null, err);
  };
};
