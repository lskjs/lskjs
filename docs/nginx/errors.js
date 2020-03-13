const errors = [
  {
    code: 400,
    title: 'Некорректный запрос',
  },
  {
    code: 401,
    title: 'Неавторизован',
  },
  {
    code: 403,
    title: 'Доступ запрещён',
  },
  {
    code: 404,
    title: 'Страница не найдена',
  },
  {
    code: 500,
    title: 'Внутренняя ошибка сервера',
  },
  {
    code: 502,
    title: 'Шлюз недоступен',
  },
  {
    code: 503,
    title: 'Сервис недоступен',
  },
  {
    code: 504,
    title: 'Время вышло',
  },
].map((c)  => ({
  code: c.code,
  title: c.title,
  text: 'Свяжитесь с администратором для подробностей',
}));

const fs = require('fs')
const handlebars = require('handlebars');
const source = fs.readFileSync(__dirname + '/error.html').toString().replace(/\s*\n\s*/ig, '').replace(/\s+/ig, ' ');

const template = handlebars.compile(source, { strict: true });
errors.forEach(data => {
  fs.writeFileSync(__dirname + '/config/errors/' + data.code + '.html', template(data));
})