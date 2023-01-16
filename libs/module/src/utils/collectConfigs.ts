import { props } from 'fishbird';

export const collectConfigs = async (m) => ({
  config: m.config,
  modules: await props(m.__availableModules, async (_, name) =>
    collectConfigs(await m.module(name))
  ),
});

export default collectConfigs;
