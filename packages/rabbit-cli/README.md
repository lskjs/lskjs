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

*   [Basic commands](#basic-commands)

*   [Broker URI specification](#broker-uri-specification)

    *   *   [Examples](#examples)

*   [Format specification pub and pipe command](#format-specification-pub-and-pipe-command)

*   [Environment variables](#environment-variables)

    *   *   [Default RabbitMQ broker](#default-rabbitmq-broker)
        *   [Default RabbitMQ config](#default-rabbitmq-config)

*   [Publish messages](#publish-messages)

    *   *   [Examples messages](#examples-messages)
        *   [Examples command](#examples-command)

    *   [Publish messages from MongoDb](#publish-messages-from-mongodb)

        *   [Install mongoexport](#install-mongoexport)
        *   [How to usage](#how-to-usage)
        *   [Examples command](#examples-command-1)

    *   [Publish messages from Clickhouse](#publish-messages-from-clickhouse)

        *   [Install clickhouse-client](#install-clickhouse-client)
        *   [How to usage](#how-to-usage-1)
        *   [Examples command](#examples-command-2)

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

# Basic commands

Lskrabbit understands the following commands:

*   `pub` - publish messages to an exchange or queues.
*   `pipe` - pipe messages to an exchange or queues.

See the examples section for further information.

# Broker URI specification

The specification of the RabbitMQ broker URI follows the [AMQP URI specification](https://www.rabbitmq.com/uri-spec.html) as implemented by the [go RabbitMQ client library](https://github.com/streadway/amqp).

### Examples

*   `amqp://guest:guest@localhost:5672/`
*   `amqps://guest:guest@my-broker.dev:5671/`
*   `amqps://guest:guest@my-broker.dev:5671/vhost`

Note that according to [RFC3986](https://datatracker.ietf.org/doc/html/rfc3986) it might be necessary to escape certain characters like e.g. `?` (%3F) or `#` (%23) as otherwise parsing of the URI may fail with an error.

# Format specification pub and pipe command

Format has the following effect on the output:

| FORMAT |      Format on console        |            Format of saved messages             |
|--------|-------------------------------|-------------------------------------------------|
| `raw`  | Pretty-printed metadata + raw | Message body	Metadata as JSON-File + Body as-is |
| `json` | Pretty-printed JSON           |              Pretty-printed JSON                |

# Environment variables

Use environment variables to specify standard values for variables.

### Default RabbitMQ broker

The URI of the RabbitMQ broker can be set with the environment variable AMQP_URI. Example:

```bash
export AMQP_URI=amqp://guest:guest@localhost:5672/
```

### Default RabbitMQ config

The default QUEUE, EXCHANGE, etc can be set using the environment variables. Example:

```bash
export AMQP_QUEUE=lsk_queue
export AMQP_EXCHANGE=lsk_exchange
export AMQP_KEY=lsk_key
export AMQP_PREFETCH=10
export AMQP_MAX_PRIORITY=10
echo "Hello" | lskrabbit pub
```

# Publish messages

The pub command is used to publish messages to an exchange. The messages to be published are either read from json/txt file or stream. The general form of the pub command is:

```bash
cat [SOURCE] | lskrabbit pub 
             [--uri=URI]
             [--queue=QUEUE]
             [--exchange=EXCHANGE]
             [--key=KEY]
             [--prefetch=PREFETCH]
             [--concurrency=CONCORRENCY]
             [--extract=EXTRACT]
             [--parse=PARSE]
```

*Command params*

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

Message routing is either specified with a routing key and the `--key` option. `--extract` options allows you to convert data to the desired format. Option is a callback-function. You can also parse the data using callback-function in `--parse` option.

JSON Message has many configurable parameters. Description in the table:

*Message params*

|   Key  | Description|
|--------|------------|
|   \_q   | queue      |
|   \_e   | exchange   |
|   \_k   | key        |
|   \_p   | priority   |
|   \_exp | expiration |
|   \_pr  | persistent |

### Examples messages

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

### Examples command

*   `echo "hello" | rabtap pub --exchange lsk_exchange` - publish "hello" to exchange lsk_exchange

*   `echo '{ "_id":"123" }' | lskrabbit pub` - publish JSONEachRow

*   `cat tests/messages.json | lskrabbit pub` - publish messages from JSON file

*   `cat tests/messages.json | docker run --rm -i lskjs/rabbit-cli pub` - publish messages from JSON file with docker image

*   `cat tests/messages.json | DEBUG=lsk lskrabbit pub` - publish from JSON file with DEBUG

*   `cat tests/messages.txt | lskrabbit pub --queue lsk_queue` - publish messages to queue from txt file

*   `cat tests/messages.txt | lskrabbit pub -x "row => ({...row, test: row, _e: 'lsk_exchange' })"` - publish messages with extract

## Publish messages from MongoDb

### Install mongoexport

With brew:

```bash
brew install mongodb/brew/mongodb-database-tools
```

Or other [MacOs](https://docs.mongodb.com/database-tools/installation/installation-macos/), [Linux](https://docs.mongodb.com/database-tools/installation/installation-linux/), [Windows](https://docs.mongodb.com/database-tools/installation/installation-windows/).

### How to usage

```bash
mongoexport [--uri=MONGO_URI] [--collection=MONGO_COLLECTION] | lskrabbit pub
            [--uri=URI]
            [--queue=QUEUE]
            [--exchange=EXCHANGE]
            [--key=KEY]
            [--prefetch=PREFETCH]
            [--concurrency=CONCORRENCY]
            [--extract=EXTRACT]
            [--parse=PARSE]
```

### Examples command

*   `mongoexport --uri=mongodb://localhost:27017/ --collection=lsk_test | lskrabbit pub --uri amqp://localhost --queue lsk_queue` - publish messages from mongoDb collection

## Publish messages from Clickhouse

### Install clickhouse-client

Before you start, need to install [clickhouse-client](https://clickhouse.com/docs/en/getting-started/install/).

### How to usage

```bash
clickhouse-client
            [--host=CLHOST]
            [--port=PORT]
            [--database=CLDB]
            [--password=CLPASSWORD]
            [--multiquery=MULTIQUERY] | lskrabbit pub
            [--uri=URI]
            [--queue=QUEUE]
            [--exchange=EXCHANGE]
            [--key=KEY]
            [--prefetch=PREFETCH]
            [--concurrency=CONCORRENCY]
            [--extract=EXTRACT]
            [--parse=PARSE]
```

### Examples command

*   `clickhouse-client -h localhost --port 9000 -d default  --password qwerty --multiquery < clickhouse.sql | lskrabbit pub` - publish messages from clickhouse

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
