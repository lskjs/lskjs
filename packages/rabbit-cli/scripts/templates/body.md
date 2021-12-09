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
|   _q   | queue      |
|   _e   | exchange   |
|   _k   | key        |
|   _p   | priority   |
|   _exp | expiration |
|   _pr  | persistent |

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