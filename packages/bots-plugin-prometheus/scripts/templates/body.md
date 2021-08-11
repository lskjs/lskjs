# Intro

# Как использовать


конфиг в env.js
```js
bots: {
 plugins:{
  prometheus: {
   projects: [
      {
        alerts: 'URL-alert',
        criteria: {
          state: 'firing',
        },
        action: {
          type: 'summary',
          telegram: [chats.chat1, chats.chat2],
          groupBy: 'labels.severity',
        },
      },
    ],
  },
 },
},
```



