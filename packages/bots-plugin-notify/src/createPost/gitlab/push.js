const getCommitsMessage = (commits, bot) =>
  commits.map((commit) => {
    const short = commit.id.slice(0, 7);
    const formatCommit = bot.formatCode(commit.message);

    return `\
${bot.formatLink(short, commit.url)} _${commit.author?.name}_ 
${formatCommit}`;
  });

export function push(message, bot) {
  const { branch } = message;
  const { user_username: username, repository = {}, commits = [] } = message.meta;

  const branches = [branch, ...(message.branches || [])];

  const commitsMessage = getCommitsMessage(commits, bot);
  const formatUsername = bot.ignoreMd(username);
  const formatPath = bot.formatCode(`${bot.ignoreMd(repository.name)}/${branches.join(',')}`);

  return `\
@${formatUsername}
Push to ${formatPath}

*Commits:*
${commitsMessage.join('\n')}
`;
}

export default push;
