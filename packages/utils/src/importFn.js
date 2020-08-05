import undefault from './undefault';

export default async (fn) => {
  const module = await fn();
  return undefault(module);
};
