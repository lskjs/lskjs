/* eslint-disable */
import Base from './_base';
export default class Recovery extends Base {
  getOptions({ ctx, params }) {
    return {
      subject: 'Восстановление пароля',
    }
  }

  renderContent({ ctx, params }) {
    return `
  <h1>Мы получили от тебя запрос на<br>восставление пароля для<br>доступа к «${ctx.site && ctx.site.title}»</h1>
  <p>Твой новый пароль: <b>${params.password}</b>
`
  }
}
