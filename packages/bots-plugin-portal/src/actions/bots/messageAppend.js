export default async function messageAppend(params) {
  const { parent: data = {}, text, ctx } = params;
  this.ctx = this.ctx || ctx;

  data.text = data.text ? data.text + text : text;
  data.caption = data.caption ? data.caption + text : text;

  if (data.type === 'mediaGroup') {
    const { caption } = data.media[0];
    data.media[0].caption = caption ? caption + text : text;
  }
  return { res: true, data };
}
