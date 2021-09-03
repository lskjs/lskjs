# Как создать бота в Slack

1. Заходим на сайт с приложениями slack’а: https://api.slack.com/apps.

2. Клик `Create New App`

<img src="public/1.png" width="500px">

3. Клик `From scratch`

<img src="public/2.png" width="500px">

4. Вводим имя бота и выбираем для него рабочее пространство. Далее жмем `Create App`.

<img src="public/3.png" width="500px">

5. Клик `Bots`

<img src="public/4.png" width="500px">

6. Клик `Review Scopes to Add`.

<img src="public/5.png" width="500px">

7. Спускаемся ниже и выдаем боту следующие права:

<img src="public/6.png" width="500px">

8. Далее переходим во вкладку с хуками.

<img src="public/7.png" height="500px">

9. Кликаем на кнопку и добавляем хуки.

<img src="public/8.png" width="500px">

10. Выбираем чат, для которого хотим создать хук.

<img src="public/9.png" width="500px">

11. Получаем хук, который можем скопировать и положить в конфиг. Этот url представляет из себя аналог telegram-chatId. Для каждого чата необходимо создать свой вебхук.

<img src="public/10.png" width="500px">

12. В .env.js url-хук используется аналогично с chatId. Подробнее про конфиги в документации к bots-plugin-notify и bots-plugin-prometheus.

<img src="public/11.png" width="500px">

13. После добавления всех хуков необходимо поместить бота в рабочую область.

<img src="public/12.png" width="500px">
