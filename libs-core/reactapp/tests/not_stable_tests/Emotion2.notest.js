/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-classes-per-file */
/* global test describe expect */
import styled from '@emotion/styled';
import React from 'react';
import { renderToString } from 'react-dom/server';

describe('ReactApp.server emotion render', () => {
  test('check default page render', async () => {
    const MyDiv = styled('div')({ fontSize: 12 });
    const App = () => <MyDiv>Text</MyDiv>;

    const html = renderToString(<App />);
    expect(html).toBe(`<div class="css-15dfvqz-Uapp e994jhl0">Text</div>`);
  });
});
