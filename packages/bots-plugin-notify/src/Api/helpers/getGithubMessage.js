import crypto from 'crypto-js';

import { getBool, getReqParams } from '../../utils';

export const getGithubMessage = (req, message) => {
  const { githubEvent } = getReqParams(req);

  const githubMessage = {};
  githubMessage.event = githubEvent;
  githubMessage.type = 'github';
  githubMessage.meta = req.body;
  githubMessage.isMd = getBool(req.query.isMd, false);
  githubMessage.isMd = true;

  const { ref, commits = [] } = githubMessage.meta;
  if (githubEvent === 'push') {
    githubMessage.branch = ref.slice(ref.lastIndexOf('/') + 1);
    githubMessage.messageHash = crypto.MD5([commits.map((c) => c.id)].join('')).toString();
  }

  return { ...message, ...githubMessage };
};

export default getGithubMessage;
