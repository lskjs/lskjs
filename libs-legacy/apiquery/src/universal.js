import apiquery from './apiquery';

export default class ApiClientWeb extends apiquery {
  constructor(props) {
    super(props);
    console.log('ApiClientWeb', this.url);  //eslint-disable-line
    if (!this.url) {
      if (__CLIENT__) {
        this.url = window.location.origin;
      }
      if (__SERVER__) {
        if (process.env.URL) {
          this.url = process.env.URL;
        }
      }
    }
    console.log('ApiClientWeb 2', this.url); //eslint-disable-line
  }
}
