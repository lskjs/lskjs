/* eslint-disable */
import Base from './_base';
export default class Recovery extends Base {
  getOptions({ ctx, params }) {
    return {
      subject: 'Подтверждение почты!',
    }
  }
  head() {
    return `
    <head>
        <meta charset="UTF-8">
        <title></title>
    	<link href="http://hi-jay.eu/mails/mail.css" rel="stylesheet" type="text/css" media="all">
    </head>
    `;
  }
  body({ params }) {
    return `
    <body>
      <div style="background:#dfe8ef;display: table;width: 100%;margin: 0px auto;">
      	<div class="mail">
      		<div class="lines">
      			<div></div>
      			<div></div>
      			<div></div>
      			<div></div>
      			<div></div>
      		</div>
      		<div class="body_mail">
      			<div class="header">Привет!</div>
      			<div class="content">
              <h1>Привет ${params.user.fullname}!</h1>
              <p>Для подтверждения почты нажми на <a href=${params.link}>ссылку!</a></p>
      			</div>
      		</div>
      		<div class="lines">
      			<div></div>
      			<div></div>
      			<div></div>
      			<div></div>
      			<div></div>
      		</div>
      	</div>
      </div>
    </body>`;
  }
  render({ ctx, params }) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      ${this.head()}
      ${this.body({ params })}
      </html>
    `;
  }
}
