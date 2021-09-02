import utils from '../../utils';

const { ignoreMd, getCode, getLink } = utils;

const getCommitsMessage = (commits, provider) =>
  commits.map((commit) => {
    const short = commit.id.slice(0, 7);

    const formatAuthor = ignoreMd(commit.author?.name, provider);
    const fotmatCommit = getCode(commit.message, provider);

    return `\
${getLink(short, commit.url, provider)} _${formatAuthor}_
${fotmatCommit}`;
  });

export default function (message, provider) {
  const { branch } = message;
  const { sender, repository = {}, commits = [] } = message.meta;

  const branches = [branch, ...(message.branches || [])];

  const commitsMessage = getCommitsMessage(commits, provider);
  const formatPath = getCode(`${repository.name}/${branches.join(',')}`, provider);

  return `\
@${sender.login}
Push to ${formatPath}

*Commits:*
${commitsMessage.join('\n')}
`;
}
