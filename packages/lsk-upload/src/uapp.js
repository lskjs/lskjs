export default (ctx) => {
  return {
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
