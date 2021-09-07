const getCommitsMessage = (commits, bot) =>
  commits.map((commit) => {
    const short = commit.id.slice(0, 7);

    const formatAuthor = bot.ignoreMd(commit.author?.name);
    const fotmatCommit = bot.formatCode(commit.message);

    return `\
${bot.formatLink(short, commit.url)} _${formatAuthor}_
${fotmatCommit}`;
  });

export function push(message, bot) {
  const { branch } = message;
  const { sender, repository = {}, commits = [] } = message.meta;

  const branches = [branch, ...(message.branches || [])];

  const commitsMessage = getCommitsMessage(commits, bot);

  const formatPath = bot.formatCode(`${repository.name}/${branches.join(',')}`);

  return `\
@${sender.login}
Push to ${formatPath}

*Commits:*
${commitsMessage.join('\n')}
`;
}

export default push;
