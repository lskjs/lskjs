import ejs from 'ejs';
import _ from 'lodash';
export default (ctx) => {
  return class Template {
    getOptions() {
      return this.options || {};
    }
    constructor(params = {}) {
      _.map(params, (value, key) => {
        this[key] = value;
      });
      this.type = params.type || null;
    }
    pathToTemplates = `${process.cwd()}/src/App/mailer/templates/ejs`
    template = 'template'
    async renderEjs({ template, params }) {
      return new Promise((resolve, reject) => {
        return ejs.renderFile(`${this.pathToTemplates}/${template}.ejs`, { params }, (err, html) => {
          if (err) return reject(err);
          return resolve(html);
        });
      });
    }
    async render({ template = this.template, params = {} }) {
      console.log({ params });
      if (this.type === null) return null;
      let _template;
      const body = await this.renderEjs({ template: this.type, params });
      if (template) {
        _template = await this.renderEjs({ template: this.template,
          params: {
            body,
          } });
      }
      if (_template) return _template;
      return body;
    }
  };
};
