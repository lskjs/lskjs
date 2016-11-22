import {configure, storiesOf, action } from '@kadira/storybook';
import React, { Component } from 'react';
import StyleWrapper from 'lego-starter-kit/utils/StyleWrapper';
import StoryWrapper from 'lego-starter-kit/utils/StoryWrapper';

function loadStories() {

  const storybook = {
    action: action,
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

  require('glob-loader!./story.pattern').forEach((module)=> {
    if (typeof module == 'function') {
      module(storybook)
    }
  });

}

configure(loadStories, module);
