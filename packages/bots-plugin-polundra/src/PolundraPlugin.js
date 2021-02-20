import BaseBotPlugin from '@lskjs/bots-plugin';
import sample from 'lodash/sample';

const usernames = [
  'isuvorov',
  'volkovpishet',
  'natavts',
  'anoru',
  'immuzov',
  'antouhou',
  'yukioru',
  'durob',
  'AtNovember',
  'THEHVZE',
  'flood7',
  'romankalinkin',
  'Andru_x',
  'vozilov',
  'NightRomantic',
  'selslack',
  'Sanich63',
  'hinex',
  'xfocuse',
  'edinstvennyi',
  'ma3xxx',
  'leyoiv',
  'seegi',
  'ArkadyB',
  'hopacha',
  'ga2mer',
  'unipon',
  'dkorostelev',
  'demeliorator',
  'Grishot',
  'dinogameandroid',
  'Seempoke',
  'nenatta',
  'unrealjke',
  'kreynes',
  'rsega',
  'Khorunzhev',
  'grunindesign',
  'dwnste',
  'MagzNikitin',
  'fpsthirty',
  'zounds',
  'arkady_b',
  'MaxOlin33',
  'metallcorn',
  'dmitryvlasov',
  'aboolean',
  'f1x3rr',
  'Nikita_Solovev',
  'rogozhko',
  'Ghost910',
  'RoyPalmer',
  'superkate',
  'bethlis',
  'teslaaa',
  'romankusty',
  'iamallah_n',
  'Tetrisi',
  'ivbra',
  'OviNik',
  'n1ght_fox',
  'bangdbang',
  'satiataoff',
  'shmelevs',
  'konstantinevdokimov',
  'SergioBabinetsC',
];

const loveMessages = [
  'давно хотел сказать',
  'но всегда боялся',
  'ты the BEST',
  'спасибо тебе',
  'медвежонок',
  'чмаффки!',
  'спаси меня!',
  'слыш, по ебалу хочешь?',
  'Гришот, блять!',
  'ты из-за TS не контрибьютишь в нового бота?',
  'жду твоих коммитов',
  'Пиздец, больше всего на свете я ненавижу...',
  '..юю',
  'дрочишь?',
  'я слежу за тобой',
  'не могу перестать думать о тебе',
  'сдеанонь меня, слабо?',
  'почему не пишешь в меня?',
  'Аааа ОРУ!',
  'Меня обновили. Угадай какой компромат добавлии на тебя?',
  'скучаю по твоим сообщениям',
  'напиши Нате плиз',
];

export default class PolundraPlugin extends BaseBotPlugin {
  providers = ['telegram'];

  async getUsernames() {
    return usernames;
  }

  runBot(bot, name) {
    bot.on('message', async (message) => {
      if (bot.isMessageContains(message, /люблю/)) {
        return bot.sendMessage(message, sample(loveMessages));
      }
      if (!bot.isMessageContains(message, /полундра/)) return null;
      const users = await this.getUsernames(message);
      bot.sendMessage(message, 'Нас АТАКУЮТ!');
      bot.sendMessage(message, `ПОЛУДРА!!!${users.map((a) => `@${a}`).join(' ')}`);
    });
  }
}
