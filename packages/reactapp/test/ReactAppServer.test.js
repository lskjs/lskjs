/* eslint-disable max-classes-per-file */
/* global test describe expect */
import ready from '@lskjs/utils/polyfill';
import ReactApp from '../src/ReactApp.server';

ready();
global.__DEV__ = true;

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
    const { path, query } = req;
    const subpaths = path.split('/');
    if (subpaths[2] === 'page') {
      this.page = {
        state: {
          status: 200,
        },
        render() {
          return `html result\npath=${path}\nquery=${JSON.stringify(query)}`;
        },
      };
      return;
    }
    if (subpaths[2] === 'redirect') {
      this.page = {
        state: {
          status: +subpaths[3],
          redirect: `/some/${subpaths[3]}/redirect`,
        },
      };
      return;
    }
    if (subpaths[2] === 'error') {
      this.page = {
        state: {
          status: +subpaths[3],
        },
        render() {
          return `error ${subpaths[3]}\npath=${path}\nquery=${JSON.stringify(query)}`;
        },
      };
      return;
    }
    this.page = {
      state: {
        status: 404,
      },
      render() {
        return `path:${path} not found`;
      },
    };
  }
}

const createResChecker = ({ status: expectStatus, html: expectHtml }) => ({
  status: status => {
    expect(status).toBe(expectStatus);
    return {
      send: html => {
        expect(html).toBe(expectHtml);
      },
    };
  },
});

const config = {
  log: {
    level: 'error',
  },
  reactApp: {
    strategy: 'json',
  },
};

describe('ReactApp.server default behavior', () => {
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
    expect(status).toBe(200);
    expect(redirect).toBe(undefined);
    expect(content).toBe(`html result\npath=/some/page\nquery={&quot;param&quot;:123}`);
  });
  test('check redirect 302', async () => {
    const reactApp = new ReactApp({
      Html,
      Uapp,
      config,
    });
    await reactApp.start();
    const req = {
      originalUrl: '/some/redirect/302',
      query: { param: 123 },
    };
    const { status, redirect, content } = await reactApp.render(req);
    expect(status).toBe(302);
    expect(redirect).toBe('/some/302/redirect');
    expect(content).toBe(undefined);
  });
  test('check redirect 301', async () => {
    const reactApp = new ReactApp({
      Html,
      Uapp,
      config,
    });
    await reactApp.start();
    const req = {
      originalUrl: '/some/redirect/301',
      query: { param: 123 },
    };
    const { status, redirect, content } = await reactApp.render(req);
    expect(status).toBe(301);
    expect(redirect).toBe('/some/301/redirect');
    expect(content).toBe(undefined);
  });
  test('check error 400', async () => {
    const reactApp = new ReactApp({
      Html,
      Uapp,
      config,
    });
    await reactApp.start();
    const req = {
      originalUrl: '/some/error/400',
      query: { param: 123 },
    };
    const { status, redirect, content } = await reactApp.render(req);
    expect(status).toBe(400);
    expect(redirect).toBe(undefined);
    expect(content).toBe(`error 400\npath=/some/error/400\nquery={&quot;param&quot;:123}`);
  });
  test('check error 404', async () => {
    const reactApp = new ReactApp({
      Html,
      Uapp,
      config,
    });
    await reactApp.start();
    const req = {
      originalUrl: '/some/not_found',
      query: { param: 123 },
    };
    const { status, redirect, content } = await reactApp.render(req);
    expect(status).toBe(404);
    expect(redirect).toBe(undefined);
    expect(content).toBe(`path:/some/not_found not found`);
  });

  test('check res', async () => {
    const reactApp = new ReactApp({
      Html,
      Uapp,
    });
    await reactApp.start();
    const req = {
      originalUrl: '/some/page',
      query: { param: 123 },
    };
    await reactApp.render(
      req,
      createResChecker({
        status: 200,
        html: 'html result\npath=/some/page\nquery={&quot;param&quot;:123}',
      }),
    );
  });
});
