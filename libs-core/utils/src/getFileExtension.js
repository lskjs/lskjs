export default function getFileExtension(file = '') {
  const dirs = file.split('/').reverse();
  const components = dirs[0].split('.').reverse();
  if (components.length <= 1) return null;
  const ext = components[0];
  if (!ext) return null;
  return ext;
}
