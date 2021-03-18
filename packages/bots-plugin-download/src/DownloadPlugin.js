import BaseBotPlugin from '@lskjs/bots-plugin';
import get from 'lodash/get';
// import extract from '@lskjs/extract';

export default class LikesPlugin extends BaseBotPlugin {
  providers = ['telegram'];
  // TODO: add i18
  _i18 = {
    t: (key, params = {}) => {
      const { count = '' } = params;
      const table = {
        bot: {
          likesPlugin: {
            like: `❤️ ${count}`,
            disslike: `💔 ${count}`,
          },
        },
      };
      return get(table, key, key);
    },
  };

  checkMatches(arr) {
    if (Array.isArray(arr)) {
      if (arr[9] && arr[9].length === 11) return arr[9];
      if (arr[7] && arr[7].length === 11) return arr[7];
    }
    return false;
  }
  getYoutubeIdFromUrl(url = '') {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??((.*v=([^#\&\?]*))|([^#\&\?]*))/; // eslint-disable-line
    const match = url.trim().match(regExp);
    return this.checkMatches(match);
  }

  getRoutes() {
    return [
      {
        path: '/youtube',
        action: async ({ ctx, req, bot }) => {
          await ctx.reply('Скинь ссылку на видео на youtube');
          return ctx.nextRedirect({
            path: '/youtube-getVideo',
          });
        },
      },
      {
        path: '/youtube-getVideo',
        action: async ({ ctx, req, bot }) => {
          const url = bot.getMessageText(ctx);
          const videoId = this.getYoutubeIdFromUrl(url);
          if (!videoId) return;
          const imageUrl = `https://i.ytimg.com/vi/${videoId}/hq720.jpg`;
          await ctx.replyWithPhoto(imageUrl);
        },
      },
    ];
  }
}
