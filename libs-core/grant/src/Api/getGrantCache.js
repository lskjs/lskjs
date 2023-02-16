import Err from '@lskjs/err';

export async function getGrantCache(req, rules) {
  const grant = await this.app.module('grant');
  const userId = req.user ? req.user._id : null;
  const grantCache = await grant.getCache(rules, {
    user: req.user,
    userId,
    cache: grant.__cache.fork({ prefix: userId || 'guest' }),
  });

  grantCache.checkAccess = async function (action) {
    const can = await this.can(action);
    if (can) return;
    throw new Err('grant.access', {
      status: 403,
      data: {
        action,
      },
    });
  };

  return grantCache;
}

export default getGrantCache;
