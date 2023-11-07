import { readdir } from 'fs/promises';
import { resolve } from 'path';

export async function getFiles(dir) {
  // TODO: иногда возвращает странность
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const filename = resolve(dir, dirent.name);
      return dirent.isDirectory()
        ? getFiles(filename)
        : { name: dirent.name, dir: resolve(dir), filename };
    }),
  );
  return files.flat();
}

export default getFiles;
