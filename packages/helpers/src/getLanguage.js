import inc from '@lskjs/utils/inc';
import Bluebird from 'bluebird';
import cld from 'cld';
import franc from 'franc';
import LanguageDetect from 'languagedetect';
import ISO639 from 'languagedetect/lib/ISO639';
import find from 'lodash/find';
import get from 'lodash/get';
// import words from 'lodash/words';
import maxBy from 'lodash/maxBy';
import toPairs from 'lodash/toPairs';

const lngDetector = new LanguageDetect();
lngDetector.setLanguageType('iso2');

export function toCode2(code) {
  return ISO639.getCode2(ISO639.getName3(code));
}

const providers = [
  {
    provider: 'cld',
    weight: 0.7,
    async getLang(text) {
      const cldResult = await cld.detect(text);
      const cldLang = get(cldResult, 'languages.0.code');
      return cldLang;
    },
  },
  {
    provider: 'franc',
    weight: 0.65,
    async getLang(text) {
      const res = await franc.all(text);
      const engItem = find(res, { 0: 'eng' });
      if (engItem[1] > 0.8) return 'en';
      const rusItem = find(res, { 0: 'rus' });
      if (rusItem[1] > 0.8) return 'ru';
      return toCode2(get(res, '0.0')) || null;
    },
  },
  {
    provider: 'languagedetect',
    weight: 0.6,
    async getLang(text) {
      const result = lngDetector.detect(text, 1);
      return get(result, '0.0');
    },
  },
];

export async function getLanguage(texts = []) {
  if (!texts.length) return null;
  const filteredTexts = texts
    .filter((i) => i)
    .map((item) => {
      const clearedText = item
        .replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
        .replace(/[\r\n]+/g, ' ')
        .replace(/"/g, ' ')
        .replace(/'/g, ' ')
        .replace(/-/g, ' ')
        .replace(/[\p{Emoji}]+/gu, ' ')
        .replace(/  +/g, ' ')
        // eslint-disable-next-line no-useless-escape
        .replace(/(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/gim, '')
        .trim();
      const separatedText = clearedText.split(' ');
      if (separatedText.length < 3) {
        return '';
      }
      return separatedText.filter((i) => i).join(' ');
    })
    .filter((i) => i);
  const langs = {};
  await Bluebird.mapSeries(providers, async (provider) => {
    await Bluebird.mapSeries(filteredTexts, async (text) => {
      try {
        const lang = await provider.getLang(text);
        if (lang) {
          inc(langs, lang, provider.weight);
        }
      } catch (err) {
        // bad console.log(err)
      }
    });
  });

  // eslint-disable-next-line no-unused-vars
  // if (Object.keys(langs).length === 0) return null;
  // const langPairs = sortBy(toPairs(langs), item => item[1]).reverse();
  // const firstLang = get(langPairs, '0', []);
  // const secondLang = get(langPairs, '1', []);
  // if (secondLang[1] >= firstLang[1] - 2) {
  //   return [firstLang[0], secondLang[0]];
  // }
  // return firstLang[0];
  const langPair = maxBy(toPairs(langs), ([lang, weight]) => weight);
  if (!langPair) return null;
  return langPair[0];
}

export default getLanguage;