export default function getFileWithoutExtension(path) {
  try {
    return path.replace(/\.[^/.]+$/, '');
  } catch (err) {
    return path;
  }
}
