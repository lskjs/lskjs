export default (name) => {
  return document.documentElement.className.includes(name);
}