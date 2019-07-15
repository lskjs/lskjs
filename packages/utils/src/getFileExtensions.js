export default function getFileExtensions(file) {
  if (file && file.originalname) {
    const res = file.originalname.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
    if (res && res[1]) {
      return res[1];
    }
  }
  return null;
}
