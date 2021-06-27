import messageSplit from './messageSplit';

export default async function messagesJoin(params) {
  params = await messageSplit.call(this, params);
  const parent = params.data || [];

  const text = parent
    .filter(({ type }) => type === 'text')
    .map(({ text: txt }) => txt)
    .join('\n');
  const files = parent
    .filter(({ type }) => ['photo', 'video', 'audio', 'document'].includes(type))
    .map(({ type, file_id }) => ({ media: file_id, type }));

  files[0].caption = text || '';
  return { res: true, data: files };
}
