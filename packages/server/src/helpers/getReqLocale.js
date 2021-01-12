export function getReqLocale(req) {
  if (req.data.locale) return req.data.locale;
  if (req.user && req.user.locale) return req.user.locale;
  return null;
}

export default getReqLocale;
