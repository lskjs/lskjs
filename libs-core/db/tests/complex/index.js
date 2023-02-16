const { Module } = require('@lskjs/module');
const db = require('@lskjs/db');
const { Model } = require('@lskjs/db/Model');


class YoutubeChannelModel extends Model {}

YoutubeChannelModel.schema = {
  type: {
    type: String,
    required: true,
    // index: true,
  },
  providerId: {
    type: String,
    required: true,
    // index: true,
  },
};
YoutubeChannelModel.options = {
  model: 'YoutubeChannelModel',
  collection: 'channel',
};

const models = { YoutubeChannelModel };

// ready();

console.log('process.env.DB', process.env.DB);

Module.start({
  debug: 1,
  config: {
    db: {
      uri: process.env.DB,
      useNewUrlParser: true,
    },
  },
  modules: {
    db: () => require('@lskjs/db'),
    models: [() => require('@lskjs/db/models'), { models }],
  },
})
  .then(async (app) => {
    const YoutubeChannelModel = await app.module('models.YoutubeChannelModel');

    const youtubeChannel = await YoutubeChannelModel.findOne({
      providerId: 'UClTDQYzyM59Oup8EW3Vzk0g',
    });
    console.log({ youtubeChannel });

    global.app = app;
    console.log('success');
  })
  .catch((err) => {
    console.error('err', err);
    throw err;
  });
