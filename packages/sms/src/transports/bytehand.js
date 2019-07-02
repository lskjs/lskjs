import axios from 'axios';

export default () => ({ phone, text, ...params } = {}) => (
  axios({
    method: 'get',
    url: 'http://bytehand.com:3800/send',
    params: {
      ...params,
      to: phone,
      text,
    },
  })
);
