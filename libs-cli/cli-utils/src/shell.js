const { spawn } = require('./spawn');
const { pathexec } = require('./pathexec');

function shell(command, options = {}) {
  if (command.startsWith('lsk run ')) {
    return pathexec(command.slice('lsk run '.length), options);
  }
  if (command.startsWith('pathexec ')) {
    return pathexec(command.slice('pathexec '.length), options);
  }
  const { args = [], ...other } = options;
  return spawn(command, args, {
    shell: true,
    stdio: 'inherit',
    ...other,
  });
}

module.exports = {
  shell,
};
