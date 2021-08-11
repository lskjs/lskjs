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
  port: process.env.PORT || 8080,
  express: {},
  // ws: {
  //   transports: ['websocket'],
  //   // origins: [],
  // },
  api: {
    debug: true,
  },
  jwt: {},
  middlewares: {
    lsk: {
      reqId: true,
      reqLog: true,
      reqData: true, // { jsonParse: true }
      reqI18: true,
      res: true,
      logger: true,
      errorLogger: true, // ?
    },
    reqUser: true,
    cookieParser: true,
    bodyParserJson: true,
    urlencoded: { extended: true },
    cors: false,
  },
  response: {
    log: false,
    debug: true,
    debugDir: `/tmp/lsk`,
  },
};
