import { configure, storiesOf, action } from '@kadira/storybook';
import React from 'react';
import StyleWrapper from './StyleWrapper';
import StoryWrapper from './StoryWrapper';

const storybook = {
  action,
  storiesOf: (...args) => {
    return storiesOf(...args)
      .addDecorator((story) => (
        <StyleWrapper>
          <StoryWrapper>
            {story()}
          </StoryWrapper>
        </StyleWrapper>
      ))
  },
}

function wrapModule(module) {
  if (typeof module === 'function') {
    module(storybook)
  } else {
    console.log('DO SOMETHING ELSE');
  }
}

function wrapModules(modules, module) {
  return configure(() => {
    for (let key in modules) { // eslint-disable-line
      wrapModule(modules[key]);
    }
  }, module);
}

export { StyleWrapper, StoryWrapper, configure, storybook, wrapModule, wrapModules }
