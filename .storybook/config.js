import { wrapModules } from './storybook';
wrapModules(require('glob-loader!./story.pattern'), module);
