/* eslint-disable camelcase */

import { omitNull } from '@lskjs/algos';

export function getTypingDelay(text: string, charsPerMinute = 200) {
  const ms = (text.length / charsPerMinute) * 60 * 1000;
  if (ms > 5000) return 5000;
  if (ms < 1000) return 1000;
  return ms;
}

// export const getTypeBySrc = (src, rawType) =>
//   // eslint-disable-next-line no-nested-ternary
//   (rawType === 'media'
//     ? (src?.url || '').includes('mp4')
//       ? 'video'
//       : 'photo'
//     : 'document') as 'photo';

// eslint-disable-next-line no-shadow
export const isNeedCaption = (text, rawType, j, last) =>
  text && ((rawType !== 'document' && j === 0) || (rawType === 'document' && j === last));

export function getMessages({
  medias: rawRawMedias = [],
  messagesDelemiter: initMessageDelemiter,
  type: initType,
  ...props
}) {
  const defaultType = !['audio', 'document', 'video', 'photo', 'video_note'].includes(initType)
    ? 'document'
    : initType;

  const rawMedias = rawRawMedias
    .map((src) => ({
      type: src.type || defaultType,
      filename: src.name,
      ...src,
    }))
    .filter((a) => a.url);

  const rawText = props.message || props.text || props.caption || '';
  const trimmedText = rawText.trim().replaceAll(/\\n/gi, '\n');
  const md = initMessageDelemiter || '\n\n';
  let texts = trimmedText
    .split(md)
    .map((a) => a.trim())
    .filter(Boolean);
  if (texts.length === 0 && rawMedias.length) texts = [''];
  if (['document', 'video', 'photo'].includes(defaultType)) {
    return texts.map((text, i) => {
      if (i === 0) {
        const medias = rawMedias.map((media, j) =>
          omitNull({
            type: media.type,
            media,
            caption: isNeedCaption(text, media.type, j, rawMedias.length - 1) ? text : null,
          }),
        );
        // console.log({ i, rawType, medias, text });
        if (medias.length) {
          return { type: defaultType === 'document' ? 'document' : defaultType, medias };
        }
        return { type: 'text', text };
      }
      const ms = getTypingDelay(text); // , typingSpeed);
      return { type: 'text', text, delay: ms };
    });
  }

  return [
    ...rawMedias.map((media) => ({
      type: media?.type || defaultType,
      media,
    })),
    ...texts.map((text, i) => ({
      type: 'text',
      text,
      delay: i === 0 ? 0 : getTypingDelay(text),
    })),
  ];
}
