// import axios from 'axios';
import plivo from 'plivo';

export default (config = {}) => {
  const client = new plivo.Client();

  return ({ phone, text, ...params } = {}) => (
    client.messages.create(
      config.phone, // src
      phone, // dst
      text, // text
    ).then((response) => {
      console.log(response);
    }, (err) => {
      console.error(err);
    })
  );
  // return ({ phone, text, ...params } = {}) => {
  //   client.messages.create(
  //     params.src, // src
  //     phone, // dst
  //     text, // text
  //   ).then((response) => {
  //     console.log(response);
  //   }, (err) => {
  //     console.error(err);
  //   });
  // };
};
