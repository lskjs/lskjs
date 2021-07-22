export const GraylogProvider = (message) => {
  const meta = (message && message.meta) || {};
  let text;
  if (meta.fields && meta.fields.message) {
    text = meta.fields.message;
  } else if (meta.fields && meta.message) {
    return meta.message;
  } else {
    text = '[graylog]';
  }
  return `🔸 ${text}`;
};

export default GraylogProvider;
