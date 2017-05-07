export function canonize(str) {
  return str.toLowerCase().trim();
}

function checkCriteria(params, name) {
  if (params[name]) {
    return {
      [name]: canonize(params[name]),
    };
  }
  return false;
}

export function getNameSchemaOnUrl(url) {
  const [, name] = /\/([a-z]+)$/.exec(url);
  return name;
}

async function saveFile(title, file) {
  const dirname = `${__dirname}/../storage`;
  const type = file.mimetype.split('/')[1] || 'png';
  const filename = `${title}.${type}`;
  await Promise.promisify(file.mv)([dirname, filename].join('/'));
  return `/static/${filename}`;
}

export default (ctx) => {
  const modules = {

    uploadImage: async (req, field) => {
      if (req.files && req.files[field]) {
        const filename = await saveFile(`${new Date().getTime()}`, req.files[field]);
        return `${ctx.config.prefix}${filename}`;
      }
      throw ctx.errors.e400(`Не передан параметр ${field}`);
    },

    getCriteria: (req) => {
      const params = req.allParams();
      for (const item in params) {
        return checkCriteria(params, item);
      }
      throw ctx.errors.e400('Некоторые параметры не были переданы');
    },

    isAuth: (req) => {
      if (req._errJwt) {
        throw ctx.errors.e500(req._errJwt);
      }
      if (!req.user || !req.user._id) {
        throw ctx.errors.e401('!req.user');
      }
    },

    checkNotFound: (name = 'Object') => (data) => {
      if (!data) throw ctx.errors.e404(`${name} not found`);
      return Promise.resolve(data);
    },

  };

  return modules;
};
