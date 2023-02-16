

## Healthcheck examples

```
  healthchecks() {
    return {
      a: () => 123,
      b: () => Bluebird.delay(100).then(() => 1234),
      c: () => {
        throw new Err('error');
      },
      d: () => Bluebird.delay(11000).then(() => 'slow'),
    };
  }
```