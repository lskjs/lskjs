/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable max-classes-per-file */
/* global test describe expect */
import styled from '@emotion/styled';
import ready from '@lskjs/utils/polyfill';
import React from 'react';

import ReactApp from '../../src/ReactApp.server';

ready();

class Html {
  constructor(props) {
    Object.assign(this, props);
  }
  render() {
    return this.content;
  }
}

class Uapp {
  resolve(req) {
    this.page = {
      render() {
        // try {
        const MyDiv = styled('div')({ fontSize: 12 });
        const res = <MyDiv>Text2</MyDiv>;
        return res;
        // } catch (err) {
        //   console.log({err});

        //   return 'asdasd';
        // }
      },
    };
  }
}

const config = {
  log: {
    level: 'error',
  },
  reactApp: {
    strategy: 'json',
  },
};

describe('ReactApp.server emotion render', () => {
  test('check default page render', async () => {
    const reactApp = new ReactApp({
      Html,
      Uapp,
      config,
    });
    await reactApp.start();
    const req = {
      originalUrl: '/some/page',
      query: { param: 123 },
    };
    const { status, redirect, content } = await reactApp.render(req);
    expect(content).toBe(
      `<style data-emotion-css="15dfvqz-Uapp">undefined</style><div class="css-15dfvqz-Uapp e994jhl0">Text</div>`,
    );
    expect(status).toBe(200);
    expect(redirect).toBe(undefined);
  });
});
