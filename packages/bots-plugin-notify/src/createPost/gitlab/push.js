import utils from '../../utils';

const { ignoreMd } = utils;

const getCommitsMessage = (commits) =>
  commits.map((commit) => {
    const short = commit.id.slice(0, 7);
    return `\
[${short}](${commit.url}) _${commit.author?.name}_ 
\`${commit.message}\``;
  });

export default function (message) {
  const { branch } = message;
  const { user_username: username, repository = {}, commits = [] } = message.meta;

  const branches = [branch, ...(message.branches || [])];

  const commitsMessage = getCommitsMessage(commits);

  return `\
@${ignoreMd(username)}
Push to \`${ignoreMd(repository.name)}/${branches.join(',')}\`

*Commits:*
${commitsMessage.join('\n')}
`;
}
