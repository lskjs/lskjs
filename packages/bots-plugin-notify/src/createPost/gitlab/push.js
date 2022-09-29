const getCommitsMessage = (commits, bot, isMd) =>
  commits.map((commit) => {
    const short = commit.id.slice(0, 7);
    const formatCommit = bot.formatCode(commit.message, isMd);
    const formatAuthor = bot.formatItalics(commit.author?.name, isMd);

    return `\
${bot.formatLink(short, commit.url, isMd)} ${formatAuthor} 
${formatCommit}`;
  });

export function push(message, bot) {
  const { branch, isMd } = message;
  const { user_username: username, repository = {}, commits = [] } = message.meta;

  const branches = [branch, ...(message.branches || [])];

  const commitsMessage = getCommitsMessage(commits, bot, isMd);
  const formatUsername = bot.ignoreMd(username, isMd);
  const formatPath = bot.formatCode(`${bot.ignoreMd(repository.name, isMd)}/${branches.join(',')}`, isMd);

  return `\
@${formatUsername}
Push to ${formatPath}

${bot.formatBold('Commits:')}
${commitsMessage.join('\n')}
`;
}

export default push;
