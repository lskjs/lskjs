# Seconds to time

## 1 вариант

https://gist.github.com/vankasteelj/74ab7793133f4b257ea3

```js
const pad = (num, size) => ('000' + num).slice(size * -1);

const sec2time = (timeInSeconds) => {
  const time = parseFloat(timeInSeconds).toFixed(3);
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);
  const milliseconds = time.slice(-3);

  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)},${pad(milliseconds, 3)}`;
}
```

### Кейсы:

38000.08 => '10:33:20,080'

3800.05 => '01:03:20,050'

138.9 => '00:02:18,900'

1380.4 => '00:23:00,400'

380 => '00:06:20,000'

38 => '00:00:38,000'

0 => '00:00:00,000'

0.21 => '00:00:00,210'

15.0021 => '00:00:15,002'

42.03 => '00:00:42,030'

### Преимущества и недостатки:

+ При любых значениях, которые укладываются в сутки, лог будет сохранять консистентость
+ Нет сокращения информации
+ Отсутствие погрешности
+ Легкая реализация

- При малых значениях запись такая же объемная

----------------------------------------------------------------------------------------------------

## 2 вариант

### Кейсы:

38000.08 => 10.3h

3800.05 => 1.03h

138.9 => 2.19h

1380.4 => 23.0m

380 => 6.20m

38 => 38.0s

0 => 0.00s

0.21 => 0.21s

15.0021 => 15.0s

42.03 => 42.0s

### Преимущества и недостатки:

+ При любых значениях, которые укладываются в сутки, лог будет сохранять консистентость
+ При любых значениях краткая информация

- Погрешность
- Сокращение информации
- Реализация сложнее 1 варианта
