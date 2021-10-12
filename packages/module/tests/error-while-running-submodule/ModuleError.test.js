/* eslint-disable no-console */
/* global test expect */
import App from './AppModule';

process.env.LOG_FORMAT = 'none';

function delay(duration) {
  return new Promise((resolve) => setTimeout(() => resolve(), duration));
}

test('error while running submodule', async () => {
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
  await expect(app.module('models.VideoModel')).rejects.toThrow(Error);
  await delay(500);
  await expect(app.module('models.VideoModel')).rejects.toThrow(Error);
  await delay(500);
  const VideoModel = await app.module('models.VideoModel');
  const res = VideoModel.getVideoId(3);
  // console.log({ res });

  expect(res).toEqual(9);
});
