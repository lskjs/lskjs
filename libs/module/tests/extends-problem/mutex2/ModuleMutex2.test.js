/* eslint-disable no-console */
/* global test expect */
import App from './AppModule';

process.env.LOG_FORMAT = 'none';

test('mutex x1000 ', async () => {
  const app = await App.start({
    modules: {
      db: import('./DbModule'),
      models: [
        () => import('./ModelsModule'),
        {
          models: {
            VideoModel: {
              getVideoId(id) {
                return id * id;
              },
            },
          },
        },
      ],
    },
  });

  const db = await app.module('db');
  // const models = await app.module('models').catch(err => console.log({err}));
  const VideoModel2 = await app.module('models.VideoModel').catch((err) => console.log({ err }));
  // console.log({ VideoModel2 });

  const ids = [...Array(1000).keys()];

  const promises = ids.map(async (i) => {
    const VideoModel = await app.module('models.VideoModel');
    return VideoModel ? VideoModel.getVideoId(i) : -1;
  });

  const res = await Promise.all(promises);
  // console.log({ res });

  expect(res).toEqual(ids.map((i) => i * i));
});
