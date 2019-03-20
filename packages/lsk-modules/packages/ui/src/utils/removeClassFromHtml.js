export default function removeClassFromHtml(classname) {
  const html = document.getElementsByTagName('html')[0];
  if ((html.className).includes(classname)) {
    html.className = html.className.replace(`${classname} `, '').replace(classname, '');
  }
}
