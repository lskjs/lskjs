export function formatter(value) {
  const arr = [];
  String(value).split('').reverse().forEach((c, i) => {
    if (i % 3 === 0) arr.push(' ');
    arr.push(c);
  });
  return arr.reverse().join('').trim();
}

export default formatter;
