import utils from '../../utils';

const { ignoreMd, getCode, getLink } = utils;

const getCommitsMessage = (commits, provider) =>
  commits.map((commit) => {
    const short = commit.id.slice(0, 7);
    const formatCommit = getCode(commit.message, provider);

    return `\
${getLink(short, commit.url, provider)} _${commit.author?.name}_ 
${formatCommit}`;
  });

export default function (message, provider) {
  const { branch } = message;
  const { user_username: username, repository = {}, commits = [] } = message.meta;

  const branches = [branch, ...(message.branches || [])];

  const commitsMessage = getCommitsMessage(commits, provider);
  const formatUsername = ignoreMd(username, provider);
  const formatPath = getCode(`${ignoreMd(repository.name, provider)}/${branches.join(',')}`, provider);

  return `\
@${formatUsername}
Push to ${formatPath}

*Commits:*
${commitsMessage.join('\n')}
`;
}
