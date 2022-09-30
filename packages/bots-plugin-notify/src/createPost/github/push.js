const getCommitsMessage = (commits, bot, isMd) =>
  commits.map((commit) => {
    const short = commit.id.slice(0, 7);

    const fotmatedLink = bot.formatLink(short, commit.url, isMd);
    const formatedAuthor = bot.formatItalics(bot.ignoreMd(commit.author?.name, isMd), isMd);
    const fotmatedCommit = bot.formatCode(commit.message, isMd);

    return `\
${fotmatedLink} ${formatedAuthor}
${fotmatedCommit}`;
  });

export function push(message, bot) {
  const { branch, isMd } = message;
  const { sender, repository = {}, commits = [] } = message.meta;

  const branches = [branch, ...(message.branches || [])];

  const commitsMessage = getCommitsMessage(commits, bot, isMd);

  const formatedPath = bot.formatCode(`${bot.ignoreMd(repository.name, isMd)}/${branches.join(',')}`, isMd);

  return `\
@${sender.login}
Push to ${formatedPath}

${bot.formatBold('Commits:', isMd)}
${commitsMessage.join('\n')}
`;
}

export default push;
