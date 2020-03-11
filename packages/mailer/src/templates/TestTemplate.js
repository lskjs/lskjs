/* eslint-disable max-len */
import MjmlTemplate from './MjmlTemplate';

export default class TestTemplate extends MjmlTemplate {
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
