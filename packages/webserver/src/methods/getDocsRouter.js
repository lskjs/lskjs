export default function (getDocs, p) {
  const params = { ...p, docs: `${p.path || '/api'}/docs`, docsJson: `${p.path || '/api'}/docs/json` };
  const api = this.asyncRouter();
  api.all('/', (req, res) => res.json(params));
  api.all('/docs', (req, res) => res.send(this.getDocsTemplate(this, params)));

  const ctx = this;
  const site = (ctx.config && ctx.config.client && ctx.config.client.site) || { title: 'App' };
  const { url } = ctx.config;
  const defaultSwaggerJson = {
    swagger: '2.0',
    info: {
      ...site,
      title: `${site.title} API`,
      version: params.v,
    },
    host: url.split('://')[1],
    // host: url + params.path,
    schemes: [url.split('://')[0]],
    basePath: params.path,
    produces: ['application/json'],
    paths: {},
  };
  api.all('/docs/json', (req, res) => {
    const swaggerJson = { ...defaultSwaggerJson, ...getDocs(this, params) };
    return res.json(swaggerJson);
  });
  return api;
}
