
class Page {
  constructor(props = {}) {
    Object.assign(this, props);
    this.titles = [];
  }

  pushTitle(...args) {
    if (!this.titles) {
      this.titles = [];
    }
    this.titles.push(...args);
    return this;
  }

  layout(layout) {
    this.layout = layout;
    return this;
  }

  component(component) {
    this.component = component;
    return this;
  }

  content(content) {
    this.content = content;
    return this;
  }


  renderTitle() {

  }
  render() {
    return this.component
    return 'Hello Page!';
  }

}

export default (app) => {
  return {
    uapp: {
      umodels: app.getUmodels && app.getUmodels() || {},
    },
    page: new Page({}),
    Page,
  };
};
