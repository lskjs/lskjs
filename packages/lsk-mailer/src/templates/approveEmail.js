/* eslint-disable */
import Base from './_base';
export default class Recovery extends Base {
  getOptions({ ctx, params }) {
    return {
      subject: 'Подтверждение почты!',
    }
  }

  renderContent({ params }) {
    return `
  <h1>Привет ${params.user.name}!</h1>
  <p>Для подтверждения почты нажми на <a href=${params.link}>ссылку!</a></p>
`
  }
}
