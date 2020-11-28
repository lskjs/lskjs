import Markup from 'telegraf/markup';
import get from 'lodash/get';
import Bluebird from 'bluebird';
import { Router } from '../utils/Router';
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

  getPagination({ count, data, size }) {
    const { _id, title, description } = data;
    const content = `${title}\n\n${description}`;
    const buttons = [Markup.callbackButton(`- ${count} -`, `redirect:/city$${count}$${_id}`)];
    if (count === 1 && size > 1) {
      buttons.push(Markup.callbackButton(`${count + 1} ›`, `redirect:/city$${count + 1}$${_id}`));
      buttons.push(Markup.callbackButton(`${size} »`, `redirect:/city$${size}$${_id}`));
    } else if (count === size && size > 1) {
      buttons.unshift(Markup.callbackButton(`‹ ${count - 1}`, `redirect:/city$${count - 1}$${_id}`));
      buttons.unshift(Markup.callbackButton(`« 1`, `redirect:/city$${1}$${_id}`));
    } else if (size > 1) {
      buttons.unshift(Markup.callbackButton(`‹ ${count - 1}`, `redirect:/city$${count - 1}$${_id}`));
      buttons.unshift(Markup.callbackButton(`« 1`, `redirect:/city$${1}$${_id}`));
      buttons.push(Markup.callbackButton(`${count + 1} ›`, `redirect:/city$${count + 1}$${_id}`));
      buttons.push(Markup.callbackButton(`${size} »`, `redirect:/city$${size}$${_id}`));
    }
    const keyboard = Markup.inlineKeyboard([
      buttons,
      [Markup.callbackButton(this.app.i18.t('bot.button.onMain'), 'redirect:/start')],
    ]).extra();
    return [content, keyboard];
  }

  async saveCity({ ctx, city }) {
    const { UserCityModel, BotsTelegramUserModel } = this.app.models;
    const user = await BotsTelegramUserModel.findOne({ id: ctx.from.id }).select('_id').lean();
    if (!user) return;
    const userCity = await UserCityModel.findOne({ name: city, userId: user._id }).select('_id').lean();
    if (!userCity) {
      const newUserCity = new UserCityModel({
        userId: user._id,
        count: 1,
        name: city,
      });
      await newUserCity.save();
      return;
    }
    await UserCityModel.updateOne({ _id: userCity._id }, { $inc: { count: 1 } });
  }

  async saveUser({ ctx }) {
    const { BotsTelegramUserModel } = this.app.models;
    const { id } = ctx.from;
    const user = await BotsTelegramUserModel.findOne({ id }).select('_id').lean();
    if (user) return;
    const newUser = new BotsTelegramUserModel(ctx.from);
    await newUser.save();
  }

  async onStart({ ctx }) {
    await ctx.reply('onStart');
    return true;
  }

  async onMenu({ ctx, path }) {
    const callback = get(ctx, 'update.callback_query.data');

    console.log('this.config', this.config);

    const buttons = ['/start', '/menu', '/menu/submenu', '/menu/submenu/1', '/menu/submenu/2', '/menu/submenu/4'];

    const content = `onMenu ${callback} ${path}`;
    const menu = Markup.inlineKeyboard(
      buttons.map((value) => Markup.callbackButton(value, `redirect:${value}`)),
    ).extra();
    await ctx.reply(content, menu);
    return true;
  }

  getRoutes() {
    return [
      {
        path: 'start',
        action: (props) => this.onStart(props),
      },
      {
        path: '/start',
        action: (props) => this.onStart(props),
      },
      {
        path: '',
        action: (props) => this.onMenu(props),
      },
      {
        path: 'menu',
        action: (props) => this.onMenu(props),
      },
      {
        path: '/menu',
        action: (props) => this.onMenu(props),
      },
      {
        path: '/:menu',
        action: (props) => this.onMenu(props),
      },
      {
        path: ':menu',
        action: (props) => this.onMenu(props),
      },
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
    ];
  }

  async init(bot) {
    super.init();
    this.routes = await this.getRoutes();
  }
  async initBot(bot, name) {
    console.log(1231231, name);
    this.routes = await this.getRoutes();
    this.router = new Router({
      bot: bot.client,
      routes: this.routes,
    });
  }
}

export default MenuBotPlugin;
