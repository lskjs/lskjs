export const uniq = <T>(arr: Array<T>): Array<T> => [...new Set<T>(arr)];

export default uniq;
