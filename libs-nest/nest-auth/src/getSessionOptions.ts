import { isDev } from '@lskjs/env';
import { Err } from '@lskjs/err';
import { ConfigService } from '@lskjs/nest-config';
import MongoSessionStore from 'connect-mongo';
import { SessionOptions } from 'express-session';

export function getSessionOptions(
  app: any,
  // TODO: хз как прописать тип
  // NestExpressApplication<Server<typeof IncomingMessage, typeof ServerResponse>>,
): SessionOptions {
  const configService = app.get(ConfigService);

  const mongoUrl = configService.get('dbs.mongodb.uri');
  if (!mongoUrl) throw new Err('!config.dbs.mongodb.uri');
  const sessionSecret = configService.get('auth.session.secret');
  if (!sessionSecret) throw new Err('!config.auth.session.secret');
  const cookieName = configService.get('auth.session.cookieName');
  if (!cookieName) throw new Err('!config.auth.session.cookieName');

  const sessionOptions: SessionOptions = {
    store: MongoSessionStore.create({ mongoUrl }),
    name: cookieName,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: !isDev,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      httpOnly: true,
      sameSite: 'lax',
    },
  };
  return sessionOptions;
}
