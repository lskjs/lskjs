import getYoutubeChannelIdOrUsername from './getYoutubeChannelIdOrUsername';
import getYoutubeVideoId from './getYoutubeVideoId';

export function extract(text) {
  const entities = [];
  const youtubeId = getYoutubeVideoId(text);
  if (youtubeId) {
    entities.push({
      provider: 'youtube',
      type: 'youtubeVideo',
      id: youtubeId,
      url: `https://www.youtube.com/watch?v=${youtubeId}`,
    });
  }
  const channel = getYoutubeChannelIdOrUsername(text);
  if (channel) {
    if (channel.type === 'channel') {
      entities.push({
        provider: 'youtube',
        type: 'youtubeChannel',
        id: channel.id,
        url: `https://www.youtube.com/channel/${channel.id}`,
      });
    } else if (channel.type === 'user') {
      entities.push({
        provider: 'youtube',
        type: 'youtubeChannel',
        username: channel.id,
        url: `https://www.youtube.com/user/${channel.id}`,
      });
    }
  }
  return entities;
}

export default extract;
