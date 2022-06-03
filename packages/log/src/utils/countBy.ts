export const countBy = (obj: Record<string, unknown>, callback: (a: any, b: any) => boolean): number => {
  const vals = Object.values(obj);
  let count = 0;
  for (let i = 0; i < vals.length; i += 1) {
    const val = vals[i];
    if (callback(val, i)) count += 1;
  }
  return count;
};

export default countBy;
