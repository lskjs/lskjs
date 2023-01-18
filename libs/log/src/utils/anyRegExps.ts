export function anyRegExps(regExps: RegExp[] | RegExp, string: string) {
  // eslint-disable-next-line no-param-reassign
  if (!Array.isArray(regExps)) regExps = [regExps];
  for (let i = 0; i < regExps.length; i++) {
    if (regExps[i].test(string)) return true;
  }
  return false;
}

export default anyRegExps;
