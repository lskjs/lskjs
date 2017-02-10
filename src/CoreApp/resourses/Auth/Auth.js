import jwt from 'express-jwt';

export function canonize(str) {
  return str.toLowerCase().trim();
}


export default (ctx) => {
  const User = ctx.models.User;
  const resourse = {};

  resourse.validate = async function (req) {
    const user = await User.findById(req.user._id);
    if (!user) throw ctx.errors.e404('Не найден user в базе');
    return {
      __pack: 1,
      jwt: req.user,
      user,
      // token: user.getToken()
      // user,
    };
  };

  resourse.silent = async function (req) {
    const params = req.allParams();
    if (params.username) params.username = canonize(params.username);
    if (params.email) params.email = canonize(params.email);
    const username = `__s${Date.now()}__`;
    const user = new User(Object.assign({
      username,
      type: 'silent',
    }, params));
    await user.save();
    return {
      __pack: 1,
      signup: true,
      user,
      token: user.generateAuthToken(),
    };
  };
  resourse.getUserFields = function (req) {
    const params = req.allParams();
    if (params.login) {
      if (!params.username) params.username = params.login;
      if (!params.email && User.isValidEmail(params.login)) params.email = params.login; // if email
    }
    if (params.username) params.username = canonize(params.username);
    if (params.email) params.email = canonize(params.email);
    return params;
  };
  resourse.getUserCriteria = function (req) {
    const params = req.allParams();
    if (params.username) {
      return {
        username: canonize(params.username),
      };
    }
    if (params.email) {
      return {
        email: canonize(params.email),
      };
    }
    if (params.login) {
      return {
        $or: [
          {
            username: canonize(params.login),
          },
          {
            email: canonize(params.login),
          },
        ],
      };
    }
    throw ctx.errors.e400('Параметр username, email, login не передан');
  };
  resourse.signup = async function (req) {
    const userFields = resourse.getUserFields(req);
    const criteria = resourse.getUserCriteria(req);
    const existUser = await User.findOne(criteria);
    if (existUser) throw ctx.errors.e400('Username with this email or username is registered');

    const user = new User(userFields);
    await user.save();
    const emailOptions = {
      subject: 'Регистрация на сайте',
      text: 'Поздравляем с регистрацией',
    };

    let sended;
    try {
      await user.sendEmail(emailOptions);
      sended = true;
    } catch (err) {
      ctx.log.warn(err);
      sended = false;
    }

    return {
      __pack: 1,
      signup: true,
      emailSended: sended,
      user,
      token: user.generateAuthToken(),
    };
  };

  resourse.login = async function (req) {
    const params = req.allParams();

    if (!params.password) throw ctx.errors.e400('Параметр password не передан');

    const criteria = resourse.getUserCriteria(req);
    const user = await User.findOne(criteria);

    if (!user) throw ctx.errors.e404('Такой пользователь не найден');

    if (!await user.verifyPassword(params.password)) {
      throw ctx.errors.e400('Переданный пароль не подходит');
    }

    return {
      __pack: 1,
      user,
      token: user.generateAuthToken(),
    };
  };
  resourse.recovery = async function (req) {
    // const params = req.allParams();

    const criteria = resourse.getUserCriteria(req);

    const user = await User.findOne(criteria);
    if (!user) throw ctx.errors.e404('Такой пользователь не найден');

    const password = User.generatePassword();
    user.password = password;
    await user.save();
    console.log('user', user);
    const emailOptions = {
      subject: 'Восстановление пароля на сайте',
      text: `Ваш пароль: ${password}`,
    };

    let sended;
    try {
      await user.sendEmail(emailOptions);
      sended = true;
    } catch (err) {
      ctx.log.warn(err);
      sended = false;
    }

    return {
      __pack: 1,
      emailSended: sended,
    };
  };


  return resourse;
};
