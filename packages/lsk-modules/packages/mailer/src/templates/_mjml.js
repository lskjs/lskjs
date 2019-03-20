/* eslint-disable class-methods-use-this */
/* eslint-disable indent */
import mjml2html from 'mjml';
// import { mjml2html } from 'mjml';
import Template from './_html';

export default class Base extends Template {
  getHtml() {
    const { errors, html } = mjml2html(this.render());
    if (__DEV__) {
      if (errors && errors.length) {
        this.log.error('Template.getHtml mjml', errors);
      }
    }
    return html;
  }

  font(name, gFontsLink) {
    const fontStr = `'${name}', sans-serif;`;
    this.fontFamily = fontStr;
    return `
      <mj-font name="${name}" href="${gFontsLink}" />
      <mj-style inline="inline">
        body {
          font-family: ${fontStr}
        }
      </mj-style>
    `;
  }

  logo({ src }) {
    return `
      <mj-section>
        <mj-column width="100%">
          <mj-image
            src="${src}"
            width="200px"
          />
        </mj-column>
      </mj-section>
    `;
  }

  headerImage({ src }) {
    return `
      <mj-section padding="0px">
        <mj-column width="100%">
          <mj-image
            src="${src}"
            width="600px"
            padding="0px"
          />
        </mj-column>
      </mj-section>
    `;
  }

  copyrights({ title, subtitle }) {
    return `
      <mj-column width="100%">
        ${subtitle && `
          <mj-text
            align="center"
            color="${this.theme.colors.secondary}"
            font-family="${this.fontFamily}"
            line-height="20px"
            font-size="14px"
            padding-top="32px"
            padding-bottom="6px"
          >
            ${subtitle}
          </mj-text>
        `}
        <mj-text
          align="center"
          color="${this.theme.colors.secondary}"
          font-family="${this.fontFamily}"
          line-height="20px"
          font-size="14px"
          padding-top="0px"
        >
          &copy; ${title}
        </mj-text>
      </mj-column>
    `;
  }

  footerLinks(list = []) {
    return `
      <mj-column width="100%">
        <mj-table padding-bottom="32px">
          <tr>
            ${list.map((item, index) => (`
              <td align="center" style="${index ? 'border-left: 1px solid #1890ff;' : ''}">
                <a href="${item.href}" target="_blank" style="color: ${this.theme.colors.primary}; text-decoration: none; font-family: ${this.fontFamily}; font-size: 14px">
                  ${item.title}
                </a>
              </td>
            `)).join('')}
          </tr>
        </mj-table>
      </mj-column>
    `;
  }

  team() {
    return `
      <mj-section background-color="${this.theme.colors.white}">
        <mj-column width="100%">
          <mj-divider border-width="1px" border-style="solid" border-color="${this.theme.colors.border}" />
        </mj-column>
      </mj-section>
      <mj-section background-color="${this.theme.colors.white}" padding="0px 0px 42px">
        ${this.title(this.t('email.goodDay'))}
        ${this.text(this.t('email.incircle.isuvorov.com'))}
      </mj-section>
    `;
  }

  title(title) {
    return `
      <mj-column width="95%">
        <mj-text
          font-family="${this.fontFamily}"
          color="${this.theme.colors.main}"
          font-size="28px"
          line-height="34px"
          align="center"
        >
          ${title}
        </mj-text>
      </mj-column>
    `;
  }

  subtitle(children) {
    return `
      <mj-column width="80%">
        <mj-text
          font-family="${this.fontFamily}"
          color="${this.theme.colors.main}"
          align="center"
          font-size="20px"
          padding-top="10px"
          font-weight="bold"
          padding="0px"
        >
          ${children}
        </mj-text>
      </mj-column>
    `;
  }

  text(children) {
    return `
      <mj-column width="80%">
        <mj-text
          font-family="${this.fontFamily}"
          color="${this.theme.colors.secondary}"
          font-size="16px"
          line-height="26px"
          align="center"
          padding-top="24px"
        >
          ${children}
        </mj-text>
      </mj-column>
    `;
  }

  button(children, params = {}) {
    if (!params.href) return '';
    const { href = '#!', color = 'white', backgroundColor = '#4B86C6' } = params;
    return `
      <mj-column width="100%">
        <mj-button
          font-family="${this.fontFamily}"
          background-color="${backgroundColor}"
          text-transform="uppercase"
          line-height="26px"
          font-size="13px"
          padding-top="24px"
          href="${href}"
          color="${color}"
        >
          ${children}
        </mj-button>
      </mj-column>
    `;
  }

  buttonWithLink(children, params = {}) {
    if (!params.href) return '';
    return `
      ${this.button(children, params)}
      ${this.text(`
        <p>
          <a class="link" href="${params.href}">${params.href}</a>
        </p>
      `)}
    `;
  }


  header({ logo = 'https://i.imgur.com/4K9cdsl.png', image = 'https://i.imgur.com/B8GzjNO.png' } = {}) {
    return `
      <mjml>
        <mj-head>
          ${this.font('Roboto', 'https://fonts.googleapis.com/css?family=Roboto:400,400i,700&amp;subset=cyrillic')}
        </mj-head>
        <mj-body>
          <mj-container background-color="${this.theme.colors.mainBackground}">
            ${this.logo({ src: logo })}
            ${this.headerImage({ src: image })}
    `;
  }


  footer() {
    return `
            <mj-section padding="16px"/>
            <mj-section padding="32px" border-radius="4px">
              <!--${this.footerLinks([
                {
                  href: 'https://incircle.isuvorov.com',
                  title: 'incircle.isuvorov.com',
                },
                {
                  href: 'mailto:mail@localhost',
                  title: 'mail@localhost',
                },
                {
                  href: 'mailto:mail@localhost',
                  title: 'Отписаться от рассылки',
                },
              ])}
              ${this.copyrights({
    title: 'InCircle 2019',
    subtitle: 'Your company address',
  })}-->
            </mj-section>
          </mj-container>
        </mj-body>
      </mjml>
    `;
  }

  content(children) {
    return `
      <mj-section background-color="${this.theme.colors.white}" padding="32px 0px 12px">
        ${children}
      </mj-section>
    `;
  }

  render() {
    return `
      ${this.header()}
      ${this.content(`
        ${this.title('Default title')}
        ${this.subtitle('Beautiful subtitle')}
        ${this.text('Hello world')}
        ${this.button('Button name', {
    href: 'https://google.com',
    color: '#4a4a4a',
    backgroundColor: '#e3e3e3',
  })}
      `)}
      ${this.footer()}
    `;
  }
}
