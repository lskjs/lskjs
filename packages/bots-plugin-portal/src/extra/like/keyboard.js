export default function ({ buttons = [] }) {
  const { message_id: messageId, chat } = this.bot.getMessage(this.ctx);
  return [
    {
      type: 'callback',
      title: buttons[0] || '💔',
      value: `/portal_like?type=disslike&msg=${messageId}&chat=${chat.id}`,
    },
    {
      type: 'callback',
      title: buttons[1] || '❤️',
      value: `/portal_like?type=like&msg=${messageId}&chat=${chat.id}`,
    },
  ];
}
