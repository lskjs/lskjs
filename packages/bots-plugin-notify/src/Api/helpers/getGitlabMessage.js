import crypto from 'crypto-js';

import { getBool, getReqParams } from '../../utils';

export const getGitlabMessage = (req, message) => {
  const { gitlabEvent } = getReqParams(req);

  const gitlabMessage = {};
  gitlabMessage.event = gitlabEvent;
  gitlabMessage.type = 'gitlab';
  gitlabMessage.meta = req.body;
  gitlabMessage.isMd = getBool(req.query.isMd, false);

  const { object_kind: objectKind, ref, commits = [] } = message.meta;
  if (objectKind === 'push') {
    gitlabMessage.branch = ref.slice(ref.lastIndexOf('/') + 1);
    gitlabMessage.messageHash = crypto.MD5([commits.map((c) => c.id)].join('')).toString();
  }

  return { ...message, ...gitlabMessage };
};

export default getGitlabMessage;
