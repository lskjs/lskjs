import { configure, storiesOf, action } from '@kadira/storybook';
import React, { Component } from 'react';
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

function wrapmodule(module) {
  if (typeof module === 'function') {
    module(storybook)
  } else {
    console.log('DO SOMETHING ELSE');
  }
}

export { StyleWrapper, StoryWrapper, configure, storybook, wrapmodule }
