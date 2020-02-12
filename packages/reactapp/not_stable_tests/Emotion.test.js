/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-classes-per-file */
/* global test describe expect */
import React from 'react';
import styled from '@emotion/styled';
import { CacheProvider } from '@emotion/core';
import { renderToString } from 'react-dom/server';
import createEmotionServer from 'create-emotion-server';
import createCache from '@emotion/cache';

const MyDiv = styled('div')({ fontSize: 12 });
const App = () => <MyDiv>Text2</MyDiv>;

describe('ReactApp.server emotion render', () => {
  test('check default page render', async () => {
    const html = renderToString(<App />);
    expect(html).toBe(`<div class="css-15dfvqz-Uapp e994jhl0">Text</div>`);
  });
});

describe('ReactApp.server emotion with cache server', () => {
  test('check default page render', async () => {
    const cache = createCache();
    const { extractCritical } = createEmotionServer(cache);

    const element = (
      <CacheProvider value={cache}>
        <App />
      </CacheProvider>
    );

    const { html, css, ids } = extractCritical(renderToString(element));

    const head = `<style data-emotion-css="${ids.join(' ')}">${css}</style>`;
    expect(`${head}\n${html}`).toBe(`<div class="css-15dfvqz-Uapp e994jhl0">Text</div>`);
  });
});
