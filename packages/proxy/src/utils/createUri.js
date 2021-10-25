export const createUri = ({ type, user, username, pass, password, host, port }) =>
  [
    type,
    [[user || username, pass || password].filter(Boolean).join(':'), [host, port].filter(Boolean).join(':')]
      .filter(Boolean)
      .join('@'),
  ]
    .filter(Boolean)
    .join('://');

export default createUri;
