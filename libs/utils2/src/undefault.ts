export const undefault = async (moduleOrPromise: any): Promise<any> => {
  const mayBeModule = await moduleOrPromise;
  if (mayBeModule.__esModule) return mayBeModule.default;
  return mayBeModule;
};

export default undefault;
