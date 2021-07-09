const getCommitsMessage = (commits) =>
  commits.map((commit) => {
    const short = commit.id.slice(0, 7);
    return `\
[${short}](${commit.url}) _${commit.author?.name}_ 
\`${commit.message}\``;
  });

export default function (message) {
  const { branch } = message;
  const { sender, repository = {}, commits = [] } = message.meta;

  const branches = [branch, ...(message.branches || [])];

  const commitsMessage = getCommitsMessage(commits);

  return `\
@${sender.login}
Push to \`${repository.name}/${branches.join(',')}\`

*Commits:*
${commitsMessage.join('\n')}
`;
}
