import axios from 'axios';

export default () => async ({ phone, text, ...params } = {}) => {
  const res = await axios({
    method: 'post',
    url: 'https://rest.nexmo.com/sms/json',
    data: {
      ...params,
      to: phone,
      text,
    },
  });
  // console.log(res.messages[0].status !== 0, res.messages[0].status, JSON.stringify(res, null, 2));
  if (res.messages[0].status !== '0') {
    throw res.messages[0]['error-text'];
    // throw res.messages[0].errorText;
  }
  return res;
};
