export default function addClassToHtml(classname) {
  const html = document.getElementsByTagName('html')[0];
  if (!(html.className).includes(classname)) {
    html.className += ` ${classname}`;
  }
}
