#!/usr/bin/env node
const { shell } = require('./shell');
const Err = require('@lskjs/err');
const { getGithubInfo, getGitCommitSha, getGitRemotes } = require('./git');

const update = async (options = {}) => {
  await shell(`git pull`, options);
};

const isUpdateAvailable = async ({ repo, branch = 'master' } = {}, options = {}) => {
  if (!repo) throw new Err('!repo');
  const localSha = await getGitCommitSha(options);
  // const repo = 'isuvorov/bash';
  // const branch = 'master';
  const data = await getGithubInfo({
    repo,
    branch,
  });

  const remoteSha = data?.commit?.tree?.sha;
  return localSha !== remoteSha;
};

const autoupdate = ({ branch = 'master' } = {}, { cwd } = {}) => {
  // TODO: cache
  const remotes = await getGitRemotes({ cwd });
  if (!remotes) throw '!remotes';
  const remote = remotes[0];
  if (!remote) throw '!remote';
  const yes = await isUpdateAvailable({ ...remote, branch }, { cwd });
  if (!yes) return;
  // TODO: Y/n dialog
  update({ cwd });
};

module.exports = {
  isUpdateAvailable,
  update,
  autoupdate,
};
