export function getButtons({ ctx }) {
  return [
    {
      type: 'callback',
      title: this._i18.t('bot.likesPlugin.disslike'),
      value: `disslike-`,
    },
    {
      type: 'callback',
      title: this._i18.t('bot.likesPlugin.like'),
      value: `like-`,
    },
  ];
}

export async function action({ event, ctx, bot }) {
  // TODO:
}
