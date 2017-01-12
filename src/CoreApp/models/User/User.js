import _ from 'lodash'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const bcryptGenSalt = Promise.promisify(bcrypt.genSalt)
const bcryptHash = Promise.promisify(bcrypt.hash)
const bcryptCompare = Promise.promisify(bcrypt.compare)
import nodemailer from 'nodemailer'
import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema'

export function getSchema(ctx) {
  // const mongoose = ctx.db

  const transporter = (ctx.config.mail && ctx.config.mail.transport) &&
    Promise.promisifyAll(nodemailer.createTransport(ctx.config.mail.transport))

  const schema = new UniversalSchema({
    username: {
      type: String,
      required: true,
      index: { unique: true },
      tolowercase: true,
      trim: true,
    },
    password: {
      type: String,
      ref: () => ctx.models.v2.Profile.getMongooseName(),
    },
    name: {
      type: String,
    },
    role: {
      type: String,
    },
  }, {

    collection: 'user',
    timestamps: true,
  })


  schema.statics.isValidEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }
  schema.statics.generatePassword = function (length = 10) {
    return Math.random().toString(36).substr(2, length)
  }
  schema.methods.toJSON = function () {
    return _.omit(this.toObject(), ['password'])
  }
  schema.methods.getIdentity = function (params) {
    const object = _.pick(this.toObject(), ['_id', 'username', 'name', 'avatar', 'role'])
    if (!params) return object
    return Object.assign(object, params)
  }
  schema.methods.generateAuthToken = function (params) {
    return jwt.sign(this.getIdentity(params), ctx.config.jwt.secret)
  }
  schema.methods.verifyPassword = async function (password) {
    // return this.password === password
    return await bcryptCompare(password, this.password)
  }
  schema.methods.getEmail = function () {
    return this.email || this.toJSON().email || this.username || this.toJSON().username
  }
  schema.methods.sendEmail = function (inputParams) {
    if (!transporter) throw '!transporter'
    let params = inputParams
    if (typeof params === 'string') {
      params = { text: params }
    }

    const email = this.getEmail()
    const options = Object.assign({ to: email }, ctx.config.mail.options, params)
    // console.log({options});
    return transporter.sendMailAsync(options);
  }

  // schema.methods.toJSON = function () {
  //   return _.omit(this.toObject(), ['password'])
  // }
  // schema.methods.getIdentity = function () {
  //   return _.pick(this.toObject(), ['_id', 'username', 'name', 'avatar', 'role'])
  // }
  // schema.methods.genAuthToken = function () {
  //   return jwt.sign(this.getIdentity(), ctx.config.jwt.secret)
  // }
  // schema.methods.verifyPassword = function (password) {
  //   return this.password === password
  // }

  const SALT_WORK_FACTOR = 10
  schema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
    return bcryptGenSalt(SALT_WORK_FACTOR)
    .then(salt => {
      bcryptHash(this.password, salt)
      .then(hash => {
        this.password = hash
        next();
      })
    })
    .catch(next)
  });

  return schema
}

export default (ctx) => {
  const schema = getSchema(ctx);
  return ctx.db && ctx.db.model(schema.generateMongooseName('User'), schema.getMongooseSchema())
}
