# LSK.js – CLI

> LSK.js CLI (Command Line Interface) is the easiest way to create and manage LSK.js project.

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit&label&color=red&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/image)](https://www.npmjs.com/package/@lskjs/cli)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/cli)](https://www.npmjs.com/package/@lskjs/cli)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/cli)](https://bundlephobia.com/result?p=@lskjs/cli)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/cli)](https://www.npmjs.com/package/@lskjs/cli)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/cli)](https://bundlephobia.com/result?p=@lskjs/cli)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/cli)](https://bundlephobia.com/result?p=@lskjs/cli)
[![License](https://badgen.net//github/license/lskjs/cli)](https://github.com/cli/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- ## Getting Started -->

<!-- toc -->
* [LSK.js – CLI](#lskjs--cli)
* [Quick start](#quick-start)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

<!-- quickstart -->
# Quick start
```sh-session
$ npx lsk init test3
...waiting...
============= SUCCESS =============
now you should do: cd test3 && npm run dev
```
<!-- quickstarttop -->

![LSK.js – CLI](/blog/init.jpg)

# Usage
<!-- usage -->
```sh-session
$ npm install -g @lskjs/cli
$ lsk COMMAND
running command...
$ lsk (-v|--version|version)
@lskjs/cli/3.0.0-alpha.7 darwin-arm64 node-v19.3.0
$ lsk --help [COMMAND]
USAGE
  $ lsk COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`lsk bootstrap`](#lsk-bootstrap)
* [`lsk copy FROM TO`](#lsk-copy-from-to)
* [`lsk help [COMMAND]`](#lsk-help-command)
* [`lsk info`](#lsk-info)
* [`lsk init PROJECTNAME`](#lsk-init-projectname)
* [`lsk link FROM TO`](#lsk-link-from-to)
* [`lsk linkall CONFIG`](#lsk-linkall-config)
* [`lsk log`](#lsk-log)
* [`lsk run SCRIPT`](#lsk-run-script)
* [`lsk update`](#lsk-update)

## `lsk bootstrap`

```
USAGE
  $ lsk bootstrap
```

_See code: [lib/commands/bootstrap.js](https://github.com/lskjs/cli/blob/v3.0.0-alpha.7/lib/commands/bootstrap.js)_

## `lsk copy FROM TO`

Recursive incremental copy dirs with rsync

```
USAGE
  $ lsk copy FROM TO

OPTIONS
  -g, --git=git                  include .git folder
  -n, --nodemodules=nodemodules  include node_modules folder

DESCRIPTION
  ...
```

_See code: [lib/commands/copy.js](https://github.com/lskjs/cli/blob/v3.0.0-alpha.7/lib/commands/copy.js)_

## `lsk help [COMMAND]`

Display help for lsk.

```
USAGE
  $ lsk help [COMMAND]

ARGUMENTS
  COMMAND  Command to show help for.

OPTIONS
  -n, --nested-commands  Include all nested commands in the output.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `lsk info`

```
USAGE
  $ lsk info
```

_See code: [lib/commands/info.js](https://github.com/lskjs/cli/blob/v3.0.0-alpha.7/lib/commands/info.js)_

## `lsk init PROJECTNAME`

Init new LSK.js project

```
USAGE
  $ lsk init PROJECTNAME

OPTIONS
  -t, --template=template  An example to bootstrap the app with. You can use an example name from the LSK.js repo or a
                           GitHub URL. The URL can use any branch and/or subdirectory.

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [lib/commands/init.js](https://github.com/lskjs/cli/blob/v3.0.0-alpha.7/lib/commands/init.js)_

## `lsk link FROM TO`

Recursive watching and incremental copy dirs with rsync

```
USAGE
  $ lsk link FROM TO

OPTIONS
  -g, --git=git                  include .git folder
  -n, --nodemodules=nodemodules  include node_modules folder

DESCRIPTION
  ...
```

_See code: [lib/commands/link.js](https://github.com/lskjs/cli/blob/v3.0.0-alpha.7/lib/commands/link.js)_

## `lsk linkall CONFIG`

Recursive watching and incremental copy dirs with rsync

```
USAGE
  $ lsk linkall CONFIG

OPTIONS
  -g, --git=git                  include .git folder
  -n, --nodemodules=nodemodules  include node_modules folder

DESCRIPTION
  ...
```

_See code: [lib/commands/linkall.js](https://github.com/lskjs/cli/blob/v3.0.0-alpha.7/lib/commands/linkall.js)_

## `lsk log`

```
USAGE
  $ lsk log
```

_See code: [lib/commands/log.js](https://github.com/lskjs/cli/blob/v3.0.0-alpha.7/lib/commands/log.js)_

## `lsk run SCRIPT`

```
USAGE
  $ lsk run SCRIPT
```

_See code: [lib/commands/run.js](https://github.com/lskjs/cli/blob/v3.0.0-alpha.7/lib/commands/run.js)_

## `lsk update`

```
USAGE
  $ lsk update
```

_See code: [lib/commands/update.js](https://github.com/lskjs/cli/blob/v3.0.0-alpha.7/lib/commands/update.js)_
<!-- commandsstop -->



## Contributors ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://isuvorov.com.com"><img src="https://avatars2.githubusercontent.com/u/1056977?v=4" width="100px;" alt=""/><br /><sub><b>Igor Suvorov</b></sub></a><br /><a href="#question-isuvorov" title="Answering Questions">💬</a> <a href="isuvorov/lib-starter-kit/isuvorov/lib-starter-kit/commits?author=isuvorov" title="Code">💻</a> <a href="#design-isuvorov" title="Design">🎨</a> <a href="isuvorov/lib-starter-kit/isuvorov/lib-starter-kit/commits?author=isuvorov" title="Documentation">📖</a> <a href="#example-isuvorov" title="Examples">💡</a> <a href="#ideas-isuvorov" title="Ideas, Planning, & Feedback">🤔</a> <a href="isuvorov/lib-starter-kit/isuvorov/lib-starter-kit/pulls?q=is%3Apr+reviewed-by%3Aisuvorov" title="Reviewed Pull Requests">👀</a> <a href="isuvorov/lib-starter-kit/isuvorov/lib-starter-kit/commits?author=isuvorov" title="Tests">⚠️</a> <a href="#a11y-isuvorov" title="Accessibility">️️️️♿️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
