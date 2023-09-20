import { Message } from '../types';
import { first, last, startsWith } from '../utils/utils';

export const isStartMessage = (message: Message) =>
  startsWith((message?.text || '').toLowerCase(), '/start');

export const hasStartMessage = (messages: Message[]) =>
  messages.some((message) => isStartMessage(message));

export const hasMedia = (message: Message) => {
  // console.log('[message]', message);
  if (message?.photo) return true;
  if (message?.video) return true;
  if (message?.video_note) return true;
  if (message?.media_group_id) return true;
  if (message?.voice) return true;
  if (message?.document) return true;
  if (message?.sticker) return true;
  return false;
};

export const getLastMessages = (messages: Message[]) => {
  const clusters = [];
  let cluster: any[] = [];
  messages.forEach((m, i) => {
    const prevMessage = messages[i - 1];
    if (prevMessage && prevMessage?.from?.id !== m?.from?.id) {
      clusters.push(cluster);
      cluster = [];
    }
    cluster.push(m);
  });
  clusters.push(cluster);
  return clusters[0].reverse();
};

// export const getFileUrl = (botId, photo) => {
//   const fileId = photo?.file_id;
//   if (!botId || !fileId) return null;
//   return `https://URL/api/bots/files/file/${botId}/${fileId}`;
// };

// NOTE: frontend
export const getMediaFromMessage = (message: Message) => {
  if (message.video) {
    return {
      type: 'video',
      thumb: message.video.thumb,
      src: message.video,
    };
  }
  if (message.animation) {
    return {
      type: 'animation',
      thumb: message.animation.thumb,
      src: message.animation,
    };
  }
  if (message.video_note) {
    return {
      type: 'video_note',
      thumb: message.video_note.thumb,
      src: message.video_note,
    };
  }
  if (message.voice) {
    return {
      type: 'voice',
      thumb: null,
      src: message.voice,
    };
  }
  if (message.photo) {
    return {
      type: 'photo',
      thumb: message.photo[1] || first(message.photo),
      src: last(message.photo),
    };
  }
  if (message.document) {
    return {
      type: 'document',
      thumb: null,
      src: message.document,
    };
  }
  return null;
};

export const getMessageTypes = (message: Message) => {
  const types = [];
  if (message?.photo) types.push('photo');
  if (message?.video) types.push('video');
  if (message?.video_note) types.push('video_note');
  if (message?.media_group_id) types.push('media');
  if (message?.voice) types.push('voice');
  if (message?.document) types.push('document');
  if (message?.location) types.push('location');
  if (message?.poll) types.push('poll');
  if (message?.contact) types.push('contact');
  if (message?.sticker) types.push('sticker');
  return types;
};

export function getMessageType(message: Message) {
  // const { message } = ctx;
  if (message.audio) return 'audio';
  if (message.document) return 'document';
  if (message.animation) return 'animation';
  if (message.photo) return 'photo';
  if (message.sticker) return 'sticker';
  if (message.video) return 'video';
  if (message.video_note) return 'video_note';
  if (message.voice) return 'voice';
  if (message.contact) return 'contact';
  if (message.dice) return 'dice';
  if (message.game) return 'game'; // TODO: проверить
  if (message.poll) return 'poll';
  if (message.location) return 'location';
  if (message.venue) return 'venue'; // TODO: проверить
  if (message.text) return 'text';

  // СПОРНО
  if (message.pinned_message) return 'pinned_message';
  if (message.left_chat_member) return 'left_chat_member';
  if (message.new_chat_members) return 'new_chat_members';
  if (message.new_chat_title) return 'new_chat_title';
  if (message.new_chat_photo) return 'new_chat_photo';
  if (message.invoice) return 'invoice'; // TODO: проверить
  if (message.successful_payment) return 'successful_payment'; // TODO: проверить
  if (message.passport_data) return 'passport_data'; // TODO: проверить
  // if (message.reply_markup) return 'reply_markup'; // TODO: проверить
  return null;
}
