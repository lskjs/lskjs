/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */

export const getEnvVar = <T>(
  name: string,
  def: T | null = null
): string | T | null => {
  // @ts-ignore
  // eslint-disable-next-line prettier/prettier
  const envs =  typeof process !== 'undefined' ? process.env : typeof window !== 'undefined' ? window : {};
  return envs[name] || def;
};

export default getEnvVar;
