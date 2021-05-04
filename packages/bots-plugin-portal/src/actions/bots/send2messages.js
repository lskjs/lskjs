export default async function send2messages({ to1, to2, text1, text2 }) {
  const playbook = [
    {
      type: 'sendMessage',
      to: to1,
      text: text1,
    },
    {
      type: 'pause',
      value: 5000,
    },
    {
      type: 'sendMessage',
      to: to2,
      text: text2,
    },
  ];
  const result = await this.runAction(playbook);
  return { res: !!result, data: result };
}
