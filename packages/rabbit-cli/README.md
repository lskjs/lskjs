# LSK.js – rabbit-cli

> @lskjs/rabbit-cli – CLI for quick post json's to RabbitMQ

[![LSK logo](https://badgen.net/badge/icon/MADE%20BY%20LSK?icon=zeit\&label\&color=red\&labelColor=red)](https://github.com/lskjs)
[![NPM version](https://badgen.net/npm/v/@lskjs/rabbit-cli)](https://www.npmjs.com/package/@lskjs/rabbit-cli)
[![NPM downloads](https://badgen.net/npm/dt/@lskjs/rabbit-cli)](https://www.npmjs.com/package/@lskjs/rabbit-cli)
[![NPM Dependency count](https://badgen.net/bundlephobia/dependency-count/@lskjs/rabbit-cli)](https://bundlephobia.com/result?p=@lskjs/rabbit-cli)
[![Have TypeScript types](https://badgen.net/npm/types/@lskjs/rabbit-cli)](https://www.npmjs.com/package/@lskjs/rabbit-cli)
[![Have tree shaking](https://badgen.net/bundlephobia/tree-shaking/@lskjs/rabbit-cli)](https://bundlephobia.com/result?p=@lskjs/rabbit-cli)
[![NPM Package size](https://badgen.net/bundlephobia/minzip/@lskjs/rabbit-cli)](https://bundlephobia.com/result?p=@lskjs/rabbit-cli)
[![Package size](https://badgen.net//github/license/lskjs/lskjs)](https://github.com/lskjs/lskjs/blob/master/LICENSE)
[![Ask us in Telegram](https://img.shields.io/badge/Ask%20us%20in-Telegram-brightblue.svg)](https://t.me/lskjschat)

<!-- template file="scripts/templates/preview.md" start -->

<!-- template end -->

***

<!-- # 📒 Table of contents  -->

# Table of contents

*   [⌨️ Install](#️-install)

*   [Global install](#global-install)

*   [Publish messages](#publish-messages)

    *   [Simple publish messages](#simple-publish-messages)

        *   [Examples:](#examples)

    *   [Publish messages with docker](#publish-messages-with-docker)

        *   [Examples:](#examples-1)

*   [📖 License](#-license)

*   [👥 Contributors](#-contributors)

*   [👏 Contributing](#-contributing)

*   [📮 Any questions? Always welcome :)](#-any-questions-always-welcome-)

# ⌨️ Install

```sh
# yarn
yarn i @lskjs/rabbit-cli 

# npm
npm i @lskjs/rabbit-cli 
```

***

# Global install

```bash
npm i -g @lskjs/rabbit-cli
```

# Publish messages

## Simple publish messages

```bash
cat [SOURCE] | lskrabbit pub 
  [--uri=URI] [--queue=QUEUE] [--exchange=EXCHANGE]
  [--key=KEY] [--prefetch=PREFETCH] [--concurrency=CONCORRENCY]
  [--extract=EXTRACT] [--parse=PARSE]
```

*Request params*

| Key (short) | Key | Description |
|----|--------------|-------------|
| -u | --uri        | URI RabbiqMQ |
| -q | --queue      | Queue RabbitMq |
| -e | --exchange   | Exchange |
| -k | --key        | Routing key |
| -p | --prefetch   | Prefetch |
| -c | --concurrency| Concurrency |
| -x | --extract    | Extract callback |
| -r | --parse      | str => json |

*Message params*

|   Key  | Description|
|--------|------------|
|   \_q   | queue      |
|   \_e   | exchange   |
|   \_k   | key        |
|   \_p   | priority   |
|   \_exp | expiration |
|   \_pr  | persistent |

### Examples:

*tests/messages.json*

```json
{ "_id": 111, "_q": "lsk_queue" }
{ "_id": 222, "_q": "lsk_queue", "_p": 10 }
{ "_id": 333, "_q": "lsk_queue", "_exp": 60000 }
{ "_id": 444, "_q": "lsk_queue", "_p": 11 }
{ "_id": 555, "_q": "lsk_queue_2" }
{ "_id": 666, "_e": "lsk_exchange" }
{ "_id": 777, "_e": "lsk_exchange", "_k": "lsk_key" }
{ "_id": 888, "_e": "lsk_exchange", "_k": "lsk_key_2" }
```

*tests/messages.txt*

```txt
{ "test": 123 }
{ "test": 546 }
```

Simple publish

```bash
cat tests/messages.json | lskrabbit pub --uri amqp://localhost
```

Publish with DEBUG

```bash
cat tests/messages.json | DEBUG=lsk lskrabbit pub --uri amqp://localhost
```

Publish with extract

```bash
cat tests/messages.txt | lskrabbit pub --uri amqp://localhost --queue lsk_queue -x "row => ({...row, test: row, _e: 'lsk_exchange' })"
```

## Publish messages with docker

```bash
cat [SOURCE] | docker run --rm -i lskjs/rabbit-cli pub
  [--uri=URI] [--queue=QUEUE] [--exchange=EXCHANGE]
  [--key=KEY] [--prefetch=PREFETCH] [--concurrency=CONCORRENCY]
  [--extract=EXTRACT] [--parse=PARSE]
```

### Examples:

```bash
cat tests/messages.txt | docker run --rm -i lskjs/rabbit-cli pub --uri amqp://localhost --queue lsk_queue -x "row => ({ ...row, test: row })"
```

# 📖 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

# 👥 Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<table>
  <tr>
    <td align="center"><a href="https://isuvorov.com"><img src="https://avatars2.githubusercontent.com/u/1056977?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Igor Suvorov</b></sub></a><br /><a href="lskjs/lskjs///commits?author=isuvorov" title="Code">💻</a> <a href="#design-isuvorov" title="Design">🎨</a> <a href="#ideas-isuvorov" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

# 👏 Contributing

1.  Fork it (<https://github.com/yourname/yourproject/fork>)
2.  Create your feature branch (`git checkout -b features/fooBar`)
3.  Commit your changes (`git commit -am 'feat(image): Add some fooBar'`)
4.  Push to the branch (`git push origin feature/fooBar`)
5.  Create a new Pull Request

# 📮 Any questions? Always welcome :)

*   [Email](mailto:hi@isuvorov.com)
*   [LSK.news – Telegram channel](https://t.me/lskjs)
*   [Спроси нас в телеграме ;)](https://t.me/lskjschat)
