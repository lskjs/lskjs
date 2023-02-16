export function getButtons({ ctx }) {
  const { username, id: fromId, first_name: firstName, last_name: lastName } = ctx.from;
  const name = `${firstName} ${lastName}${username ? ` @${username}` : ''}`;
  const value = username ? `https://t.me/${username}` : `tg://user?id=${fromId}`;

  return [
    {
      type: 'url',
      title: name,
      value,
    },
  ];
}

export async function action({ event, ctx, bot }) {
  // TODO:
}
