const { Module } = require('@lskjs/module')
const db = require('@lskjs/db')
const { Model } = require('@lskjs/db/Model')


class YoutubeChannelModel extends Model {
  
}

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

const models = { YoutubeChannelModel } 

// ready();

Module.start({ 
  config: {
    db: {
      uri: process.env.DB
    }
  },
  modules: {
    db: () => require('@lskjs/db'),
    models: [() => require('@lskjs/db/models'), { models }], 
  }
})
  .then(async (app) => {
    app.module('models.')
    const YoutubeChannelModel = await app.module('models.YoutubeChannelModel');

    const youtubeChannel = await YoutubeChannelModel.findOne({
      providerId: 'UClTDQYzyM59Oup8EW3Vzk0g'
    })
    console.log({ youtubeChannel })

    global.app = app;
    console.log('success')
  })
  .catch((err) => {
    console.error('err', err);
    throw err;
  });
