export default function ({ text }) {
  if (!text) text = '@{{username}}';
  const title = text.replace(/{{\w*}}/g, (key) => this.ctx.from[key.slice(2, -2)]);

  return [
    {
      type: 'callback',
      title,
      value: `/portal_answer?id=${this.ctx.from.id}`,
    },
  ];
}
