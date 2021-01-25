export default (req) =>
  req
    .get('host')
    .toLowerCase()
    .replace(/^www\./, '');
