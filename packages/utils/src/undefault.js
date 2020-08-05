export default async (module) => {
  if (module.__esModule) return module.default;
  return module;
};
