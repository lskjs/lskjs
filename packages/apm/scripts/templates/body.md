## Example

```js
const main = async () => {
  const apm = new ApmModule({ 
    serverUrl: 'http://apm.buzz.guru:8200',
    serviceName: 'test'
  })
  await apm.run()

  setInterval(async () => {
    const tx = apm.startTransaction('test transaction', 'job');
    const ts = tx.startSpan('test span', 'span1');
    await Bluebird.delay(Math.random() * 100 + 200);
    await ts.end();
    const ts2 = tx.startSpan('test span2', 'span2');
    await Bluebird.delay(Math.random() * 2000 + 100);
    await apm.captureError(new Error('test error'));
    await ts2.end();
    tx.result = Math.random() < 0.5 ? 'error' : 'success';
    await tx.end();
  }, 100);

}

main();
```