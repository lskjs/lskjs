# @lskjs/build-locales

## модуль для работы с интернационализацией


#### Использование build-locales

```
$ @lskjs/build-locales --locales ru,en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales

Обязательные опции:
  --locales  Одна или несколько локалей, приер: ru или ru,en или en
  --link  Одна или несколько ссылок, пример: --link url1 --link url2
  --dist  Место назначения, куда сгенерируются готовые локали


Примеры:
  $ @lskjs/i18/build-locales --locales ru,en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales

  $ @lskjs/i18/build-locales --locales en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales

  $ @lskjs/i18/build-locales --locales ru,en --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --link https://docs.google.com/spreadsheets/d/1_qVnTw1Cwb2Ziwta_N0p-V4_ptD6-ZypDvCIrnryNF/edit#gid=0 --dist ./locales
```