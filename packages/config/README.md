# config

```js
import config from @lskjs/config;
const conf = config({
  some: {
    thing: 123
  }
})

```

## порядок мерджа конфигов
1. из аргументов config(a, b, c)
2. из .env.js (если нет js, то ищется json) в папке запуска `.` (если нет в текущей папке ищется в папке выше и так на 3 иерархии)
3. из ENV переменных `config.some.other=222 npm start`, сюда можно передавать строку в JSON формате `config.some={"thing": 321} npm start`
4. из argv `npm start --config.some.other 333`, сюда можно передавать строку в JSON формате
5. из базы данных [в разработке]
6. из реалтайм памяти [в разработке]

файлы вочатся, в случае изменения какого-то файла происходит `config.reinit(newConfig)`  [если такая функция есть в конфиге]

кстати .env.js можно писать в стиле 
```js
module.exports = ({other, ...config}) => ({
  ...config,
  some: 'thing',
})
```