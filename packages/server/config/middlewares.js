export default {
  accessLogger: true,
  bodyParser: {
    json: true,
    urlencoded: {
      limit: '50mb',
      extended: true,
    },
  },
  reqData: true,
  cookieParser: true,
  cors: false,
};
