export function chunkString(str: string, length: number): string[] | null {
  if (length <= 0) throw new Error('length should more than 0');
  return str.match(new RegExp(`.{1,${length}}`, 'g'));
}

export default chunkString;
