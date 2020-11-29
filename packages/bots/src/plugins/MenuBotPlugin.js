import Markup from 'telegraf/markup';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import Bluebird from 'bluebird';
import Router from '../utils/Router';
import BaseBotPlugin from './BaseBotPlugin';

export const createButtons = (button, keyboardType) => {
  if (!button) return [];
  if (Array.isArray(button)) return button.map(b => createButtons(b, keyboardType));
  let type;
  let value;
  let text;
  if (typeof button === 'string') {
    type = 'text';
    text = button;
  } else {
    let title;
    ({type = 'text', value, title, text } = button);
    if (!text && title) text = title;
  }
  if (!value) value = text;
  if (keyboardType === 'inline' && type==='text') type = 'callback';
  if (type === 'text') {
    return Markup.button(text);
  } else if (type === 'callback') {
    return Markup.callbackButton(text, value);
  } else if (type === 'url') {
    return Markup.urlButton(text, value);
  } else if (type === 'poll') {
    return Markup.pollRequestButton(text, value);
  } else if (type === 'location') {
    return Markup.locationRequestButton(text);
  } else if (type === 'contact') {
    return Markup.contactRequestButton(text);
  } else if (type === 'chat') {
    return Markup.switchToChatButton(text, value);
  } else if (type === 'currentChat') {
    return Markup.switchToCurrentChatButton(text, value);
  } else if (type === 'login') {
    return Markup.loginButton(text, value);
  } else if (type === 'pay') {
    return Markup.payButton(text);
  } else if (type === 'game') {
    return Markup.gameButton(text);
  }
};

export const createKeyboard = (keyboard) => {
  const layout = keyboard.layout || keyboard.buttons;
  const buttons = createButtons(layout, keyboard.type);
  if (keyboard.type === 'inline') {
    return Markup.inlineKeyboard(buttons)
   } else {
    return Markup.keyboard(buttons);
   } 
}

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



  async onStart({ ctx, path }) {
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


    // await ctx.editMessageText();
    // await ctx.answerCbQuery();

    // await ctx.replyWithChatAction('typing');
    // await Bluebird.delay(500);
    // await ctx.editMessageText(this.app.i18.t('bot.city.enter'));
    // await ctx.answerCbQuery();
    return true;
  }

  async onMenu({ bot, ctx, path }) {
    const menu = this.menusByPath[path];
    if (!menu) {
      this.log.warn('!menu', path);
      return false;
    }
    this.log.trace('menu', path, menu);
    const { content, keyboard } = menu;

    let extra = {};
    if (keyboard) {
      extra = createKeyboard(keyboard).extra();
      console.log('extra', extra.reply_markup.inline_keyboard)
    }
    await bot.replyContent(ctx, content, extra);
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
        ...menuRoutes,
        {
          path: '/start',
          action: ::this.onStart,
        },
        {
          path: '(.*)',
          action({ path, log }) {
            log.error('404', path);
            return true;
          },
        },
      ],
    };
  }

  // async init() {
  //   await super.init();
  //   // await super.preinit();
  // }
  async preinit() {
    this.menus = (this.config && this.config.menus) || [];
    this.menusByPath = keyBy(this.menus, 'path');
    this.log.trace('menus', Object.keys(this.menusByPath));
    this.routes = await this.getRoutes();
  }
  async initBot(bot, name) {
    await this.preinit();
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
