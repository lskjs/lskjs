import ApiClient from './ApiClient';

export default class ApiClientWeb extends ApiClient {
  constructor(props) {
    super(props);
    console.log('ApiClientWeb', this.url);
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
    console.log('ApiClientWeb 2', this.url);
  }
}
