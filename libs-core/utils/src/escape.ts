export default function escape(str) {
  return str.replace(/[^a-zA-Z0-9_-]+/g, '').trim();
}
