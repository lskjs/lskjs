import asyncMapValues from '@lskjs/utils2/asyncMapValues';

export const collectConfigs = async (m) => ({
  config: m.config,
  modules: await asyncMapValues(m.__availableModules, async (_, name) => collectConfigs(await m.module(name))),
});

export default collectConfigs;
