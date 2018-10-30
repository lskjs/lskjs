"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _imap = _interopRequireDefault(require("imap"));

var _moment = _interopRequireDefault(require("moment"));

var _get = _interopRequireDefault(require("lodash/get"));

var _find = _interopRequireDefault(require("lodash/find"));

var _set = _interopRequireDefault(require("lodash/set"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _mailparser = require("mailparser");

var _bluebird = _interopRequireDefault(require("bluebird"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _default = function _default(ctx) {
  // Должна быть выключена двухфакторная авторизация
  // Пример конфига
  // {
  //   "user": "email",
  //   "password": "qwertyui",
  //   "host": "imap.gmail.com",
  //   "port": "993",
  //   "tls": true
  // }
  return (
    /*#__PURE__*/
    function () {
      function MailerParserModule() {
        _classCallCheck(this, MailerParserModule);
      }

      _createClass(MailerParserModule, [{
        key: "init",
        value: function () {
          var _init = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // parser
                    this.prefix = 'mailer';
                    this.parserConfig = (0, _get.default)(ctx, 'config.mailer.parser');
                    this.defaultParserConfig = {
                      parseInterval: 60000,
                      parseTimeout: 300000,
                      parseLimit: 100
                    };

                    if (this.parserConfig) {
                      this.parserConfig = (0, _merge.default)(this.defaultParserConfig, this.parserConfig);
                      this.imapConfig = this.parserConfig.config;
                    }

                    console.log(this.parserConfig, 'parserConfig');
                    console.log(this.imapConfig, 'imapConfig');
                    this.models = require('./models').default(ctx, this);

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function init() {
            return _init.apply(this, arguments);
          };
        }()
      }, {
        key: "run",
        value: function () {
          var _run = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(!this.parserConfig || !this.imapConfig)) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt("return");

                  case 2:
                    this.logger = ctx.createLogger({
                      name: 'mailer',
                      level: 'trace'
                    });
                    this.log('imap debug');
                    this.log('imap parseInterval', this.parserConfig.parseInterval);
                    this.connections = {};

                    try {
                      // console.time('imapParse');
                      // await this.sync({ box: 'INBOX' });
                      // await this.sync({ box: config.boxes.inbox });
                      this.runCron(); // console.timeEnd('imapParse');
                    } catch (err) {
                      console.error('imap run', err); //eslint-disable-line
                    }

                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          return function run() {
            return _run.apply(this, arguments);
          };
        }()
      }, {
        key: "log",
        value: function log() {
          if (this.debug) {
            var _logger;

            (_logger = this.logger).trace.apply(_logger, arguments);
          }
        }
      }, {
        key: "stop",
        value: function stop() {
          var _this = this;

          this.parserConfig.boxes(function (_ref) {
            var box = _ref.box;

            _this.disconnect({
              connection: _this.connections[box]
            });
          });
        }
      }, {
        key: "syncAll",
        value: function () {
          var _syncAll = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee4() {
            var _this2 = this;

            var boxes;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    this.log('syncAll');
                    boxes = this.parserConfig.boxes;
                    _context4.next = 4;
                    return _bluebird.default.mapSeries(boxes,
                    /*#__PURE__*/
                    function () {
                      var _ref2 = _asyncToGenerator(
                      /*#__PURE__*/
                      regeneratorRuntime.mark(function _callee3(box) {
                        var boxName;
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                          while (1) {
                            switch (_context3.prev = _context3.next) {
                              case 0:
                                boxName = box.box;
                                _context3.next = 3;
                                return _this2.createConnection(box);

                              case 3:
                                _this2.connections[boxName] = _context3.sent;
                                _context3.next = 6;
                                return _this2.sync(_objectSpread({}, box, {
                                  connection: _this2.connections[boxName]
                                }));

                              case 6:
                                _context3.next = 8;
                                return _bluebird.default.delay(500);

                              case 8:
                              case "end":
                                return _context3.stop();
                            }
                          }
                        }, _callee3, this);
                      }));

                      return function (_x) {
                        return _ref2.apply(this, arguments);
                      };
                    }());

                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          return function syncAll() {
            return _syncAll.apply(this, arguments);
          };
        }()
      }, {
        key: "runCron",
        value: function () {
          var _runCron = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee5() {
            var _this3 = this;

            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!(__INSTANCE !== '1')) {
                      _context5.next = 2;
                      break;
                    }

                    return _context5.abrupt("return");

                  case 2:
                    _context5.prev = 2;
                    _context5.next = 5;
                    return this.syncAll();

                  case 5:
                    _context5.next = 10;
                    break;

                  case 7:
                    _context5.prev = 7;
                    _context5.t0 = _context5["catch"](2);
                    console.error('imap syncAll', _context5.t0); //eslint-disable-line

                  case 10:
                    // console.log(config.parseInterval, 'config.parseInterval');
                    setTimeout(function () {
                      return _this3.runCron();
                    }, this.parserConfig.parseInterval);

                  case 11:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this, [[2, 7]]);
          }));

          return function runCron() {
            return _runCron.apply(this, arguments);
          };
        }()
      }, {
        key: "createConnection",
        value: function () {
          var _createConnection = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee6(_ref3) {
            var _this4 = this;

            var box;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    box = _ref3.box;

                    if (!(!this.parserConfig || !this.imapConfig)) {
                      _context6.next = 3;
                      break;
                    }

                    throw '!config';

                  case 3:
                    return _context6.abrupt("return", new _bluebird.default(function (resolve, reject) {
                      var connection = new _imap.default(_this4.imapConfig);

                      _this4.log('createConnection', {
                        box: box
                      });

                      function openInbox(cb) {
                        connection.openBox(box, true, cb);
                      }

                      var isReady = false;
                      connection.once('ready', function () {
                        _this4.log('openBox', box);

                        openInbox(function (err) {
                          if (err) {
                            _this4.log('openBox error', err);

                            return reject(err);
                          }

                          isReady = true;

                          _this4.log('box opened', {
                            box: box
                          });

                          return resolve(connection);
                        });
                      });
                      connection.on('error', function (err) {
                        _this4.log('imap connection error', err);

                        console.error('imap connection error', err); //eslint-disable-line

                        return reject(err);
                      });
                      connection.on('end', function () {
                        // for andruxa debug
                        _this4.log('connection end', {
                          box: box
                        });

                        if (!isReady) reject();
                      });
                      connection.connect();
                    }));

                  case 4:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));

          return function createConnection(_x2) {
            return _createConnection.apply(this, arguments);
          };
        }()
      }, {
        key: "disconnect",
        value: function disconnect(_ref4) {
          var connection = _ref4.connection;
          if (!this.parserConfig || !this.imapConfig) throw '!config';
          if (!connection) throw '!connection';
          return new _bluebird.default(function (resolve, reject) {
            return connection.end(function (err, res) {
              if (err) return reject(err);
              return resolve(res);
            });
          });
        }
      }, {
        key: "saveEmail",
        value: function () {
          var _saveEmail = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee7(_ref5) {
            var message, _ref5$subtype, subtype, _models, Email, Thread, isExist, email, gmailThreadId, thread;

            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    message = _ref5.message, _ref5$subtype = _ref5.subtype, subtype = _ref5$subtype === void 0 ? 'i' : _ref5$subtype;
                    _models = this.models, Email = _models.Email, Thread = _models.Thread;
                    _context7.next = 4;
                    return Email.countDocuments({
                      uid: message.uid,
                      'from.address': message.from.address
                    });

                  case 4:
                    isExist = _context7.sent;

                    if (!isExist) {
                      _context7.next = 7;
                      break;
                    }

                    return _context7.abrupt("return");

                  case 7:
                    email = new Email({
                      uid: message.uid,
                      info: {
                        date: message.date,
                        text: message.text,
                        html: message.html,
                        receivedDate: message.receivedDate,
                        subject: message.subject,
                        references: message.references,
                        messageId: message.messageId,
                        cc: message.cc,
                        bcc: message.bcc
                      },
                      from: message.from,
                      to: message.to,
                      subtype: subtype
                    });
                    gmailThreadId = message['x-gm-thrid'];

                    if (!gmailThreadId) {
                      _context7.next = 27;
                      break;
                    }

                    _context7.next = 12;
                    return Thread.findOne({
                      'info.gmailThreadId': gmailThreadId
                    }).select(['_id']);

                  case 12:
                    thread = _context7.sent;

                    if (thread) {
                      _context7.next = 17;
                      break;
                    }

                    thread = new Thread({
                      info: {
                        gmailThreadId: gmailThreadId,
                        subject: email.info.subject
                      }
                    });
                    _context7.next = 17;
                    return thread.save();

                  case 17:
                    email.threadId = thread._id;
                    _context7.next = 20;
                    return email.save();

                  case 20:
                    _context7.next = 22;
                    return thread.calculateSummary();

                  case 22:
                    _context7.next = 24;
                    return thread.save();

                  case 24:
                    ctx.emit('models.Email.saved', {
                      email: email,
                      thread: thread
                    });
                    _context7.next = 30;
                    break;

                  case 27:
                    _context7.next = 29;
                    return email.save();

                  case 29:
                    ctx.emit('models.Email.saved', {
                      email: email
                    });

                  case 30:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this);
          }));

          return function saveEmail(_x3) {
            return _saveEmail.apply(this, arguments);
          };
        }()
      }, {
        key: "sync",
        value: function () {
          var _sync = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee8(_ref6) {
            var _ref6$box, box, connection, subtype, Email, lastEmail, filter, date;

            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _ref6$box = _ref6.box, box = _ref6$box === void 0 ? 'INBOX' : _ref6$box, connection = _ref6.connection, subtype = _ref6.subtype;

                    if (!(__STAGE === 'master')) {
                      _context8.next = 3;
                      break;
                    }

                    throw 'STAGE === master';

                  case 3:
                    Email = this.models.Email;
                    _context8.next = 6;
                    return Email.findOne({
                      'info.date': {
                        $exists: true
                      },
                      subtype: subtype
                    }).sort({
                      'info.date': -1
                    }).select(['info.date']);

                  case 6:
                    lastEmail = _context8.sent;
                    filter = [];

                    if (lastEmail) {
                      try {
                        date = (0, _moment.default)(lastEmail.info.date).add(-1, 'day').locale('en').format('LL');
                        filter.push(['SINCE', date]);
                      } catch (err) {
                        console.error('imap, sync date error', err); //eslint-disable-line
                      }
                    }

                    this.log('filter', filter);
                    if (!filter.length) filter.push('ALL');
                    _context8.next = 13;
                    return this.searchAndSave({
                      filter: filter,
                      box: box,
                      connection: connection,
                      subtype: subtype
                    });

                  case 13:
                    this.disconnect({
                      connection: connection
                    });

                  case 14:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8, this);
          }));

          return function sync(_x4) {
            return _sync.apply(this, arguments);
          };
        }()
      }, {
        key: "getMessages",
        value: function () {
          var _getMessages = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee10(f, length) {
            var _this5 = this;

            var messages;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    messages = [];
                    this.log('getMessages start', length);
                    return _context10.abrupt("return", new _bluebird.default(function (resolve, reject) {
                      f.on('message', function (msg) {
                        var mp = new _mailparser.MailParser();
                        msg.on('body', function (stream) {
                          var message = {};
                          msg.on('attributes', function (attrs) {
                            message.attrs = attrs;
                            stream.pipe(mp);
                            mp.on('headers', function (headers) {
                              message.headers = headers;
                              mp.on('data',
                              /*#__PURE__*/
                              function () {
                                var _ref7 = _asyncToGenerator(
                                /*#__PURE__*/
                                regeneratorRuntime.mark(function _callee9(obj) {
                                  return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                    while (1) {
                                      switch (_context9.prev = _context9.next) {
                                        case 0:
                                          message.obj = obj;
                                          messages.push(message);

                                          _this5.log("".concat(messages.length, "/").concat(length), 'getMessages');

                                          if (messages.length === length) resolve(messages);

                                        case 4:
                                        case "end":
                                          return _context9.stop();
                                      }
                                    }
                                  }, _callee9, this);
                                }));

                                return function (_x7) {
                                  return _ref7.apply(this, arguments);
                                };
                              }()).on('error', function (dataError) {
                                console.error('imap getMessages f on data', dataError); //eslint-disable-line

                                reject(dataError);
                              });
                            }).on('error', function (headersError) {
                              console.error('imap getMessages f on headers', headersError); //eslint-disable-line

                              reject(headersError);
                            });
                          }).on('error', function (attrErrors) {
                            console.error('imap getMessages f on attributes', attrErrors); //eslint-disable-line

                            reject(attrErrors);
                          });
                        }).on('error', function (bodyError) {
                          console.error('imap getMessages f on body', bodyError); //eslint-disable-line

                          reject(bodyError);
                        });
                      }).on('error', function (error) {
                        console.error('imap getMessages f on message', error); //eslint-disable-line

                        reject(error);
                      });
                    }));

                  case 3:
                  case "end":
                    return _context10.stop();
                }
              }
            }, _callee10, this);
          }));

          return function getMessages(_x5, _x6) {
            return _getMessages.apply(this, arguments);
          };
        }()
      }, {
        key: "searchAndSave",
        value: function () {
          var _searchAndSave = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee13(_ref8) {
            var _this6 = this;

            var filter, connection, _ref8$box, box, subtype;

            return regeneratorRuntime.wrap(function _callee13$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    filter = _ref8.filter, connection = _ref8.connection, _ref8$box = _ref8.box, box = _ref8$box === void 0 ? this.parserConfig.boxes.inbox : _ref8$box, subtype = _ref8.subtype;
                    this.log('searchAndSave', {
                      filter: filter,
                      box: box
                    });
                    return _context13.abrupt("return", new _bluebird.default(function (resolve, reject) {
                      try {
                        var fetchTimeout = setTimeout(function () {
                          reject(new Error('timeout'));
                        }, _this6.parserConfig.parseTimeout); // если парсить слишком долго, завис, то заканчиваем парсинг
                        // connection.getBoxes((err2, boxes) => { // На всякий случай
                        //   console.log({ err2, boxes });
                        // });

                        _this6.log('search', {
                          box: box,
                          filter: filter,
                          subtype: subtype
                        });

                        return connection.search(filter,
                        /*#__PURE__*/
                        function () {
                          var _ref9 = _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee12(searchErr, results) {
                            var Email, emails, f, messages;
                            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                              while (1) {
                                switch (_context12.prev = _context12.next) {
                                  case 0:
                                    _this6.log('search result', {
                                      searchErr: searchErr,
                                      results: results
                                    });

                                    if (!searchErr) {
                                      _context12.next = 3;
                                      break;
                                    }

                                    return _context12.abrupt("return", reject(searchErr));

                                  case 3:
                                    if (results.length) {
                                      _context12.next = 5;
                                      break;
                                    }

                                    return _context12.abrupt("return", resolve([]));

                                  case 5:
                                    Email = _this6.models.Email;
                                    _context12.next = 8;
                                    return Email.find({
                                      uid: {
                                        $in: results
                                      }
                                    }).select(['uid']);

                                  case 8:
                                    emails = _context12.sent;
                                    results = results.filter(function (uid) {
                                      return !(0, _find.default)(emails, {
                                        uid: uid
                                      });
                                    });

                                    if (results.length > _this6.parserConfig.parseLimit) {
                                      results = results.slice(0, _this6.parserConfig.parseLimit);
                                    }

                                    if (results.length) {
                                      _context12.next = 13;
                                      break;
                                    }

                                    return _context12.abrupt("return", resolve([]));

                                  case 13:
                                    connection.on('error', function (err) {
                                      console.error('imap connection on error', err); //eslint-disable-line

                                      reject(err);
                                    });
                                    f = connection.fetch(results, {
                                      bodies: '',
                                      struct: true
                                    });
                                    _context12.next = 17;
                                    return _this6.getMessages(f, results.length);

                                  case 17:
                                    messages = _context12.sent;
                                    clearTimeout(fetchTimeout);

                                    _this6.log('getMessages completed');

                                    _context12.next = 22;
                                    return _bluebird.default.map(messages,
                                    /*#__PURE__*/
                                    function () {
                                      var _ref11 = _asyncToGenerator(
                                      /*#__PURE__*/
                                      regeneratorRuntime.mark(function _callee11(_ref10, i) {
                                        var attrs, obj, headers, message, from, to, cc, bcc, messageId, references, received, date, receivedDate, _deliveredTo$value, deliveredTo;

                                        return regeneratorRuntime.wrap(function _callee11$(_context11) {
                                          while (1) {
                                            switch (_context11.prev = _context11.next) {
                                              case 0:
                                                attrs = _ref10.attrs, obj = _ref10.obj, headers = _ref10.headers;
                                                message = {
                                                  headers: null,
                                                  text: null,
                                                  subject: null,
                                                  html: null,
                                                  uid: null
                                                };
                                                _context11.prev = 2;
                                                // console.log(attrs);
                                                message.uid = attrs.uid;
                                                message.text = obj.text;
                                                message.html = obj.html; // console.log('////////////////////////////////');
                                                // console.log(message.text, 'text');
                                                // console.log(message.headers);

                                                message.subject = headers.get('subject');
                                                from = headers.get('from'); // console.log({ thrid });

                                                to = headers.get('to');
                                                cc = headers.get('cc');
                                                bcc = headers.get('bcc');
                                                messageId = headers.get('message-id');
                                                references = headers.get('references');
                                                received = headers.get('received');
                                                date = headers.get('date'); // console.log(date);

                                                if (cc === null || cc === void 0 ? void 0 : cc.value) {
                                                  message.cc = cc.value;
                                                }

                                                if (bcc === null || bcc === void 0 ? void 0 : bcc.value) {
                                                  message.bcc = bcc.value;
                                                }

                                                if (received) {
                                                  if (Array.isArray(received)) {
                                                    received = received[0];
                                                  }

                                                  if (received) {
                                                    receivedDate = new Date(received.match(/; (.*)/)[1]);
                                                    message.receivedDate = receivedDate;
                                                  }
                                                }

                                                if (date) {
                                                  message.date = new Date(date);
                                                } // console.log(references, 'references');


                                                message.messageId = messageId;
                                                message.references = references;

                                                if (from) {
                                                  message.from = from.value[0];
                                                }

                                                if (to) {
                                                  message.to = to.value[0];
                                                } else {
                                                  deliveredTo = headers.get('delivered-to');

                                                  if (deliveredTo === null || deliveredTo === void 0 ? void 0 : (_deliveredTo$value = deliveredTo.value) === null || _deliveredTo$value === void 0 ? void 0 : _deliveredTo$value[0]) {
                                                    message.to = deliveredTo.value[0];
                                                  }
                                                }

                                                if (attrs['x-gm-thrid']) {
                                                  message['x-gm-thrid'] = attrs['x-gm-thrid']; // Gmail Thread Id
                                                }

                                                _context11.next = 26;
                                                return _this6.saveEmail({
                                                  message: message,
                                                  box: box,
                                                  subtype: subtype
                                                });

                                              case 26:
                                                _context11.next = 31;
                                                break;

                                              case 28:
                                                _context11.prev = 28;
                                                _context11.t0 = _context11["catch"](2);
                                                console.error('imap sync search on "data"', _context11.t0); //eslint-disable-line

                                              case 31:
                                                _this6.log("".concat(i + 1, "/").concat(results.length), 'saveEmail');

                                              case 32:
                                              case "end":
                                                return _context11.stop();
                                            }
                                          }
                                        }, _callee11, this, [[2, 28]]);
                                      }));

                                      return function (_x11, _x12) {
                                        return _ref11.apply(this, arguments);
                                      };
                                    }(), {
                                      concurrency: 5
                                    });

                                  case 22:
                                    _this6.log('parse completed', box);

                                    return _context12.abrupt("return", resolve());

                                  case 24:
                                  case "end":
                                    return _context12.stop();
                                }
                              }
                            }, _callee12, this);
                          }));

                          return function (_x9, _x10) {
                            return _ref9.apply(this, arguments);
                          };
                        }());
                      } catch (err) {
                        console.error('imap search', err); //eslint-disable-line

                        return err;
                      }
                    }));

                  case 3:
                  case "end":
                    return _context13.stop();
                }
              }
            }, _callee13, this);
          }));

          return function searchAndSave(_x8) {
            return _searchAndSave.apply(this, arguments);
          };
        }()
      }]);

      return MailerParserModule;
    }()
  );
};

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXJzZXIuanMiXSwibmFtZXMiOlsiY3R4IiwicHJlZml4IiwicGFyc2VyQ29uZmlnIiwiZGVmYXVsdFBhcnNlckNvbmZpZyIsInBhcnNlSW50ZXJ2YWwiLCJwYXJzZVRpbWVvdXQiLCJwYXJzZUxpbWl0IiwiaW1hcENvbmZpZyIsImNvbmZpZyIsImNvbnNvbGUiLCJsb2ciLCJtb2RlbHMiLCJyZXF1aXJlIiwiZGVmYXVsdCIsImxvZ2dlciIsImNyZWF0ZUxvZ2dlciIsIm5hbWUiLCJsZXZlbCIsImNvbm5lY3Rpb25zIiwicnVuQ3JvbiIsImVyciIsImVycm9yIiwiZGVidWciLCJ0cmFjZSIsImJveGVzIiwiYm94IiwiZGlzY29ubmVjdCIsImNvbm5lY3Rpb24iLCJQcm9taXNlIiwibWFwU2VyaWVzIiwiYm94TmFtZSIsImNyZWF0ZUNvbm5lY3Rpb24iLCJzeW5jIiwiZGVsYXkiLCJfX0lOU1RBTkNFIiwic3luY0FsbCIsInNldFRpbWVvdXQiLCJyZXNvbHZlIiwicmVqZWN0IiwiSW1hcCIsIm9wZW5JbmJveCIsImNiIiwib3BlbkJveCIsImlzUmVhZHkiLCJvbmNlIiwib24iLCJjb25uZWN0IiwiZW5kIiwicmVzIiwibWVzc2FnZSIsInN1YnR5cGUiLCJFbWFpbCIsIlRocmVhZCIsImNvdW50RG9jdW1lbnRzIiwidWlkIiwiZnJvbSIsImFkZHJlc3MiLCJpc0V4aXN0IiwiZW1haWwiLCJpbmZvIiwiZGF0ZSIsInRleHQiLCJodG1sIiwicmVjZWl2ZWREYXRlIiwic3ViamVjdCIsInJlZmVyZW5jZXMiLCJtZXNzYWdlSWQiLCJjYyIsImJjYyIsInRvIiwiZ21haWxUaHJlYWRJZCIsImZpbmRPbmUiLCJzZWxlY3QiLCJ0aHJlYWQiLCJzYXZlIiwidGhyZWFkSWQiLCJfaWQiLCJjYWxjdWxhdGVTdW1tYXJ5IiwiZW1pdCIsIl9fU1RBR0UiLCIkZXhpc3RzIiwic29ydCIsImxhc3RFbWFpbCIsImZpbHRlciIsImFkZCIsImxvY2FsZSIsImZvcm1hdCIsInB1c2giLCJsZW5ndGgiLCJzZWFyY2hBbmRTYXZlIiwiZiIsIm1lc3NhZ2VzIiwibXNnIiwibXAiLCJNYWlsUGFyc2VyIiwic3RyZWFtIiwiYXR0cnMiLCJwaXBlIiwiaGVhZGVycyIsIm9iaiIsImRhdGFFcnJvciIsImhlYWRlcnNFcnJvciIsImF0dHJFcnJvcnMiLCJib2R5RXJyb3IiLCJpbmJveCIsImZldGNoVGltZW91dCIsIkVycm9yIiwic2VhcmNoIiwic2VhcmNoRXJyIiwicmVzdWx0cyIsImZpbmQiLCIkaW4iLCJlbWFpbHMiLCJzbGljZSIsImZldGNoIiwiYm9kaWVzIiwic3RydWN0IiwiZ2V0TWVzc2FnZXMiLCJjbGVhclRpbWVvdXQiLCJtYXAiLCJpIiwiZ2V0IiwicmVjZWl2ZWQiLCJ2YWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsIkRhdGUiLCJtYXRjaCIsImRlbGl2ZXJlZFRvIiwic2F2ZUVtYWlsIiwiY29uY3VycmVuY3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztlQUVlLGtCQUFDQSxHQUFELEVBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUk7QUFDQSx5QkFBS0MsTUFBTCxHQUFjLFFBQWQ7QUFDQSx5QkFBS0MsWUFBTCxHQUFvQixrQkFBSUYsR0FBSixFQUFTLHNCQUFULENBQXBCO0FBQ0EseUJBQUtHLG1CQUFMLEdBQTJCO0FBQ3pCQyxxQ0FBZSxLQURVO0FBRXpCQyxvQ0FBYyxNQUZXO0FBR3pCQyxrQ0FBWTtBQUhhLHFCQUEzQjs7QUFLQSx3QkFBSSxLQUFLSixZQUFULEVBQXVCO0FBQ3JCLDJCQUFLQSxZQUFMLEdBQW9CLG9CQUFNLEtBQUtDLG1CQUFYLEVBQWdDLEtB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akIsR0FBUCxFQUFZO0FBQ1pYLGdDQUFRWSxLQUFSLENBQWMsYUFBZCxFQUE2QkQsR0FBN0IsRUFEWSxDQUN3Qjs7QUFDcEMsK0JBQU9BLEdBQVA7QUFDRDtBQUNGLHFCQWxITSxDQW5PWDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQXdWRCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltYXAgZnJvbSAnaW1hcCc7XG5pbXBvcnQgbSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gvZ2V0JztcbmltcG9ydCBmaW5kIGZyb20gJ2xvZGFzaC9maW5kJztcbmltcG9ydCBzZXQgZnJvbSAnbG9kYXNoL3NldCc7XG5pbXBvcnQgbWVyZ2UgZnJvbSAnbG9kYXNoL21lcmdlJztcbmltcG9ydCB7IE1haWxQYXJzZXIgfSBmcm9tICdtYWlscGFyc2VyJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcblxuZXhwb3J0IGRlZmF1bHQgKGN0eCkgPT4ge1xuICAvLyDQlNC+0LvQttC90LAg0LHRi9GC0Ywg0LLRi9C60LvRjtGH0LXQvdCwINC00LLRg9GF0YTQsNC60YLQvtGA0L3QsNGPINCw0LLRgtC+0YDQuNC30LDRhtC40Y9cbiAgLy8g0J/RgNC40LzQtdGAINC60L7QvdGE0LjQs9CwXG4gIC8vIHtcbiAgLy8gICBcInVzZXJcIjogXCJlbWFpbFwiLFxuICAvLyAgIFwicGFzc3dvcmRcIjogXCJxd2VydHl1aVwiLFxuICAvLyAgIFwiaG9zdFwiOiBcImltYXAuZ21haWwuY29tXCIsXG4gIC8vICAgXCJwb3J0XCI6IFwiOTkzXCIsXG4gIC8vICAgXCJ0bHNcIjogdHJ1ZVxuICAvLyB9XG4gIHJldHVybiBjbGFzcyBNYWlsZXJQYXJzZXJNb2R1bGUge1xuICAgIGFzeW5jIGluaXQoKSB7XG4gICAgICAvLyBwYXJzZXJcbiAgICAgIHRoaXMucHJlZml4ID0gJ21haWxlcic7XG4gICAgICB0aGlzLnBhcnNlckNvbmZpZyA9IGdldChjdHgsICdjb25maWcubWFpbGVyLnBhcnNlcicpO1xuICAgICAgdGhpcy5kZWZhdWx0UGFyc2VyQ29uZmlnID0ge1xuICAgICAgICBwYXJzZUludGVydmFsOiA2MDAwMCxcbiAgICAgICAgcGFyc2VUaW1lb3V0OiAzMDAwMDAsXG4gICAgICAgIHBhcnNlTGltaXQ6IDEwMCxcbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5wYXJzZXJDb25maWcpIHtcbiAgICAgICAgdGhpcy5wYXJzZXJDb25maWcgPSBtZXJnZSh0aGlzLmRlZmF1bHRQYXJzZXJDb25maWcsIHRoaXMucGFyc2VyQ29uZmlnKTtcbiAgICAgICAgdGhpcy5pbWFwQ29uZmlnID0gdGhpcy5wYXJzZXJDb25maWcuY29uZmlnO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2codGhpcy5wYXJzZXJDb25maWcsICdwYXJzZXJDb25maWcnKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW1hcENvbmZpZywgJ2ltYXBDb25maWcnKTtcbiAgICAgIHRoaXMubW9kZWxzID0gcmVxdWlyZSgnLi9tb2RlbHMnKS5kZWZhdWx0KGN0eCwgdGhpcyk7XG4gICAgfVxuICAgIGFzeW5jIHJ1bigpIHtcbiAgICAgIGlmICghdGhpcy5wYXJzZXJDb25maWcgfHwgIXRoaXMuaW1hcENvbmZpZykgcmV0dXJuO1xuICAgICAgdGhpcy5sb2dnZXIgPSBjdHguY3JlYXRlTG9nZ2VyKHtcbiAgICAgICAgbmFtZTogJ21haWxlcicsXG4gICAgICAgIGxldmVsOiAndHJhY2UnLFxuICAgICAgfSk7XG4gICAgICB0aGlzLmxvZygnaW1hcCBkZWJ1ZycpO1xuICAgICAgdGhpcy5sb2coJ2ltYXAgcGFyc2VJbnRlcnZhbCcsIHRoaXMucGFyc2VyQ29uZmlnLnBhcnNlSW50ZXJ2YWwpO1xuICAgICAgdGhpcy5jb25uZWN0aW9ucyA9IHt9O1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gY29uc29sZS50aW1lKCdpbWFwUGFyc2UnKTtcbiAgICAgICAgLy8gYXdhaXQgdGhpcy5zeW5jKHsgYm94OiAnSU5CT1gnIH0pO1xuICAgICAgICAvLyBhd2FpdCB0aGlzLnN5bmMoeyBib3g6IGNvbmZpZy5ib3hlcy5pbmJveCB9KTtcbiAgICAgICAgdGhpcy5ydW5Dcm9uKCk7XG4gICAgICAgIC8vIGNvbnNvbGUudGltZUVuZCgnaW1hcFBhcnNlJyk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignaW1hcCBydW4nLCBlcnIpOyAgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICB9XG4gICAgfVxuICAgIGxvZyguLi5hcmdzKSB7XG4gICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICB0aGlzLmxvZ2dlci50cmFjZSguLi5hcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RvcCgpIHtcbiAgICAgIHRoaXMucGFyc2VyQ29uZmlnLmJveGVzKCh7IGJveCB9KSA9PiB7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdCh7IGNvbm5lY3Rpb246IHRoaXMuY29ubmVjdGlvbnNbYm94XSB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBzeW5jQWxsKCkge1xuICAgICAgdGhpcy5sb2coJ3N5bmNBbGwnKTtcbiAgICAgIGNvbnN0IHsgYm94ZXMgfSA9IHRoaXMucGFyc2VyQ29uZmlnO1xuICAgICAgYXdhaXQgUHJvbWlzZS5tYXBTZXJpZXMoYm94ZXMsIGFzeW5jIChib3gpID0+IHtcbiAgICAgICAgY29uc3QgeyBib3g6IGJveE5hbWUgfSA9IGJveDtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uc1tib3hOYW1lXSA9IGF3YWl0IHRoaXMuY3JlYXRlQ29ubmVjdGlvbihib3gpO1xuICAgICAgICBhd2FpdCB0aGlzLnN5bmMoeyAuLi5ib3gsIGNvbm5lY3Rpb246IHRoaXMuY29ubmVjdGlvbnNbYm94TmFtZV0gfSk7XG4gICAgICAgIGF3YWl0IFByb21pc2UuZGVsYXkoNTAwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBydW5Dcm9uKCkge1xuICAgICAgaWYgKF9fSU5TVEFOQ0UgIT09ICcxJykgcmV0dXJuO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5zeW5jQWxsKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignaW1hcCBzeW5jQWxsJywgZXJyKTsgIC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2coY29uZmlnLnBhcnNlSW50ZXJ2YWwsICdjb25maWcucGFyc2VJbnRlcnZhbCcpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJ1bkNyb24oKSwgdGhpcy5wYXJzZXJDb25maWcucGFyc2VJbnRlcnZhbCk7XG4gICAgfVxuICAgIGFzeW5jIGNyZWF0ZUNvbm5lY3Rpb24oeyBib3ggfSkge1xuICAgICAgaWYgKCF0aGlzLnBhcnNlckNvbmZpZyB8fCAhdGhpcy5pbWFwQ29uZmlnKSB0aHJvdyAnIWNvbmZpZyc7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IEltYXAodGhpcy5pbWFwQ29uZmlnKTtcbiAgICAgICAgdGhpcy5sb2coJ2NyZWF0ZUNvbm5lY3Rpb24nLCB7IGJveCB9KTtcbiAgICAgICAgZnVuY3Rpb24gb3BlbkluYm94KGNiKSB7XG4gICAgICAgICAgY29ubmVjdGlvbi5vcGVuQm94KGJveCwgdHJ1ZSwgY2IpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgIGNvbm5lY3Rpb24ub25jZSgncmVhZHknLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2coJ29wZW5Cb3gnLCBib3gpO1xuICAgICAgICAgIG9wZW5JbmJveCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIHRoaXMubG9nKCdvcGVuQm94IGVycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvZygnYm94IG9wZW5lZCcsIHsgYm94IH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoY29ubmVjdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25uZWN0aW9uLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgICAgICB0aGlzLmxvZygnaW1hcCBjb25uZWN0aW9uIGVycm9yJywgZXJyKTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdpbWFwIGNvbm5lY3Rpb24gZXJyb3InLCBlcnIpOyAgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29ubmVjdGlvbi5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgIC8vIGZvciBhbmRydXhhIGRlYnVnXG4gICAgICAgICAgdGhpcy5sb2coJ2Nvbm5lY3Rpb24gZW5kJywgeyBib3ggfSk7XG4gICAgICAgICAgaWYgKCFpc1JlYWR5KSByZWplY3QoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbm5lY3Rpb24uY29ubmVjdCgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGRpc2Nvbm5lY3QoeyBjb25uZWN0aW9uIH0pIHtcbiAgICAgIGlmICghdGhpcy5wYXJzZXJDb25maWcgfHwgIXRoaXMuaW1hcENvbmZpZykgdGhyb3cgJyFjb25maWcnO1xuICAgICAgaWYgKCFjb25uZWN0aW9uKSB0aHJvdyAnIWNvbm5lY3Rpb24nO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBzYXZlRW1haWwoeyBtZXNzYWdlLCBzdWJ0eXBlID0gJ2knIH0pIHtcbiAgICAgIGNvbnN0IHsgRW1haWwsIFRocmVhZCB9ID0gdGhpcy5tb2RlbHM7XG4gICAgICBjb25zdCBpc0V4aXN0ID0gYXdhaXQgRW1haWwuY291bnREb2N1bWVudHMoeyB1aWQ6IG1lc3NhZ2UudWlkLCAnZnJvbS5hZGRyZXNzJzogbWVzc2FnZS5mcm9tLmFkZHJlc3MgfSk7XG4gICAgICBpZiAoaXNFeGlzdCkgcmV0dXJuO1xuICAgICAgY29uc3QgZW1haWwgPSBuZXcgRW1haWwoe1xuICAgICAgICB1aWQ6IG1lc3NhZ2UudWlkLFxuICAgICAgICBpbmZvOiB7XG4gICAgICAgICAgZGF0ZTogbWVzc2FnZS5kYXRlLFxuICAgICAgICAgIHRleHQ6IG1lc3NhZ2UudGV4dCxcbiAgICAgICAgICBodG1sOiBtZXNzYWdlLmh0bWwsXG4gICAgICAgICAgcmVjZWl2ZWREYXRlOiBtZXNzYWdlLnJlY2VpdmVkRGF0ZSxcbiAgICAgICAgICBzdWJqZWN0OiBtZXNzYWdlLnN1YmplY3QsXG4gICAgICAgICAgcmVmZXJlbmNlczogbWVzc2FnZS5yZWZlcmVuY2VzLFxuICAgICAgICAgIG1lc3NhZ2VJZDogbWVzc2FnZS5tZXNzYWdlSWQsXG4gICAgICAgICAgY2M6IG1lc3NhZ2UuY2MsXG4gICAgICAgICAgYmNjOiBtZXNzYWdlLmJjYyxcbiAgICAgICAgfSxcbiAgICAgICAgZnJvbTogbWVzc2FnZS5mcm9tLFxuICAgICAgICB0bzogbWVzc2FnZS50byxcbiAgICAgICAgc3VidHlwZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZ21haWxUaHJlYWRJZCA9IG1lc3NhZ2VbJ3gtZ20tdGhyaWQnXTtcbiAgICAgIGlmIChnbWFpbFRocmVhZElkKSB7XG4gICAgICAgIGxldCB0aHJlYWQgPSBhd2FpdCBUaHJlYWRcbiAgICAgICAgICAuZmluZE9uZSh7ICdpbmZvLmdtYWlsVGhyZWFkSWQnOiBnbWFpbFRocmVhZElkIH0pXG4gICAgICAgICAgLnNlbGVjdChbJ19pZCddKTtcbiAgICAgICAgaWYgKCF0aHJlYWQpIHtcbiAgICAgICAgICB0aHJlYWQgPSBuZXcgVGhyZWFkKHtcbiAgICAgICAgICAgIGluZm86IHtcbiAgICAgICAgICAgICAgZ21haWxUaHJlYWRJZCxcbiAgICAgICAgICAgICAgc3ViamVjdDogZW1haWwuaW5mby5zdWJqZWN0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhd2FpdCB0aHJlYWQuc2F2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVtYWlsLnRocmVhZElkID0gdGhyZWFkLl9pZDtcbiAgICAgICAgYXdhaXQgZW1haWwuc2F2ZSgpO1xuICAgICAgICBhd2FpdCB0aHJlYWQuY2FsY3VsYXRlU3VtbWFyeSgpO1xuICAgICAgICBhd2FpdCB0aHJlYWQuc2F2ZSgpO1xuICAgICAgICBjdHguZW1pdCgnbW9kZWxzLkVtYWlsLnNhdmVkJywgeyBlbWFpbCwgdGhyZWFkIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgZW1haWwuc2F2ZSgpO1xuICAgICAgICBjdHguZW1pdCgnbW9kZWxzLkVtYWlsLnNhdmVkJywgeyBlbWFpbCB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgc3luYyh7IGJveCA9ICdJTkJPWCcsIGNvbm5lY3Rpb24sIHN1YnR5cGUgfSkge1xuICAgICAgaWYgKF9fU1RBR0UgPT09ICdtYXN0ZXInKSB0aHJvdyAnU1RBR0UgPT09IG1hc3Rlcic7XG4gICAgICBjb25zdCB7IEVtYWlsIH0gPSB0aGlzLm1vZGVscztcbiAgICAgIGNvbnN0IGxhc3RFbWFpbCA9IGF3YWl0IEVtYWlsXG4gICAgICAgIC5maW5kT25lKHtcbiAgICAgICAgICAnaW5mby5kYXRlJzoge1xuICAgICAgICAgICAgJGV4aXN0czogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1YnR5cGUsXG4gICAgICAgIH0pXG4gICAgICAgIC5zb3J0KHsgJ2luZm8uZGF0ZSc6IC0xIH0pXG4gICAgICAgIC5zZWxlY3QoWydpbmZvLmRhdGUnXSk7XG4gICAgICBjb25zdCBmaWx0ZXIgPSBbXTtcbiAgICAgIGlmIChsYXN0RW1haWwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBkYXRlID0gbShsYXN0RW1haWwuaW5mby5kYXRlKVxuICAgICAgICAgICAgLmFkZCgtMSwgJ2RheScpXG4gICAgICAgICAgICAubG9jYWxlKCdlbicpXG4gICAgICAgICAgICAuZm9ybWF0KCdMTCcpO1xuICAgICAgICAgIGZpbHRlci5wdXNoKFsnU0lOQ0UnLCBkYXRlXSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2ltYXAsIHN5bmMgZGF0ZSBlcnJvcicsIGVycik7ICAvL2VzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5sb2coJ2ZpbHRlcicsIGZpbHRlcik7XG4gICAgICBpZiAoIWZpbHRlci5sZW5ndGgpIGZpbHRlci5wdXNoKCdBTEwnKTtcbiAgICAgIGF3YWl0IHRoaXMuc2VhcmNoQW5kU2F2ZSh7IGZpbHRlciwgYm94LCBjb25uZWN0aW9uLCBzdWJ0eXBlIH0pO1xuICAgICAgdGhpcy5kaXNjb25uZWN0KHsgY29ubmVjdGlvbiB9KTtcbiAgICB9XG4gICAgYXN5bmMgZ2V0TWVzc2FnZXMoZiwgbGVuZ3RoKSB7XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IFtdO1xuICAgICAgdGhpcy5sb2coJ2dldE1lc3NhZ2VzIHN0YXJ0JywgbGVuZ3RoKTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGYub24oJ21lc3NhZ2UnLCAobXNnKSA9PiB7XG4gICAgICAgICAgY29uc3QgbXAgPSBuZXcgTWFpbFBhcnNlcigpO1xuICAgICAgICAgIG1zZy5vbignYm9keScsIChzdHJlYW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7fTtcbiAgICAgICAgICAgIG1zZy5vbignYXR0cmlidXRlcycsIChhdHRycykgPT4ge1xuICAgICAgICAgICAgICBtZXNzYWdlLmF0dHJzID0gYXR0cnM7XG4gICAgICAgICAgICAgIHN0cmVhbS5waXBlKG1wKTtcbiAgICAgICAgICAgICAgbXAub24oJ2hlYWRlcnMnLCAoaGVhZGVycykgPT4ge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UuaGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICAgICAgICAgICAgbXAub24oJ2RhdGEnLCBhc3luYyAob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlLm9iaiA9IG9iajtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmxvZyhgJHttZXNzYWdlcy5sZW5ndGh9LyR7bGVuZ3RofWAsICdnZXRNZXNzYWdlcycpO1xuICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gbGVuZ3RoKSByZXNvbHZlKG1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICB9KS5vbignZXJyb3InLCAoZGF0YUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdpbWFwIGdldE1lc3NhZ2VzIGYgb24gZGF0YScsIGRhdGFFcnJvcikgIC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICAgICAgcmVqZWN0KGRhdGFFcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pLm9uKCdlcnJvcicsIChoZWFkZXJzRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdpbWFwIGdldE1lc3NhZ2VzIGYgb24gaGVhZGVycycsIGhlYWRlcnNFcnJvcikgIC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICAgIHJlamVjdChoZWFkZXJzRXJyb3IpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLm9uKCdlcnJvcicsIChhdHRyRXJyb3JzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2ltYXAgZ2V0TWVzc2FnZXMgZiBvbiBhdHRyaWJ1dGVzJywgYXR0ckVycm9ycykgIC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICByZWplY3QoYXR0ckVycm9ycyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KS5vbignZXJyb3InLCAoYm9keUVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdpbWFwIGdldE1lc3NhZ2VzIGYgb24gYm9keScsIGJvZHlFcnJvcikgIC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgcmVqZWN0KGJvZHlFcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLm9uKCdlcnJvcicsIChlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2ltYXAgZ2V0TWVzc2FnZXMgZiBvbiBtZXNzYWdlJywgZXJyb3IpICAvL2VzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBzZWFyY2hBbmRTYXZlKHsgZmlsdGVyLCBjb25uZWN0aW9uLCBib3ggPSB0aGlzLnBhcnNlckNvbmZpZy5ib3hlcy5pbmJveCwgc3VidHlwZSB9KSB7XG4gICAgICB0aGlzLmxvZygnc2VhcmNoQW5kU2F2ZScsIHsgZmlsdGVyLCBib3ggfSk7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGZldGNoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcigndGltZW91dCcpKTtcbiAgICAgICAgICB9LCB0aGlzLnBhcnNlckNvbmZpZy5wYXJzZVRpbWVvdXQpOyAvLyDQtdGB0LvQuCDQv9Cw0YDRgdC40YLRjCDRgdC70LjRiNC60L7QvCDQtNC+0LvQs9C+LCDQt9Cw0LLQuNGBLCDRgtC+INC30LDQutCw0L3Rh9C40LLQsNC10Lwg0L/QsNGA0YHQuNC90LNcbiAgICAgICAgICAvLyBjb25uZWN0aW9uLmdldEJveGVzKChlcnIyLCBib3hlcykgPT4geyAvLyDQndCwINCy0YHRj9C60LjQuSDRgdC70YPRh9Cw0LlcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHsgZXJyMiwgYm94ZXMgfSk7XG4gICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgdGhpcy5sb2coJ3NlYXJjaCcsIHsgYm94LCBmaWx0ZXIsIHN1YnR5cGUgfSk7XG4gICAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uc2VhcmNoKGZpbHRlciwgYXN5bmMgKHNlYXJjaEVyciwgcmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2coJ3NlYXJjaCByZXN1bHQnLCB7IHNlYXJjaEVyciwgcmVzdWx0cyB9KTtcbiAgICAgICAgICAgIGlmIChzZWFyY2hFcnIpIHJldHVybiByZWplY3Qoc2VhcmNoRXJyKTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0cy5sZW5ndGgpIHJldHVybiByZXNvbHZlKFtdKTtcbiAgICAgICAgICAgIGNvbnN0IHsgRW1haWwgfSA9IHRoaXMubW9kZWxzO1xuICAgICAgICAgICAgY29uc3QgZW1haWxzID0gYXdhaXQgRW1haWxcbiAgICAgICAgICAgICAgLmZpbmQoe1xuICAgICAgICAgICAgICAgIHVpZDoge1xuICAgICAgICAgICAgICAgICAgJGluOiByZXN1bHRzLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5zZWxlY3QoWyd1aWQnXSk7XG4gICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5maWx0ZXIoKHVpZCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gIWZpbmQoZW1haWxzLCB7IHVpZCB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gdGhpcy5wYXJzZXJDb25maWcucGFyc2VMaW1pdCkge1xuICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5zbGljZSgwLCB0aGlzLnBhcnNlckNvbmZpZy5wYXJzZUxpbWl0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcmVzdWx0cy5sZW5ndGgpIHJldHVybiByZXNvbHZlKFtdKTtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24ub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdpbWFwIGNvbm5lY3Rpb24gb24gZXJyb3InLCBlcnIpOyAgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBmID0gY29ubmVjdGlvbi5mZXRjaChyZXN1bHRzLCB7XG4gICAgICAgICAgICAgIGJvZGllczogJycsXG4gICAgICAgICAgICAgIHN0cnVjdDogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCB0aGlzLmdldE1lc3NhZ2VzKGYsIHJlc3VsdHMubGVuZ3RoKTtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChmZXRjaFRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5sb2coJ2dldE1lc3NhZ2VzIGNvbXBsZXRlZCcpO1xuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5tYXAobWVzc2FnZXMsIGFzeW5jICh7IGF0dHJzLCBvYmosIGhlYWRlcnMgfSwgaSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IG51bGwsXG4gICAgICAgICAgICAgICAgdGV4dDogbnVsbCxcbiAgICAgICAgICAgICAgICBzdWJqZWN0OiBudWxsLFxuICAgICAgICAgICAgICAgIGh0bWw6IG51bGwsXG4gICAgICAgICAgICAgICAgdWlkOiBudWxsLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGF0dHJzKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnVpZCA9IGF0dHJzLnVpZDtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnRleHQgPSBvYmoudGV4dDtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLmh0bWwgPSBvYmouaHRtbDtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8nKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlLnRleHQsICd0ZXh0Jyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZS5oZWFkZXJzKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlLnN1YmplY3QgPSBoZWFkZXJzLmdldCgnc3ViamVjdCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyb20gPSBoZWFkZXJzLmdldCgnZnJvbScpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHsgdGhyaWQgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdG8gPSBoZWFkZXJzLmdldCgndG8nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYyA9IGhlYWRlcnMuZ2V0KCdjYycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJjYyA9IGhlYWRlcnMuZ2V0KCdiY2MnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlSWQgPSBoZWFkZXJzLmdldCgnbWVzc2FnZS1pZCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmVyZW5jZXMgPSBoZWFkZXJzLmdldCgncmVmZXJlbmNlcycpO1xuICAgICAgICAgICAgICAgIGxldCByZWNlaXZlZCA9IGhlYWRlcnMuZ2V0KCdyZWNlaXZlZCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBoZWFkZXJzLmdldCgnZGF0ZScpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGUpO1xuICAgICAgICAgICAgICAgIGlmIChjYz8udmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuY2MgPSBjYy52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGJjYz8udmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuYmNjID0gYmNjLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVjZWl2ZWQpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlY2VpdmVkKSkge1xuICAgICAgICAgICAgICAgICAgICByZWNlaXZlZCA9IHJlY2VpdmVkWzBdO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKHJlY2VpdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlY2VpdmVkRGF0ZSA9IG5ldyBEYXRlKHJlY2VpdmVkLm1hdGNoKC87ICguKikvKVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UucmVjZWl2ZWREYXRlID0gcmVjZWl2ZWREYXRlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZS5kYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlZmVyZW5jZXMsICdyZWZlcmVuY2VzJyk7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5tZXNzYWdlSWQgPSBtZXNzYWdlSWQ7XG4gICAgICAgICAgICAgICAgbWVzc2FnZS5yZWZlcmVuY2VzID0gcmVmZXJlbmNlcztcbiAgICAgICAgICAgICAgICBpZiAoZnJvbSkge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZS5mcm9tID0gZnJvbS52YWx1ZVswXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRvKSB7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlLnRvID0gdG8udmFsdWVbMF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGRlbGl2ZXJlZFRvID0gaGVhZGVycy5nZXQoJ2RlbGl2ZXJlZC10bycpO1xuICAgICAgICAgICAgICAgICAgaWYgKGRlbGl2ZXJlZFRvPy52YWx1ZT8uWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UudG8gPSBkZWxpdmVyZWRUby52YWx1ZVswXTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJzWyd4LWdtLXRocmlkJ10pIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2VbJ3gtZ20tdGhyaWQnXSA9IGF0dHJzWyd4LWdtLXRocmlkJ107IC8vIEdtYWlsIFRocmVhZCBJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNhdmVFbWFpbCh7IG1lc3NhZ2UsIGJveCwgc3VidHlwZSB9KTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAocGFyc2VFcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2ltYXAgc3luYyBzZWFyY2ggb24gXCJkYXRhXCInLCBwYXJzZUVycm9yKTsgIC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMubG9nKGAke2kgKyAxfS8ke3Jlc3VsdHMubGVuZ3RofWAsICdzYXZlRW1haWwnKTtcbiAgICAgICAgICAgIH0sIHsgY29uY3VycmVuY3k6IDUgfSk7XG4gICAgICAgICAgICB0aGlzLmxvZygncGFyc2UgY29tcGxldGVkJywgYm94KTtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2ltYXAgc2VhcmNoJywgZXJyKTsgIC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn07XG4iXX0=