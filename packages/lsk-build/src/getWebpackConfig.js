import WebpackServerConfig from './WebpackServerConfig';
import WebpackClientConfig from './WebpackClientConfig';
export default (ctx) => {
  const client = new WebpackClientConfig(ctx);
  const server = new WebpackServerConfig(ctx);
  return [client.getConfig(), server.getConfig()];
};
