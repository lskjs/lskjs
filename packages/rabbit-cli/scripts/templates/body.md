# Global install

```bash
npm i -g @lskjs/rabbit-cli
```

# Basic commands

Lskrabbit understands the following commands:

- `pub` - publish messages to an exchange or queues.
- `pipe` - pipe messages to an exchange or queues.

See the examples section for further information.

# Broker URI specification

The specification of the RabbitMQ broker URI follows the [AMQP URI specification](https://www.rabbitmq.com/uri-spec.html) as implemented by the [go RabbitMQ client library](https://github.com/streadway/amqp).

### Examples

- `amqp://guest:guest@localhost:5672/`
- `amqps://guest:guest@my-broker.dev:5671/`
- `amqps://guest:guest@my-broker.dev:5671/vhost`

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
|   _q   | queue      |
|   _e   | exchange   |
|   _k   | key        |
|   _p   | priority   |
|   _exp | expiration |
|   _pr  | persistent |

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

- `echo "hello" | rabtap pub --exchange lsk_exchange` - publish "hello" to exchange lsk_exchange

- `echo '{ "_id":"123" }' | lskrabbit pub` - publish JSONEachRow

- `cat tests/messages.json | lskrabbit pub` - publish messages from JSON file

- `cat tests/messages.json | docker run --rm -i lskjs/rabbit-cli pub` - publish messages from JSON file with docker image

- `cat tests/messages.json | DEBUG=lsk lskrabbit pub` - publish from JSON file with DEBUG

- `cat tests/messages.txt | lskrabbit pub --queue lsk_queue` - publish messages to queue from txt file

- `cat tests/messages.txt | lskrabbit pub -x "row => ({...row, test: row, _e: 'lsk_exchange' })"` - publish messages with extract

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

- `mongoexport --uri=mongodb://localhost:27017/ --collection=lsk_test | lskrabbit pub --uri amqp://localhost --queue lsk_queue` - publish messages from mongoDb collection

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

- `clickhouse-client -h localhost --port 9000 -d default  --password qwerty --multiquery < clickhouse.sql | lskrabbit pub` - publish messages from clickhouse
