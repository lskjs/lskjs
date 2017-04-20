import WebpackServerConfig from './WebpackServerConfig';
import WebpackClientConfig from './WebpackClientConfig';
import WebpackWidgetConfig from './WebpackWidgetConfig';
export default (ctx) => {
  const entries = ctx.entries || ['client', 'server'];

  return entries.map((name) => {
    if (name === 'client') return WebpackClientConfig.getConfig(ctx);
    if (name === 'server') return WebpackServerConfig.getConfig(ctx);
    if (name === 'widget') return WebpackWidgetConfig.getConfig(ctx);
    return {};
  });
};
