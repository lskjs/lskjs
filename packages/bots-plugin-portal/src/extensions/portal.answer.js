export function getButtons({ ctx }) {
  const { username, id: fromId, first_name: firstName, last_name: lastName } = ctx.from;
  const name = `${firstName} ${lastName}${username ? ` @${username}` : ''}`;

  return [
    {
      type: 'callback',
      title: this._i18.t('bot.portalPlugin.rules.answer', { name }),
      value: `portal-toId-${fromId}`,
    },
  ];
}

export async function action({ event, ctx, bot }) {
  // TODO:
}
