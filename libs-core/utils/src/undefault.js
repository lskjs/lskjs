export default async (moduleOrPromise) => {
  const mayBeModule = await moduleOrPromise;
  if (mayBeModule.__esModule) return mayBeModule.default;
  return mayBeModule;
};
