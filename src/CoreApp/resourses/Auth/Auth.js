import jwt from 'express-jwt'

export function canonize(str) {
  return str.toLowerCase().trim()
}

export default (ctx) => {
  const User = ctx.models.User
  const resourse = {}

  resourse.validate = async function (req) {
    const user = await User.findById(req.user._id)
    if (!user) throw ctx.errors.e404('Не найден user в базе')
    return {
      __pack: 1,
      jwt: req.user,
      user: user,
      // token: user.getToken()
      // user,
    }
  }

  resourse.silent = async function (req) {
    const params = req.allParams()
    if (params.username) params.username = canonize(params.username)
    if (params.email) params.email = canonize(params.email)
    const username = '__s' + Date.now() + '__'
    const user = new User(Object.assign({
      username,
      type: 'silent',
    }, params))
    await user.save()
    return {
      __pack: 1,
      signup: true,
      user,
      token: user.generateAuthToken(),
    }
  }
  resourse.getUserFields = function (req) {
    const params = req.allParams()
    if (params.login) {
      if (!params.username) params.username = params.login
      if (!params.email && User.isValidEmail(params.login)) params.email = params.login // if email
    }
    if (params.username) params.username = canonize(params.username)
    if (params.email) params.email = canonize(params.email)
    return params
  }
  resourse.getUserCriteria = function (req) {
    const params = req.allParams()
    if (params.username) {
      return {
        username: canonize(params.username),
      }
    }
    if (params.email) {
      return {
        email: canonize(params.email),
      }
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
      }
    }
    throw ctx.errors.e400('Параметр username, email, login не передан')
  }
  resourse.signup = async function (req) {
    const userFields = resourse.getUserFields(req)
    const criteria = resourse.getUserCriteria(req)
    const existUser = await User.findOne(criteria)
    if (existUser) throw ctx.errors.e400('Username with this email or username is registered')

    const user = new User(userFields)
    await user.save()
    const emailOptions = {
      subject: 'Регистрация на сайте',
      text: 'Поздравляем с регистрацией',
    }

    let sended
    try {
      await user.sendEmail(emailOptions)
      sended = true
    } catch (err) {
      ctx.log.warn(err)
      sended = false
    }

    return {
      __pack: 1,
      signup: true,
      emailSended: sended,
      user,
      token: user.generateAuthToken(),
    }
  }

  resourse.login = async function (req) {
    const params = req.allParams()

    if (!params.password) throw ctx.errors.e400('Параметр password не передан')

    const criteria = resourse.getUserCriteria(req)
    const user = await User.findOne(criteria)

    if (!user) throw ctx.errors.e404('Такой пользователь не найден')

    if (!await user.verifyPassword(params.password)) {
      throw ctx.errors.e400('Переданный пароль не подходит')
    }

    return {
      __pack: 1,
      user,
      token: user.generateAuthToken(),
    }
  }
  resourse.recovery = async function (req) {
    const params = req.allParams()

    const criteria = resourse.getUserCriteria(req)

    const user = await User.findOne(criteria)
    if (!user) throw ctx.errors.e404('Такой пользователь не найден')

    const password = User.generatePassword()
    user.password = password
    await user.save()
    console.log('user', user);
    const emailOptions = {
      subject: 'Восстановление пароля на сайте',
      text: `Ваш пароль: ${password}`,
    }

    let sended
    try {
      await user.sendEmail(emailOptions)
      sended = true
    } catch (err) {
      ctx.log.warn(err)
      sended = false
    }

    return {
      __pack: 1,
      emailSended: sended,
    }
  }

  resourse.getToken = function (req) {
    if (req.headers.authorization && req.headers.authorization.split( ' ' )[ 0 ] === 'Bearer') {
      return req.headers.authorization.split( ' ' )[ 1 ]
    } else if (req.headers['x-access-token']) {
      return req.headers['x-access-token'];
    } else if ( req.query && req.query.token ) {
      return req.query.token
    } else if ( req.cookies && req.cookies.token  ) {
      return req.cookies.token
    }
    if (__DEV__ && ctx.config.jwt && ctx.config.jwt.devToken) return ctx.config.jwt.devToken
    return null;
  }

  resourse.parseToken = function (req, res, next) {
    const token = resourse.getToken(req)
    req.token = token
    next()
  }
  resourse.parseUser = function (req, res, next) {
    if (!ctx.config.jwt) {
      // req.user = {}
      return next()
    }
    const options = {
      secret: ctx.config.jwt.secret,
      getToken: req => req.token,
    }
    jwt(options)(req, res, (err) => {
      if (err) req._errJwt = err
      next()
    })
  }

  resourse.isAuth = function (req, res, next) {
    if (req._errJwt) return next(req._errJwt)
    if (!req.user || !req.user._id) throw ctx.errors.e401('!req.user')
    next()
  }

  return resourse
}
