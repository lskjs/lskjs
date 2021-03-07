module.exports = {
  scripts: {},

  git: {
    commitMessage: 'chore(release): v${version} :tada:',
    tagName: 'v${version}',
    tagAnnotation: 'v${version}',
    commitArgs: '-S',
    requireCleanWorkingDir: false,
  },

  github: {
    release: false,
    releaseName: 'v${version}',
  },

  npm: {
    publish: false,
  },

  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
    },
  },
};
