export default function getFileExtension(file) {
  if (file && file.originalname) {
    const res = file.originalname.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
    if (res && res[1]) {
      return res[1];
    }
  }
  return null;
}


this.helpers.getFileExtensionFromPath = function (path) {
  const res = path.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
  if (res && res[1]) {
    return res[1];
  }
  return null;
};
this.helpers.getFilePathWithoutExtension = function (path) {
  try {
    return path.replace(/\.[^/.]+$/, '');
  } catch (err) {
    return path;
  }
};