export default function () { // eslint-disable-line
  return {
    err: require('./err').default(...arguments), // eslint-disable-line
    ok: require('./ok').default(...arguments), // eslint-disable-line
    pack: require('./pack').default(...arguments), // eslint-disable-line
  };
}
