const req = require.context(
  '../src',
  true,
  /.story.js|.story.js|.story.jsx|.story.jsx|.story.tsx$/,
);

export default {
  modules: req.keys().map(req),
  options: {
    name: 'LSK.js',
  },
  knobs: false,
};