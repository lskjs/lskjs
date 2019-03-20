export default (ctx) => {
  return {
    async uploadFile(file) {
      const body = new FormData();  // eslint-disable-line
      body.append('file', file);
      const res = await ctx.api.fetch('/api/module/upload', {
        method: 'POST',
        headers: {
          'Content-Type': '!',
        },
        body,
      });
      return res.data;
    },
    async uploadImage(body) {
      const res = await ctx.api.fetch('/api/module/upload', {
        method: 'POST',
        headers: {
          'Content-Type': '!',
        },
        body,
      });
      return res.data;
    },
  };
};
