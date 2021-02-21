export function convertPublicToPrivateChatId(id: number): string {
  // REVIEW: вообще супергруппы не меняют ID обратно на отрицательные ID, но не уверен.
  const unsignedChatId = Math.abs(id);
  // NOTE: Первые три символа (100xxx...) теперь означают публичность ¯\_(ツ)_/¯
  const privateChatId = String(unsignedChatId).substring(2);

  return privateChatId;
}

export function generateMessageLink(chatId: string, messageId?: string): string {
  if (!messageId) return `https://t.me/c/${chatId}`;
  return `https://t.me/c/${chatId}/${messageId}`
}

/**
 * TODO: Поменять any как будет написан тип для message.
 */
export function getPrivateLinkToMessage({
  chatId: initChatId,
  messageId,
}: {
  chatId: number;
  messageId: number;
}): string {
  const chatId = convertPublicToPrivateChatId(initChatId);
  return generateMessageLink(String(chatId), String(messageId));
}

export default { convertPublicToPrivateChatId, generateMessageLink, getPrivateLinkToMessage };
