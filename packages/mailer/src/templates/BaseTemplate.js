import get from 'lodash/get';

import { MjmlTemplate } from './MjmlTemplate';

export class BaseTemplate extends MjmlTemplate {
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
  copyrights({ title, subtitle } = {}) {
    // eslint-disable-next-line no-param-reassign
    if (!title) title = get(this, 'config.copyright');
    // eslint-disable-next-line no-param-reassign
    if (!subtitle) subtitle = get(this, 'config.address');
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
        ${
          subtitle &&
          `
          <mj-text
            align="center"
            color="${this.getTheme('colors.secondary')}"
            font-family="${this.getTheme('fontFamily')}"
            line-height="20px"
            font-size="14px"
            padding-top="0px"
          >
            <!-- &copy; -->
            ${title}
          </mj-text>
        `
        }
      </mj-column>
    `;
  }

  footerLinks(list = []) {
    return `
      <mj-column width="100%">
        <mj-table padding-bottom="32px">
          <tr>
            ${list
              .map(
                (item, index) => `
              <td align="center" style="${index ? 'border-left: 1px solid #1890ff;' : ''}">
                <a href="${item.href}" target="_blank" 
                  style="color: ${this.getTheme('colors.primary')}; 
                  text-decoration: none; font-family: ${this.getTheme('fontFamily')}; font-size: 14px">
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

  header({ logo = this.config.logo, image = this.config.headerImage } = {}) {
    if (image) {
      // TODO: something
      // ${!image ? '' : this.headerImage({ src: image })}
    }
    return `
      <mjml>
        <mj-head>
          ${this.font('Roboto', 'https://fonts.googleapis.com/css?family=Roboto:400,400i,700&amp;subset=cyrillic')}
        </mj-head>
        <mj-body>
          <mj-container background-color="${this.getTheme('colors.mainBackground')}">
            ${!logo ? '' : this.logo({ src: logo })}
    `;
  }

  footer() {
    return `
            <mj-section padding="16px"/>
            <mj-section padding="32px" border-radius="4px">
              ${this.footerLinks([
                {
                  href: this.url('/'),
                  title: get(this, 'config.title'),
                },
                {
                  href: `mailto:${get(this, 'config.email')}`,
                  title: this.t('mailer.contactEmail'),
                },
                {
                  href: this.getUnsubscribeLink(),
                  title: this.t('mailer.unsubscribeLink'),
                },
              ])}
              ${this.copyrights()}
            </mj-section>
          </mj-container>
        </mj-body>
      </mjml>
    `;
  }
}

export default BaseTemplate;
