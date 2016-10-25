import { configure, wrapmodule } from './storybook';
configure(() => {
  require('glob-loader!./story.pattern').forEach(wrapmodule);
}, module);
