import AsyncRouter from 'lego-starter-kit/utils/AsyncRouter';

export default (ctx) => {
  const api = AsyncRouter();
  api.all('/', () => ({ ok: true, version: '1.0.1' }));
  return api;
};
