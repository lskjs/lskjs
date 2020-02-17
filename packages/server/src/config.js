// export default {
//   middlewares: {
//     accessLogger: __DEV__,
//     bodyParser: {
//       urlencoded: {
//         extended: true,
//       },
//       json: {},
//     },
//     cookieParser: {},
//     cors: null,
//   },
// };
export default {
  url: 'http://localhost:8080',
  port: 8080,
  express: {},
  ws: {
    transports: ['websocket'],
    // origins: [],
  },
  middlewares: {
    accessLogger: __DEV__,
    reqData: true,
    cookieParser: true,
    bodyParser: {
      json: true,
      urlencoded: true,
    },
    cors: __DEV__,
  },
};
