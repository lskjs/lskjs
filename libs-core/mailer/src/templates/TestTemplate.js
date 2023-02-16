import MjmlTemplate from './BaseTemplate';

export class TestTemplate extends MjmlTemplate {
  render() {
    return `
<mjml>
  <mj-head>
    <mj-title>${this.getSubject()}</mj-title>
  </mj-head>
  <mj-body>
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
  </mj-body>
</mjml>
    `;
  }
}

export default TestTemplate;
