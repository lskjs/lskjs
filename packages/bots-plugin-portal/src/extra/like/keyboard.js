export default function ({ buttons = {} }) {
  const { message_id: messageId, chat } = this.bot.getMessage(this.ctx);
  const { like = {}, disslike = {} } = buttons;
  const titles = {
    disslike: `${disslike.title || '💔'} ${disslike.value || ''}`,
    like: `${like.title || '❤️'} ${like.value || ''}`,
  };
  return [
    {
      type: 'callback',
      title: titles.disslike,
      value: `/portal_like?type=disslike&msg=${messageId}&chat=${chat.id}`,
    },
    {
      type: 'callback',
      title: titles.like,
      value: `/portal_like?type=like&msg=${messageId}&chat=${chat.id}`,
    },
  ];
}
