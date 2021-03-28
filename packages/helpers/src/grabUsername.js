const prefixes = [
  'İnstagram',
  'İnsta',
  'İnst',
  'İns',
  'İg',
  'İç',

  'instagram.com',
  'instagram',
  'nstagram',
  'insta',
  'inst',
  'ins',
  'in',
  'ig',
  'инстаграм',
  'инста',
  'инст',
  'инс',
  '@',
];

const delimiters = [':', '-', '/', '\\s', '—', '!', '\''];
// const delimiters = ['\\s'];

// (instagram|ig|inst|@)(:|\s|\.)*(?!.*\.\.)((?!.*\.$)[^\W][\w.]{0,29})
const parserInstagram = (preBio = '') => {
  const bio = preBio.toLocaleLowerCase();
  const prefixRegex = `(${prefixes.join('|')})`;
  // const delimiterRegex = ``;
  const delimiterRegex = `(${delimiters.join('|')})*`;
  // const usernameRegex = '([a-zA-Z0-9\\._]{4,29})';
  const usernameRegex = '(:|\\s|\\.|-|!)*(?!.*\\.\\.)((?!.*\\.$)[^\\W][\\w.]{0,29})';
  const hardUsernameRegexp = /((?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29})/g;

  const regEx = prefixRegex + delimiterRegex + usernameRegex;
  // console.log({ regEx });
  const re = new RegExp(regEx, 'ig');
  // const re = /(instagram|ig|inst|@)(:|\s|\.|-|!)*(?!.*\.\.)((?!.*\.$)[^\W][\w.]{0,29})/g;
  // const re = new RegExp(regEx, 'ig');

  // const instagramUserNameRegExp = /([a-zA-Z0-9._]{0,29})\s)?/igm;
  const res = bio.matchAll(re);
  const hardRes = bio.matchAll(hardUsernameRegexp);
  // console.log(bio.match(re))
  // console.log({ bio, res });
  let instagrams1 = [...res];
  instagrams1 = instagrams1.map(o => o.slice(3).reverse()[0]).filter(i => i && i.length > 4);
  // console.log('instagrams1',  [...res] =>  instagrams1);
  const instagrams2 = [...hardRes].map(o => o[1]).filter(i => i && i.replace(/\._-/g, '').substr(0, 4) !== 'inst' && i.length > 4);

  if (instagrams1.length > 1) {
    console.log('WARN instagrams1', [...res], ' => ', instagrams1);
  }

  const ret = i => (i && i[0] === '@' ? i.substr(1) : i);
  if (instagrams1.length) return ret(instagrams1[0]);
  if (instagrams2.length < 2) return ret(instagrams2[0]);

  console.log('WARN', { instagrams2, instagrams1 });

  return null;
  // const insta = instagrams[0] || null;
  // if (!insta) return null;
  // if (insta[0] === '@') return insta.substr(1);
  // return insta;

  // return null;
};
// console.log(parserInstagram('Instagram _kris_333'));
// console.log(parserInstagram('Только серьёзные отношения. Instagram _kris_333'));

// process.exit();
module.exports = parserInstagram;
