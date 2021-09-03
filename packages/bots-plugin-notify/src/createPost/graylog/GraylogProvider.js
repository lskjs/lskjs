export const GraylogProvider = (message) => {
  console.log('GraylogProvider.message', message);
  const event = (message && message.meta && message.meta.event) || {};
  let text;
  if (event.fields && event.fields.message) {
    text = event.fields.message;
  } else if (event.message) {
    text = event.message;
  } else {
    text = '[graylog]';
  }
  return `🔸 ${text}`;
};

export default GraylogProvider;
