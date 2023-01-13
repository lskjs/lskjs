export const every = (obj: Record<string, unknown>, callback: (a: any, b: any) => boolean): boolean => {
  const vals = Object.values(obj);
  for (let i = 0; i < vals.length; i += 1) {
    const val = vals[i];
    if (!callback(val, i)) return false;
  }
  return true;
};

export default every;
