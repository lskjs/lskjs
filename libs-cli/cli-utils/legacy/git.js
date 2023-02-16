#!/usr/bin/env node
const axios = require('axios');
const { shell } = require('./shell');
const uniqBy = require('lodash/uniqBy');

const getGithubInfo = async ({ repo, branch }) => {
  const apiUrl = `https://api.github.com/repos/${repo}/commits/${branch}`;
  const { data } = axios(apiUrl);
  return data;
};
const getGitCommitSha = async (options = {}) => shell('git rev-parse HEAD', options);

const getGitUrl = (initUrl) => {
  let originalUrl = initUrl;
  if (!originalUrl.startsWith('http') && !originalUrl.startsWith('ssh')) {
    originalUrl = `ssh://${originalUrl}`;
  }
  if (originalUrl.indexOf('git@github.com:') !== -1) {
    originalUrl = originalUrl.replace('git@github.com:', 'git@github.com/');
  }
  if (originalUrl.indexOf('.git') !== -1) {
    originalUrl = originalUrl.replace('.git', '');
  }
  return originalUrl;
};

// TODO: tests
const getGitRemotes = async (options = {}) => {
  const stdout = shell('git remote -v', { silence: true, options });
  return uniqBy(
    stdout
      .split('\n')
      .filter(Boolean)
      .map((row) => {
        const [origin, git] = row.trim().split('\t').filter(Boolean);
        const [url, type] = git.split(' ');
        const originalUrl = getGitUrl(url);
        // console.log({url, originalUrl});
        try {
          const { hostname, pathname } = new URL(originalUrl);
          const gitUrl = `https://${hostname}${pathname}`;
          const type2 = type.substr(1, type.length - 2);
          return { origin, git, url: gitUrl, pathname, repo: pathname.split('.')[0], type: type2 };
        } catch (err) {
          return null;
        }
      }),
    (g) => g.url,
  );
};

module.exports = {
  getGithubInfo,
  getGitCommitSha,
  getGitUrl,
  getGitRemotes,
};
