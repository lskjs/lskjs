import Markup from 'telegraf/markup';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import Bluebird from 'bluebird';
import Router from '../utils/Router';
import BaseBotPlugin from './BaseBotPlugin';

export class MenuBotPlugin extends BaseBotPlugin {
  providers = ['telegram'];

  getButton(element, itemValue = 'none') {
    const { type, title, value } = element;
    const config = value === 'array' ? [title, itemValue] : [title, value];
    const btn = type === 'url' ? Markup.urlButton(...config) : Markup.callbackButton(...config);
    return btn;
  }

  async getMenu(key, itemValue) {
    const { BotsMenuModel } = this.app.models;
    const menu = await BotsMenuModel.findOne({ key }).select(['content', 'buttonsLayout']).lean();
    if (!menu) return [];
    const buttonsLayout = menu.buttonsLayout.map((element) => {
      if (Array.isArray(element)) {
        const buttons = element.map((item) => this.getButton(item, itemValue));
        return buttons;
      }
      return this.getButton(element, itemValue);
    });
    const keyboard = Markup.inlineKeyboard(buttonsLayout).extra();
    return [menu.content.text, keyboard];
  }

  async onMenu({ ctx, path }) {
    const menu = this.menusByPath[path];
    if (!menu) {
      this.log.warn('!menu', { path });
      return false;
    }
    this.log.trace('menu', { path }, menu);
    // console.log('this.config', this.config);
    const createButtons = (value) => {
      if (Array.isArray(value)) return value.map(createButtons);
      const 
      if (typeof value === 'string') Markup.callbackButton(value, value);
      //
      const []

      if ()


      // Markup.button.contactRequest('Send contact'),
      // Markup.button.locationRequest('Send location')
      const {type = 'text', value, title, text } = button;

      

      if (type === 'text') {
        return Markup.button.text(text);
      }
      if (type === 'locationRequest') {
        return Markup.button.locationRequest(text);
      }

      const createButton = Markup[type] || Markup.text;
      Markup.button
      return Markup.button.callback(title, value);
    };

    const { content, keyboard } = menu;
    if (keyboard) {
      const createKeyboard = keyboard.type === 'inline' ? Markup.inlineKeyboard : Markup.keyboard;
      return ctx.reply(content, createKeyboard(createButtons(keyboard.layout || keyboard.buttons)).extra());
    }
    await ctx.reply(content);
    return true;
  }

  async onStart({ ctx, path }) {
    // console.log('this.config', this.config);
    const createButtons = (value) => {
      if (Array.isArray(value)) return value.map(createButtons);
      return Markup.callbackButton(value, value);
    };
    const buttons = [
      ['/start', '/menu', '/menu/submenu'],
      ['/menu/submenu/1', '/menu/submenu/2', '/menu/submenu/4'],
    ];

    const content = `onMenu ${path}`;
    const menu = Markup.inlineKeyboard(createButtons(buttons)).extra();
    await ctx.reply(content, menu);
    return true;
  }

  getRoutes() {
    const menuRoutes = this.menus.map(({ path }) => ({
      path,
      action: ::this.onMenu,
    }));
    return {
      path: '',
      action({ next }) {
        return next();
      },
      children: [
        {
          path: '/start',
          action: ::this.onStart,
        },
        ...menuRoutes,
        {
          path: '(.*)',
          action({ path, log }) {
            log.error('404', path);
            return true;
          },
        },
      ],
    };
    // {
    //   path: /^\/city\$\d\$.*$/,
    //   action: async ({ ctx, router }) => {
    //     const [, count, cityId] = ctx.update.callback_query.data.split('$');
    //     const { ShopModel } = this.app.models;
    //     const city = await ShopModel.findById(cityId).select('keys').lean();
    //     const data = await ShopModel.findOne({ keys: { $all: [city.keys] } })
    //       .select(['title', 'description'])
    //       .sort({ createdAt: -1 })
    //       .skip(count - 1)
    //       .lean();
    //     const size = await ShopModel.count({});
    //     try {
    //       await ctx.editMessageText(...this.getPagination({ count: +count, data, size }));
    //     } catch (error) {
    //       this.app.log.error(error);
    //     }
    //     await ctx.answerCbQuery();
    //     await router.redirect('', ctx);
    //     return true;
    //   },
    // },
    // {
    //   path: '/wherebuy',
    //   children: [
    //     {
    //       path: '',
    //       action: async ({ ctx }) => {
    //         await ctx.replyWithChatAction('typing');
    //         await Bluebird.delay(500);
    //         await ctx.editMessageText(this.app.i18.t('bot.city.enter'));
    //         await ctx.answerCbQuery();
    //         return true;
    //       },
    //     },
    //     {
    //       path: '/message',
    //       action: async ({ ctx, router }) => {
    //         const { ShopModel } = this.app.models;
    //         const city = getMessage(ctx).text;
    //         const data = await ShopModel.findOne({ keys: { $all: [city] } })
    //           .select(['title', 'description'])
    //           .sort({ createdAt: -1 })
    //           .lean();
    //         await ctx.replyWithChatAction('typing');
    //         await Bluebird.delay(500);
    //         if (!data) {
    //           const buttons = [
    //             [Markup.callbackButton(this.app.i18.t('bot.button.tryAgain'), 'redirect:/wherebuy')],
    //             [Markup.callbackButton(this.app.i18.t('bot.button.onMain'), 'redirect:/start')],
    //           ];
    //           const keyboard = Markup.inlineKeyboard(buttons).extra();
    //           await ctx.reply(this.app.i18.t('bot.city.notFound'), keyboard);
    //           await router.redirect('', ctx);
    //           return true;
    //         }
    //         await this.saveCity({ ctx, city });
    //         const size = await ShopModel.count({});
    //         await ctx.reply(...this.getPagination({ count: 1, data, size }));
    //         await router.redirect('', ctx);
    //         return true;
    //       },
    //     },
    //   ],
    // },
  }

  async init() {
    await super.init();
    this.routes = await this.getRoutes();
    this.menus = (this.config && this.config.menus) || [];
    this.menusByPath = keyBy(this.menu, 'path');
    this.log.trace('menus', Object.keys(this.menusByPath));
  }
  async initBot(bot, name) {
    this.routes = await this.getRoutes();
    this.router = new Router({
      app: this.app,
      botsModule: this.botsModule,
      bots: this.bots,
      bot,
      routes: this.routes,
    });
    await this.router.init();
  }
}

export default MenuBotPlugin;
