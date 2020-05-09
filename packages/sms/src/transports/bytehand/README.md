# Bytehand sms provider transport

[Bytehand API Docs](https://www.bytehand.com/en/developers/v2/start)


```js
const sms = new BytehandSmsTransport({
  apiKey: 'ab4db0b982dcd0ba63e44191e5d71ef8',
  sender: 'LSK'
})

await sms.send({
  to: '7-917-7777-77777',
  text: 'Hello world!'
});

await sms.send({
  phone: '79177272727',
  sender: 'MyShop',
  text: 'Today only! 20% off for all goods!!'
});
```