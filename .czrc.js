const glob = require('glob');

const globMap = (pattern, fn) =>
  glob
    .sync(pattern)
    .map(fn || (path => path))
    .map(path => path.replace(/\/$/, ''));

const exclude = variants => path => variants.every(variant => !path.includes(variant));

module.exports = {
  // prettier-ignore
  types: [
        { value: 'feat',     name: 'feat:     A new feature' },
        { value: 'fix',      name: 'fix:      A bug fix' },
        { value: 'docs',     name: 'docs:     Documentation only changes' },
        { value: 'style',    name: 'style:    Changes that do not affect the meaning of the code\n' +
                                   '          (white-space, formatting, missing semi-colons, etc)',
        },
        { value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature' },
        { value: 'perf',     name: 'perf:     A code change that improves performance' },
        { value: 'test',     name: 'test:     Adding missing tests' },
        { value: 'chore',    name: 'chore:    Changes to the build process or auxiliary tools\n' +
                                   '          and libraries such as documentation generation',
        },
        { value: 'revert',   name: 'revert:   Revert to a commit' },
        { value: 'build',    name: 'build:    Changes that affect the build system or external dependencies\n' +
                                   '          (example scopes: gulp, broccoli, npm)',
        }
    ],
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'revert'],
  rules: {
    'scope-case': [0, 'always', 'lower-case'],
  }
};
