export default function (ctx) { // eslint-disable-line
  return {
    allParams() {
      const params = {};
      Object.assign(params, this.params);
      Object.assign(params, this.body);
      Object.assign(params, this.query);

      return params;
    },
  };
}
