export function convertPublicToPrivateChatId(id: number): string {
  // REVIEW: вообще супергруппы не меняют ID обратно на отрицательные ID, но не уверен.
  const unsignedChatId = Math.abs(id);
  // NOTE: Первые три символа (100xxx...) теперь означают публичность ¯\_(ツ)_/¯
  const privateChatId = String(unsignedChatId).substring(2);

  return privateChatId;
}

function generateMessageLink(chatId: string, messageId: string): string {
  return `https://t.me/c/${chatId}/${messageId}`;
}

/**
 * TODO: Поменять any как будет написан тип для message.
 */
export function getPrivateLinkToMessage(message: any): string {
  const chatId = convertPublicToPrivateChatId(message.chat.id);
  const messageId = message.message_id;
  const privateLinkToMessage = generateMessageLink(chatId, messageId);

  return privateLinkToMessage;
}

export default { convertPublicToPrivateChatId, getPrivateLinkToMessage }
