function getYoutubeChannelIdOrUsername(link) {
  const patternProviderId = /(https?:\/\/)?(www\.)?youtu((\.be)|(be\..{2,5}))\/(channel|user)\/([a-zA-Z0-9\-_]{1,})/;
  if (!patternProviderId.test(link)) return null;
  const match = link.match(patternProviderId);
  if (!match) return null;
  return { type: match['6'], id: match['7'] };
}

export default getYoutubeChannelIdOrUsername;
