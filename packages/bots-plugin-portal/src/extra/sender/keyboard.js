export default function ({ text }) {
  if (!text) text = '@{{username}}';

  const { username, id } = this.ctx.from;

  const title = text.replace(/{{\w*}}/g, (key) => this.ctx.from[key.slice(2, -2)]);
  const value = username ? `https://t.me/${username}` : `tg://user?id=${id}`;

  return [
    {
      type: 'url',
      title,
      value,
    },
  ];
}
