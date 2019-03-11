/** @jsx jsx */
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import React from 'react';

const theme = {
  colors: {
    primary: 'hotpink'
  }
}

const SomeText = styled.div`
  color: ${props => props.theme.colors.primary};
`

module.exports = function ({ storiesOf, action, knob }) {
  return storiesOf('Test2', module)
    .add('with text', () => (
      <ThemeProvider theme={theme}>
        <SomeText>some text</SomeText>
        <div css={theme => ({ color: theme.colors.primary })}>
          some other text
        </div>
      </ThemeProvider>
    ))
   
};
