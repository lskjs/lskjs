export default async function createMessage({ text, to }) {
  const data = { text, to };
  return { res: true, data };
}
