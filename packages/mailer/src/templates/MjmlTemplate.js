/* eslint-disable max-len */
import mjml2html from 'mjml';
import get from 'lodash/get';
import Err from '@lskjs/utils/Err';
import HtmlTemplate from './HtmlTemplate';

export default class MjmlTemplate extends HtmlTemplate {
  getHtml() {
    const mjml = this.render();
    const { errors, html } = mjml2html(mjml);
    if (errors && errors.length) {
      this.log.error('Template.getHtml mjml', errors);
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.error('mjml', mjml);
      }
      throw new Err('MJML_RENDER', { errors });
    }
    return html;
  }

  head() {
    return `
<mj-title>${this.getSubject()}</mj-title>
<mj-font name="Gotham Pro" href="${this.assetsUrl('/fonts/stylesheet.css')}" />
<mj-style inline="inline"></mj-style>
`;
  }

  font(name, fontLink) {
    const fontStr = `'${this.getTheme('fontFamily')}', sans-serif;`;
    return `
<mj-font name="${name}" href="${fontLink}" />
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
        ${
          subtitle &&
          `
          <mj-text
            align="center"
            color="${this.getTheme('colors.secondary')}"
            font-family="${this.getTheme('fontFamily')}"
            line-height="20px"
            font-size="14px"
            padding-top="32px"
            padding-bottom="6px"
          >
            ${subtitle}
          </mj-text>
        `
        }
        <mj-text
          align="center"
          color="${this.getTheme('colors.secondary')}"
          font-family="${this.getTheme('fontFamily')}"
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
            ${list
              .filter((item) => item.title || item.href)
              .map(
                (item, index) => `
              <td align="center" style="${index ? 'border-left: 1px solid #1890ff;' : ''}">
                <a href="${item.href}" target="_blank" style="color: ${get(
                  this,
                  'theme.colors.primary',
                )}; text-decoration: none; font-family: ${this.getTheme('fontFamily')}; font-size: 14px">
                  ${item.title}
                </a>
              </td>
            `,
              )
              .join('')}
          </tr>
        </mj-table>
      </mj-column>
    `;
  }

  title(title) {
    return `
      <mj-column width="95%">
        <mj-text
          font-family="${this.getTheme('fontFamily')}"
          color="${this.getTheme('colors.main')}"
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
          font-family="${this.getTheme('fontFamily')}"
          color="${this.getTheme('colors.main')}"
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
          font-family="${this.getTheme('fontFamily')}"
          color="${this.getTheme('colors.secondary')}"
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
          font-family="${this.getTheme('fontFamily')}"
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
        <p style="font-size: 10px; margin: -18px 0 18px;">
          <a style="color: #a0a0a0; overflow: hidden; display: block; height: 30px;" class="link" href="${params.href}">${params.href}</a>
        </p>
      `)}
    `;
  }

  content(children) {
    return `
      <mj-section background-color="${this.getTheme('colors.white')}" padding="32px 0px 12px">
        ${children}
      </mj-section>
    `;
  }

  header() {
    return `
     <!--header-->
    `;
  }
  footer() {
    return `
     <!--footer-->
    `;
  }
  render() {
    return `NOT IMPLEMENTED`;
  }
}
