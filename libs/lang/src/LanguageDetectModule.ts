// import { toPairs } from '@lskjs/algos';
import { Module } from '@lskjs/module';
import cld from 'cld';
import { mapSeries } from 'fishbird';
import LanguageDetect from 'languagedetect';

export const toPairs = <T>(object: Record<string, T>): [string, T][] =>
  Object.keys(object).map((key) => [key, object[key]]);

const maxBy = (arr: any[], fn: any) => {
  let max = null;
  let maxItem = null;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const val = fn(item);
    if (max === null || val > max) {
      max = val;
      maxItem = item;
    }
  }
  return maxItem;
};

export class LangModule extends Module {
  providers: any[] = [];
  async init() {
    await super.init();
    const lngDetector = new LanguageDetect();
    lngDetector.setLanguageType('iso2');
    this.providers = [
      {
        provider: 'cld',
        weight: 0.7,
        async getLang(text: string) {
          const cldResult = await cld.detect(text);
          return cldResult?.languages?.[0]?.code || null;
        },
      },
      {
        provider: 'languagedetect',
        weight: 0.6,
        async getLang(text: string) {
          const result = lngDetector.detect(text, 1);
          return result?.[0]?.[0];
        },
      },
    ];
  }
  async getLanguage(texts: string[] = []) {
    if (!texts.length) return null;
    const filteredTexts: string[] = texts
      .map((item) => {
        if (!item) return '';
        const clearedText = item
          .replace(/[\r\n]+/g, ' ')
          .replace(/[\p{Emoji}]+/gu, ' ')
          .replace(/  +/g, ' ')
          .replace(
            // eslint-disable-next-line no-useless-escape
            /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/gim,
            '',
          )
          .trim();
        const separatedText = clearedText.split(' ');
        if (separatedText.length <= 2) {
          return '';
        }
        return separatedText.filter(Boolean).join(' ');
      })
      .filter(Boolean);

    const langs: Record<string, number> = {};
    await mapSeries(this.providers, async (provider: any) => {
      // @ts-ignore
      await mapSeries(filteredTexts, async (text: string) => {
        const lang = await provider.getLang(text).catch(() => {
          // bad console.log(err)
        });
        if (!lang) return;
        if (!langs[lang]) langs[lang] = 0;
        langs[lang] += provider.weight;
      });
    });
    // @ts-ignore
    const langPair = maxBy(toPairs(langs), ([, weight]) => weight);
    if (!langPair) return null;
    return langPair[0];
  }
}

export default LangModule;
