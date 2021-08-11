import messageSplit from './messageSplit';

export default async function messagesJoin(params) {
  params = await messageSplit.call(this, params);
  const { caption, data } = params;
  const parent = data || [];

  const text = parent
    .filter(({ type }) => type === 'text')
    .map(({ text: txt }) => txt)
    .join('\n');
  const files = parent
    .filter(({ type }) => ['photo', 'video', 'audio', 'document'].includes(type))
    .map(({ type, file_id }) => ({ media: file_id, type }));

  if (files[0]) files[0].caption = caption || text;
  return { res: true, data: files };
}
