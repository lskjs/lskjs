/* eslint-disable */
import Template from './_base';
export default class Recovery extends Template {
  getOptions({ ctx, params }) {
    return {
      subject: 'Восстановление пароля!',
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
      			<div class="header">Привет, Джей!</div>
      			<div class="content">
      				<h1>Мы получили от тебя запрос на<br>восставление пароля для<br>доступа к «Hi, Jay!»</h1>
      				<p>Твой новый пароль: <b>${params.password}</b>
      				<div class="footer1">
      					<p>Напиши на <a href="mailto:support@hi-jay.eu">support@hi-jay.eu</a>, если у тебя возникли проблемы с использованием «Hi, Jay!», мы обязательно тебе поможем.

      					<p>С уважением, команда «Hi, Jay!».
      					<p><a href="http://www.hi-jay.eu" target="_blank">www.hi-jay.eu</a>
      				</div>
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
