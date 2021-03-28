import { findPhoneNumbersInText } from 'libphonenumber-js';
import get from 'lodash/get';
import map from 'lodash/map';
import uniq from 'lodash/uniq';

const twitterRegexp = /twitter\.com\/([a-zA-Z0-9_]+)/gim;
const instagramRegexp = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_]+)/gim;
const tiktokRegexp = /tiktok.com\/@([a-zA-Z0-9_]+)/gim;
const facebookRegexp = /facebook.com\/([a-zA-Z0-9_.]+)/gim;
// const vkRegexp = /vk\.com\/([a-zA-Z0-9_.]+)/img;
// const vkNotRegexp = /(club|id|public)\d+/img;
// const okRegexp = /ok\.ru\/([a-zA-Z0-9_.]+)/img;
// const githubRegexp = /github\.com\/([a-zA-Z0-9_]+)/gim;
// const pinterestRegexp = /pinterest\.\w+\/([a-zA-Z0-9_]+)/img;
const telegramRegexp = /(?:t\.me|tele\.gg)\/([a-zA-Z0-9_]+)/gim;
const tlgrmRegexp = /tlgrm\.ru\/channels\/@([a-zA-Z0-9_]+)/gim;
const webTelegramRegExp = /web\.telegram\.org\/\S+@([A-Za-z0-9-_]+)/gim;
// const twitchRegexp = /twitch\.tv\/([a-zA-Z0-9_]+)/img;
const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gim;
// const youtubeRegexp = /(https?:\/\/)?(www\.)?youtu((\.be)|(be\..{2,5}))\/(channel|user)\/([a-zA-Z0-9\-_]{1,})/gmi;
const youtubeRegexp = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/\S*/gim;

/* {
  name: 'vk',
  re: vkRegexp,
  usernameNot: vkNotRegexp,
} */
// (\S+ )?@(\S+)
const obj = [
  {
    name: 'twitter',
    re: twitterRegexp,
    usernameNot: 'i',
    words: ['twi', 'twitter', 'твиттер', 'тви'],
  },
  {
    name: 'instagram',
    re: instagramRegexp,
    usernameNot: 'p',
    words: ['инстаграм', 'инста', 'инст', 'ig', 'instagram', 'inst', 'insta', 'иг'],
  },
  {
    name: 'tiktok',
    re: tiktokRegexp,
    words: ['tiktok', 'tt', 'тт'],
  },
  {
    name: 'facebook',
    re: facebookRegexp,
    usernameNot: 'profile',
    words: ['facebook', 'fb', 'фб'],
  },
  {
    name: 'telegram',
    re: telegramRegexp,
    usernameNot: 'joinchat',
    words: ['тг', 'telegram', 'tg'],
  },
  {
    name: 'telegram',
    re: tlgrmRegexp,
  },
  {
    name: 'telegram',
    re: webTelegramRegExp,
  },
  {
    name: 'email',
    re: emailRegexp,
    full: true,
  },
  {
    name: 'youtube',
    re: youtubeRegexp,
    full: true,
  },
];

const notIgWords = [];
obj.forEach((item) => {
  if (item.words) {
    notIgWords.push(...item.words);
  }
});

const pushOrCreate = (obj, key, val) => {
  if (!Array.isArray(obj[key])) {
    obj[key] = [];
  }
  if (Array.isArray(val)) {
    obj[key].push(...val);
  } else {
    obj[key].push(val);
  }
};

export function getContacts({ texts, biographyEntities, channel, countries }) {
  if (!texts) {
    return {};
  }
  let arr = texts;
  if (Array.isArray(texts)) {
    arr = arr.filter((item) => item);
  }
  if (typeof texts === 'string') {
    arr = [texts];
  }
  const contacts = {};
  arr.forEach((str) => {
    obj.forEach((item) => {
      const links = str.match(item.re);
      const social = [];
      if (Array.isArray(links)) {
        if (item.full) {
          pushOrCreate(contacts, item.name, links);
        } else {
          links.forEach((link) => {
            try {
              const [, username] = item.re.exec(link);
              if (!item.usernameNot || !item.usernameNot.includes(username)) {
                social.push(username);
              }
            } catch (e) {
              // какие-то логи
            }
          });
        }
      }
      if (item.words) {
        // \b не работает с юникодом
        const re = new RegExp(
          `\\b(${item.words.join('|')})(?!@|\\.)[^a-zA-Z0-9А-Яа-яеЁ]+([a-zA-Z0-9._-]+[^\\s\\W])`,
          'gmi',
        );
        const words = str.match(re);
        if (Array.isArray(words)) {
          words.forEach((word) => {
            try {
              const [, , username] = re.exec(word);
              social.push(username);
            } catch (e) {
              // какие-то логи
            }
          });
        }
      }
      if (social.length) {
        pushOrCreate(contacts, item.name, social);
      }
    });
    if (Array.isArray(countries) && countries.length) {
      const uniqCountries = uniq(countries).map((item) => item.toUpperCase());
      uniqCountries.forEach((country) => {
        const numbers = map(findPhoneNumbersInText(str, country), 'number.number');
        if (numbers.length) {
          pushOrCreate(contacts, 'phone', numbers);
        }
      });
    } else {
      const numbers = map(findPhoneNumbersInText(str), 'number.number');
      if (numbers.length) {
        pushOrCreate(contacts, 'phone', numbers);
      }
    }
  });
  const publicEmail = get(channel, 'publicEmail');
  const publicPhone = get(channel, 'publicPhone');
  const waNumber = get(channel, 'whatsappNumber');
  const contactPhone = get(channel, 'contactPhone');
  if (publicEmail) {
    pushOrCreate(contacts, 'email', publicEmail);
  }
  if (publicPhone) {
    pushOrCreate(contacts, 'phone', publicPhone);
  }
  if (waNumber) {
    pushOrCreate(contacts, 'phone', waNumber);
  }
  if (contactPhone) {
    pushOrCreate(contacts, 'phone', contactPhone);
  }
  if (Array.isArray(biographyEntities)) {
    biographyEntities.forEach((entity) => {
      const username = get(entity, 'user.username');
      if (username) {
        pushOrCreate(contacts, 'instagram', username);
      }
    });
  }
  Object.keys(contacts).forEach((contact) => {
    if (Array.isArray(contacts[contact])) {
      contacts[contact] = uniq(contacts[contact]);
    }
  });
  return contacts;
}

export default getContacts;
