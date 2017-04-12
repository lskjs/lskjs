/* eslint-disable */
import BaseTemplate from './_base';
export default class Mjml extends BaseTemplate {
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
