import flatten from 'lodash/flatten';
import fromPairs from 'lodash/fromPairs';

const createFilename = (initFolders) => {
  const folders = initFolders.filter(Boolean);
  const filename = [folders.slice(0, 2).join('/'), ...folders.slice(2)].join('_');

  return `${filename}.jpg`;
};

export function getInstagramImages({ channel, posts }, { tinder = false } = {}) {
  // return [
  //   channel.avatar,
  //   ...posts.map(post => post.medias).filter(Boolean),
  // ].filter(Boolean);
  const filenames = [];
  if (posts && posts.length) {
    filenames.push(
      ...posts.map((post) => {
        if (!post.medias) return [];
        return post.medias.map((m, i) => [createFilename([channel._id, 'post', post._id, i]), m]);
      }),
    );
  }
  if (tinder && channel.tinder && channel.tinder.photos) {
    filenames.push(
      channel.tinder.photos.map((url) => [
        createFilename([channel._id, 'tinder', url.split('/').pop().substr(9, 36)]),
        url,
      ]),
    );
  }
  if (channel.avatar) {
    filenames.push([[createFilename([channel._id, 'avatar']), channel.avatar]]);
  }
  // console.log('filenames', filenames)
  const files = fromPairs(flatten(filenames));
  // console.log('files', files)
  return files;
}

export default getInstagramImages;
