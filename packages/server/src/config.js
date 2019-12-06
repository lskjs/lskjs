export default {
  middlewares: {
    accessLogger: __DEV__,
    bodyParser: {
      urlencoded: {
        extended: true,
      },
      json: {},
    },
    cookieParser: {},
    cors: null,
  },
};
