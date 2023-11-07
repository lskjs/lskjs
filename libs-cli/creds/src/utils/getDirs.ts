import { map } from 'fishbird';
import { readdir } from 'fs/promises';
import { resolve } from 'path';

export async function getDirs(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await map(dirents, async (dirent) => {
    if (!dirent.isDirectory()) return [];

    return [
      { name: dirent.name, dir: resolve(dir), filename: resolve(dir, dirent.name) },
      ...(await getDirs(resolve(dir, dirent.name))),
    ];
  });
  return files.flat();

  // // TODO: иногда возвращает странность
  // const dirents = await readdir(dir, { withFileTypes: true });
  // const files = await Promise.all(
  //   dirents.map((dirent) => {
  //     const filename = resolve(dir, dirent.name);
  //     if (!dirent.isDirectory()) return [];
  //     return getDirs(filename)

  //     return dirent.isDirectory()
  //       ? getDirs(filename)
  //       : { name: dirent.name, dir: resolve(dir), filename };
  //   }),
  // );
  // return Array.prototype.concat(...files);
}
