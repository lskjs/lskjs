// import api from 'lego-starter-kit/api/api.client'
// export default api
/* eslint-disable */
export default function getDocs(ctx, params) {
  const paths = {
    "/user123": {
      "get": {
        "summary": "Позволяет получить список всех юзеров в системе\n",
        "tags": ["user"],
        "responses": {
          "200": {
            "description": "Массив пользователей",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/User"
              }
            }
          }
        }
      }
    }
  }
  // Object.assign(paths, require('./profiles/profiles.docs.js').default(ctx, params))
  // Object.assign(paths, require('./user.docs.js').default(ctx, params)),
  // Object.assign(paths, require('./user.docs.js').default(ctx, params)),

  // console.log(ctx.config);
  const site = ctx.config && ctx.config.client && ctx.config.client.site || { title: 'API' }
  const url = ctx.config.url;
  // const info = {
  //   title:
  // }
  return Object.assign({
    "swagger": "2.0",
    "info": {
      ...site,
      title: site.title + ' API',
      // "title": "hijayAPI",
      // "description": "Move your app forward with the Uber API",
      version: params.v
    },
    "host": url,
    // "host": url + params.path,
    "schemes": [
      url.split('://')[0]
    ],
    "basePath": params.path,
    "produces": ["application/json"],
    "paths": {
      "/authenticate":{
        "post": {
          "summary": "Авторизация",
          "parameters": [
            {
              "name": "secret",
              "in": "query",
              "description": "#piupiu!!!QWErty123HiJAY_2016#",
              "required": true,
              "type": "string"
            },{
              "name": "linkToSocialNetwork",
              "in": "query",
              "description": "social net profile id",
              "required": true,
              "type": "string"
            }, {
              "name": "socialNetworkType",
              "in": "query",
              "description": "vk or fb",
              "required": true,
              "type": "string"
            }
          ],
          "tags": ["Profiles"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type":"object",
                "properties":{
                  "profile":{
                    "$ref": "#/definitions/ProfileExtend"
                  },
                  "token":{
                    "type":"string"
                  }
                }


              }
            }
          }
        }
      },
      "/profiles": {
        "post": {
          "summary": "Создание нового профиля пользователя",
          "parameters": [
            {
              "name": "secret",
              "in": "query",
              "description": "secret key hardcoded in app",
              "required": true,
              "type": "string"
            }, {
              "name": "name",
              "in": "query",
              "description": "username in app",
              "required": true,
              "type": "string"
            }, {
              "name": "description",
              "in": "query",
              "description": "user about info in app",
              "required": false,
              "type": "string"
            }, {
              "name": "email",
              "in": "query",
              "description": "user email",
              "required": true,
              "type": "string"
            }, {
              "name": "nativeLanguage",
              "in": "query",
              "description": "language code",
              "required": true,
              "type": "string"
            }, {
              "name": "learningLanguages",
              "in": "query",
              "description": "language codes",
              "required": true,
              "type": "array",
              "items": {
                "type": "string"
              }
            }, {
              "name": "bdate",
              "in": "query",
              "description": "reg date YYYY-MM-DDTHH:mm:ss.sssZ",
              "required": true,
              "type": "string",
              "format": "string-date"
            }, {
              "name": "avatar",
              "in": "query",
              "description": "user avatar",
              "required": false,
              "type": "string",
              "format": "byte"
            }, {
              "name": "city",
              "in": "query",
              "description": "user city",
              "required": false,
              "type": "string"
            }, {
              "name": "pubNub",
              "in": "query",
              "description": "pubnub idy",
              "required": true,
              "type": "string"
            }, {
              "name": "linkToSocialNetwork",
              "in": "query",
              "description": "social net profile id",
              "required": false,
              "type": "string"
            }, {
              "name": "socialNetworkType",
              "in": "query",
              "description": "vk or fb",
              "required": false,
              "type": "string"
            }, {
              "name": "lat",
              "in": "query",
              "description": "Координата",
              "required": false,
              "type": "number"
            }, {
              "name": "lng",
              "in": "query",
              "description": "Координата",
              "required": false,
              "type": "number"
            }
          ],
          "tags": ["Profiles"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/ProfileExtend"
              }
            }
          },
          "example": {
            "_id": "57cd52a7ffeddc341d31bfc6",
            "updatedAt": "2016-09-05T12:21:38.307Z",
            "createdAt": "2016-09-05T11:10:31.120Z",
            "name": "Andruxa",
            "description": "Тестовый юзер, по совместительству Бог",
            "email": "shitric2@gmail.com",
            "nativeLanguage": "ru-RU",
            "bdate": "1994-10-09T20:00:00.000Z",
            "city": "TLT",
            "pubNub": "123",
            "isOnline": true,
            "__v": 0,
            "chatAvailable": true,
            "askHelp": null,
            "futureEvents": [],
            "lng": 111,
            "lat": 123,
            "avatar": "https://cdn0.vox-cdn.com/images/verge/default-avatar.v9899025.gif",
            "learningLanguages": ["en-EN"]
          }
        },
        "get": {
          "summary": "Получение данным о своем профиле",
          "tags": ["Profiles"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/ProfileExtend"
              }
            }
          }
        },
        "put": {
          "summary": "Редактирование своего профиля",
          "parameters": [
            {
              "name": "profile",
              "in": "query",
              "description": "profile_id",
              "required": true,
              "type": "string"
            }, {
              "name": "secret",
              "in": "query",
              "required": false,
              "type": "string"
            }, {
              "name": "name",
              "in": "query",
              "description": "username in app",
              "required": false,
              "type": "string"
            }, {
              "name": "description",
              "in": "query",
              "description": "user about info in app",
              "required": false,
              "type": "string"
            }, {
              "name": "email",
              "in": "query",
              "description": "user email",
              "required": false,
              "type": "string"
            }, {
              "name": "nativeLanguage",
              "in": "query",
              "description": "language code",
              "required": false,
              "type": "string"
            }, {
              "name": "nativeLanguages",
              "in": "query",
              "description": "language code",
              "required": false,
              "type": "array",
              "items": {
                "type": "string"
              }
            }, {
              "name": "bdate",
              "in": "query",
              "description": "reg date YYYY-MM-DDTHH:mm:ss.sssZ",
              "required": false,
              "type": "string",
              "format": "string-date"
            }, {
              "name": "avatar",
              "in": "query",
              "description": "user avatar",
              "required": false,
              "type": "string",
              "format": "byte"
            }, {
              "name": "city",
              "in": "query",
              "description": "user city",
              "required": false,
              "type": "string"
            }, {
              "name": "pubNub",
              "in": "query",
              "description": "pubnub idy",
              "required": false,
              "type": "string"
            }
          ],
          "tags": ["Profiles"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/ProfileExtend"
              }
            }
          }
        }
      },
      "/profiles/coordinates/{id}": {
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ],
        "get": {
          "summary": "Получение координат пользователя",
          "tags": ["Profiles"],
          "responses": {
            "200": {
              "description": "Координаты",
              "schema": {
                "$ref": "#/definitions/Coordinates"
              }
            }
          }
        }
      },
      "/profiles/coordinates": {
        "post": {
          "summary": "Отправка координат пользователя",
          "parameters": [
            {
              "name": "lat",
              "in": "query",
              "description": "latitude",
              "required": true,
              "type": "number",
              "format": "double"
            }, {
              "name": "lng",
              "in": "query",
              "description": "longtitude",
              "required": true,
              "type": "number",
              "format": "double"
            }
          ],
          "tags": ["Profiles"],
          "responses": {
            "200": {
              "description": "Координаты",
              "schema": {
                "$ref": "#/definitions/Coordinates"
              }
            }
          }
        }
      },
      "/profiles/device": {
        "post": {
          "summary": "Добавить устройство пользователя",
          "parameters": [
            {
              "name": "id",
              "in": "query",
              "required": false,
              "type": "string",
            },
            {
              "name": "token",
              "in": "query",
              "required": true,
              "type": "string",
            },
            {
              "name": "type",
              "in": "query",
              "required": true,
              "type": "string",
            },
          ],
          "tags": ["Profiles"],
          "responses": {
            "200": {
              "description": "Profile",
              "schema": {
                "$ref": "#/definitions/Profile"
              }
            }
          }
        },
        "delete": {
          "summary": "Удалить устройство пользователя",
          "parameters": [
            {
              "name": "id",
              "in": "query",
              "required": true,
              "description": "id или token",
              "type": "string",
            },
          ],
          "tags": ["Profiles"],
          "responses": {
            "200": {
              "description": "Devices",
              "schema": {
                "description": "Profile",
                "schema": {
                  "$ref": "#/definitions/Profile"
                }
              }
            }
          }
        },
        "get": {
          "summary": "Найти все устройства польхователя",
          "tags": ["Profiles"],
          "responses": {
            "200": {
              "description": "Devices",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/Device"
                }
              }
            }
          }
        },
      },
      "/profiles/new": {
        "get": {
          "summary": "Получить список новых пользователей",
          "description": "Получить список новых пользователей\n",
          "tags": ["Profiles"],
          "parameters": [
            {
              "name": "limit",
              "in": "query",
              "description": "default: 10",
              "required": false,
              "type": "number",
            },
          ],
          "responses": {
            "200": {
              "description": "Координаты",
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "avatar": {
                      "type": "string"
                    },
                    "language": {
                      "type": "string"
                    },
                    "lat": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "lng": {
                      "type": "integer",
                      "format": "int32"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/profiles/favorite": {
        "get": {
          "summary": "Получить список \"My Jays\"",
          "description": "Получить список \"My Jays\"\n",
          "tags": ["user"],
          "responses": {
            "200": {
              "description": "Координаты",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/Profile"
                }
              }
            }
          }
        }
      },
      "/requests/list": {
        "get": {
          "summary": "Получить список встреч 1 на 1",
          "description": "",
          "tags": [
            "Requests"
          ],
          "responses": {
            "200": {
              "description": "Координаты",
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "help": {
                      "type": "string"
                    },
                    "firstName": {
                      "type": "string"
                    },
                    "lastName": {
                      "type": "string"
                    },
                    "avatar": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "address": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "startDate": {
                      "type": "string",
                      "format": "date"
                    },
                    "language": {
                      "type": "string"
                    },
                    "created": {
                      "type": "string"
                    },
                    "lastMessage": {
                      "type": "string"
                    },
                    "isOnline": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/events/future": {
        "get": {
          "summary": "Список планируемых событий",
          "tags": [
            "Events"
          ],
          "responses": {
            "200": {
              "description": "Координаты",
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "status": {
                      "type": "string"
                    },
                    "title": {
                      "type": "string"
                    },
                    "image": {
                      "type": "string"
                    },
                    "place": {
                      "type": "integer",
                      "format": "int32"
                    },
                    "startDate": {
                      "type": "integer",
                      "format": "date"
                    },
                    "language": {
                      "type": "string",
                      "format": "date"
                    },
                    "lastMessage": {
                      "type": "string"
                    },
                    "isOnline": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/requests": {
        "get": {
          "summary": "Список планируемых событий",
          "tags": [
            "Requests"
          ],
          "parameters": [
            {
              "name": "dir",
              "in": "query",
              "required": false,
              "description":"from_me/to_me. Иначе выдаются все в которых ты учавствовал",
              "type": "string"
            },
            {
              "name": "help",
              "in": "query",
              "description":"help_me/help_you",
              "required": false,
              "type": "string"
            },
            {
              "name": "from",
              "in": "query",
              "required": false,
              "description": "date",
              "type": "string"
            },
            {
              "name": "to",
              "in": "query",
              "required": false,
              "description": "date",
              "type": "string"
            },
            {
              "name": "status",
              "in": "query",
              "description":"REVIEW/REJECTED/ACCEPTED. Default: [REVIEW,ACCEPTED]. Можно вводить через запятую",
              "required": false,
              "type": "string"
            },
          ],
          "responses": {
            "200": {
              "description": "Встреча",
              "schema": {
                "$ref": "#/definitions/Request"
              }
            }
          }
        },
        "post": {
          "summary": "Создать встречу",
          "tags": [
            "Requests"
          ],
          "parameters": [
            {
              "name": "from",
              "in": "query",
              "required": false,
              "type": "string"
            }, {
              "name": "to",
              "in": "query",
              "required": true,
              "type": "string"
            }, {
              "name": "place",
              "in": "query",
              "required": false,
              "type": "string"
            }, {
              "name": "help",
              "in": "query",
              "required": true,
              "type": "string"
            }, {
              "name": "startDate",
              "in": "query",
              "required": false,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "Встреча",
              "schema": {
                "$ref": "#/definitions/Request"
              }
            }
          }
        }
      },
      "/requests/{request_id}": {
        "parameters": [
          {
            "name": "request_id",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ],
        "put": {
          "summary": "Изменение даты и места в запросе",
          "tags": [
            "Requests"
          ],
          "parameters": [
            {
              "name": "place",
              "in": "query",
              "required": false,
              "type": "string"
            }, {
              "name": "startDate",
              "in": "query",
              "required": false,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "запрос",
              "schema": {
                "$ref": "#/definitions/Request"
              }
            }
          }
        }
      },
      "/requests/{request_id}/confirm": {
        "parameters": [
          {
            "name": "request_id",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ],
        "get": {
          "summary": "Подтвердить запрос",
          "tags": [
            "Requests"
          ],
          "parameters": [
            {
              "name": "place",
              "in": "query",
              "required": false,
              "description": "ID места встречи",
              "type": "string"
            },
            {
              "name": "startDate",
              "in": "query",
              "required": false,
              "type": "string",
              "description": "Время начала",
            },
          ],
          "responses": {
            "200": {
              "description": "запрос",
              "schema": {
                "type": "object",
                "$ref": "#/definitions/Request"
              }
            }
          }
        }
      },
      "/requests/{request_id}/reject": {
        "parameters": [
          {
            "name": "request_id",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ],
        "get": {
          "summary": "Отклонить запрос",
          "tags": [
            "Requests"
          ],
          "responses": {
            "200": {
              "description": "Координаты",
              "schema": {
                "type": "object",
                "$ref": "#/definitions/Request"
              }
            }
          }
        }
      },
      "/profiles/favorite": {
        "get": {
          "summary": "Получить список My Jays",
          "tags": [
            "Profiles"
          ],
          "parameters": [
            {
              "name": "language",
              "in": "query",
              "description": "язык",
              "required": false,
              "type": "string"
            },
            {
              "name": "distance",
              "in": "query",
              "description": "Расстояние в км",
              "required": false,
              "type": "number"
            }
          ],
          "responses": {
            "200": {
              "description": "My Jays",
              "schema": {
                "type": "array",
                "items":{
                  "$ref":"#/definitions/Profile"
                }
              }
            }
          }
        }
      },
      "/profiles/list": {
        "get": {
          "summary": "Получить список пользователей (пока без выборки по координатам)",
          "tags": [
            "Profiles"
          ],
          "parameters": [
            {
              "name": "language",
              "in": "query",
              "description": "язык",
              "required": false,
              "type": "string"
            },
            {
              "name": "distance",
              "in": "query",
              "description": "Расстояние в км",
              "required": false,
              "type": "number"
            }
          ],
          "responses": {
            "200": {
              "description": "My Jays",
              "schema": {
                "type": "array",
                "items":{
                  "$ref": "#/definitions/ProfileExtend"
                }
              }
            }
          }
        }
      },
      // "/profiles/list": {
      //   "get": {
      //     "summary": "Получить список пользователей (пока без выборки по координатам)",
      //     "description": "Получить список пользователей (пока без выборки по координатам)\n",
      //     "tags": [
      //       "user", "jays"
      //     ],
      //     "parameters": [
      //       {
      //         "name": "language",
      //         "in": "query",
      //         "required": true,
      //         "type": "number"
      //       }
      //     ],
      //     "responses": {
      //       "200": {
      //         "description": "Координаты",
      //         "schema": {
      //           "type": "object",
      //           "properties": {
      //             "jays": {
      //               "type": "array",
      //               "items": {
      //                 "type": "object",
      //                 "properties": {
      //                   "id": {
      //                     "type": "string"
      //                   },
      //                   "name": {
      //                     "type": "string"
      //                   },
      //                   "avatar": {
      //                     "type": "string"
      //                   },
      //                   "language": {
      //                     "type": "string"
      //                   },
      //                   "lat": {
      //                     "type": "integer",
      //                     "format": "int32"
      //                   },
      //                   "lng": {
      //                     "type": "integer",
      //                     "format": "int32"
      //                   }
      //                 }
      //               }
      //             },
      //             "meeting": {
      //               "type": "number",
      //               "format": "int32"
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // },
      "/profiles/{id}": {
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ],
        "get": {
          "summary": "Получить данные пользователя",
          "tags": ["Profiles"],
          "responses": {
            "200": {
              "description": "Profile",
              "schema": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "name": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "avatar": {
                    "type": "string"
                  },
                  "nativeLanguage": {
                    "type": "string"
                  },
                  "askHelp": {
                    "type": "string"
                  },
                  "lat": {
                    "type": "number"
                  },
                  "lng": {
                    "type": "number"
                  },
                  "learningLanguages": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "bdate": {
                    "type": "string",
                    "format": "date"
                  },
                  "city": {
                    "type": "string"
                  },
                  "pubNub": {
                    "type": "string"
                  },
                  "futureEvents": {
                    "type": "array",
                    "items": {
                      "$ref": "#/definitions/Event"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/profiles/future": {
        "get": {
          "summary": "Получить список будущих встреч",
          "tags": [
            "Profiles"
          ],
          "responses": {
            "200": {
              "description": "events",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/Event"
                }
              }
            }
          }
        }
      },
      "/profiles/future/all": {
        "get": {
          "summary": "Получить список будущих групповых встреч и встреч 1 на 1",
          "tags": [
            "Profiles"
          ],
          "responses": {
            "200": {
              "description": "events",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/Event"
                }
              }
            }
          }
        }
      },
      "/events": {
        // "get": {
        //   "summary": "Новое событие hijay",
        //   "description": "Создать новое событие hijay\n",
        //   "parameters": [
        //     {
        //       "name": "lang",
        //       "in": "query",
        //       "description": "Картинкаname",
        //       "required": true,
        //       "type": "string",
        //       "format": "byte"
        //     }, {
        //       "name": "radius",
        //       "in": "query",
        //       "description": "Язык",
        //       "required": true,
        //       "type": "string"
        //     }, {
        //       "name": "page",
        //       "in": "query",
        //       "description": "title",
        //       "required": true,
        //       "type": "string"
        //     }
        //   ],
        //   "tags": ["Events"],
        //   "responses": {
        //     "200": {
        //       "description": "Unexpected error",
        //       "schema": {
        //         "type": "array",
        //         "items": {
        //           "$ref": "#/definitions/Event"
        //         }
        //       }
        //     }
        //   }
        // },
        "post": {
          "summary": "Создать новое событие",
          "parameters": [
            {
              "name": "coverImage",
              "in": "query",
              "description": "Картинка",
              "required": false,
              "type": "string",
              "format": "byte"
            }, {
              "name": "language",
              "in": "query",
              "description": "Язык",
              "required": true,
              "type": "string"
            }, {
              "name": "title",
              "in": "query",
              "description": "title",
              "required": true,
              "type": "string"
            }, {
              "name": "description",
              "in": "query",
              "description": "description, it's optional field",
              "type": "string"
            }, {
              "name": "startDate",
              "in": "query",
              "description": "startDate, YYYY-MM-DDTHH:mm:ss.sssZ",
              "required": true,
              "type": "string"
            }, {
              "name": "place",
              "in": "query",
              "description": "place_id",
              "required": true,
              "type": "string"
            }
          ],
          "tags": ["Events"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/Event"
              }
            }
          }
        }
      },
      "/events/list": {
        "get": {
          "summary": "Получить список событий",
          "tags": ["Events"],
          "parameters": [
            {
              "name": "actual",
              "in": "query",
              "required": false,
              "type": "boolean",
              "description":"false возвращает все встречи, true встречи которые еще не начались или начались менее 24 часов назад. Default: true"
            },
            {
              "name": "language",
              "in": "query",
              "required": false,
              "type": "string",
              "description":"Фильтр по языкам. Перечислять через запятую"
            },
            {
              "name": "distance",
              "in": "query",
              "required": false,
              "type": "number",
              "description":"Расстояние. Default: 20 (в км)"
            },
            {
              "name": "lat",
              "in": "query",
              "required": false,
              "type": "string",
              "description":"Координата"
            },
            {
              "name": "lng",
              "in": "query",
              "required": false,
              "type": "string",
              "description":"Координата"
            },
          ],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/Event"
              }
            }
          }
        }
      },
      "/events/{event_id}": {
        "parameters": [
          {
            "name": "event_id",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ],
        "get": {
          "summary": "Получить данные о событии",
          "description": "Описание события которые передаются по get.\n",
          "tags": ["Events"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "language": {
                    "type": "string"
                  },
                  "title": {
                    "type": "string"
                  },
                  "description": {
                    "type": "string"
                  },
                  "coverImage": {
                    "type": "string"
                  },
                  "owner": {
                    "type": "string"
                  },
                  "participants": {
                    "type": "array",
                    "items": {
                      "$ref": "#/definitions/Participant"
                    }
                  },
                  "place": {
                    "type": "array",
                    "items": {
                      "$ref": "#/definitions/Place"
                    }
                  },
                  "wantVisit": {
                    "type": "boolean"
                  }
                }
              }
            }
          }
        }
      },
      "/events/{event_id}/visit": {
        "parameters": [
          {
            "name": "event_id",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ],
        "post": {
          "summary": "Принять участие в групповой встречи",
          "tags": ["Events"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/Event"
              }
            }
          }
        }
      },
      "/events/{event_id}/leave": {
        "parameters": [
          {
            "name": "event_id",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ],
        "post": {
          "summary": "Покинуть групповую встречу",
          "tags": ["Events"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/Event"
              }
            }
          }
        }
      },
      "/events/{event_id}/reject": {
        "parameters": [
          {
            "name": "event_id",
            "in": "path",
            "required": true,
            "type": "number"
          }
        ],
        "post": {
          "summary": "Отменить групповую встречу",
          "description": "Только для создателя встречи",
          "tags": ["Events"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/Event"
              }
            }
          }
        }
      },
      "/places/list": {
        "get": {
          "summary": "Получить данные о событии",
          "tags": ["Places"],
          "parameters": [
            {
              "name": "lat",
              "in": "query",
              "required": true,
              "type": "number"
            }, {
              "name": "lng",
              "in": "query",
              "required": true,
              "type": "number"
            }, {
              "name": "search",
              "in": "query",
              "required": false,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    // "price": {
                    //   "type": "string"
                    // },
                    "photo": {
                      "type": "string"
                    },
                    "address": {
                      "type": "string"
                    },
                    "lat": {
                      "type": "number"
                    },
                    "lng": {
                      "type": "number"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/report": {
        "post": {
          "summary": "Получить данные о событии",
          "tags": ["Report"],
          "parameters": [
            {
              "name": "to",
              "in": "query",
              "required": false,
              "type": "string",
            },
            {
              "name": "cc",
              "in": "query",
              "required": false,
              "type": "string",
            },
            {
              "name": "text",
              "in": "query",
              "required": true,
              "type": "string"
            },
            {
              "name": "reply",
              "in": "query",
              "required": true,
              "type": "string",
              "description": "email",
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "object",
                "properties": {
                  "mails": {
                    "type": "array",
                    "items": {
                      "$ref": "#/definitions/EmailReport"
                    },
                  },
                  "code": {
                    "type": "string",
                  },
                  "message": {
                    "type": "string",
                  },
                },
              }
            }
          }
        }
      },
      "/push": {
        "post": {
          "summary": "Системный пуш",
          "tags": ["Push"],
          "parameters": [
            {
              "name": "text",
              "in": "query",
              "required": true,
              "type": "string"
            },
          ],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "default": "success",
                  },
                  "params": {
                    "type": "object",
                    "properties": {
                      "text": {
                        "type": "string"
                      }
                    }
                  }
                },
              }
            }
          }
        }
      },
      "/test/push/{msg}": {
        "parameters": [
          {
            "name": "msg",
            "in": "path",
            "required": true,
            "description":"Тип сообщения: msg1-20",
            "type": "string"
          },
        ],
        "post": {
          "summary": "Тестирование уведомлений",
          "tags": ["Push"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "default": "success",
                  },
                  "params": {
                    "type": "object",
                    "properties": {
                      "text": {
                        "type": "string"
                      }
                    }
                  }
                },
              }
            }
          }
        }
      },
      "/abuse/user/{id}": {
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "post": {
          "summary": "Подать жалобу на юзера",
          "tags": ["Abuse"],
          "parameters": [
            {
              "name": "text",
              "in": "query",
              "required": false,
              "type": "string"
            },
          ],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "object",
                "properties": {
                  "profile": {
                    "$ref": "#/definitions/ProfileExtend"
                  },
                  "id": {
                    "type": "text",
                  },
                  "text": {
                    "type": "string",
                  }
                }
              }
            }
          }
        }
      },
      "/abuse/event/{id}": {
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "post": {
          "summary": "Подать жалобу на встречу",
          "tags": ["Abuse"],
          "parameters": [
            {
              "name": "text",
              "in": "query",
              "required": false,
              "type": "string"
            },
          ],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "object",
                "properties": {
                  "request": {
                    "$ref": "#/definitions/Event"
                  },
                  "id": {
                    "type": "text",
                  },
                  "text": {
                    "type": "string",
                  }
                }
              }
            }
          }
        }
      },
      "/notifications/count": {
        "get": {
          "summary": "Получить количество всех уведомлений",
          "tags": ["Notification"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "object",
                "properties": {
                  "all": {
                    "type": "number",
                  },
                  "requests": {
                    "type": "number",
                  },
                  "messags": {
                    "type": "number",
                  },
                  "events": {
                    "type": "number",
                  },
                }
              }
            }
          }
        }
      },
      "/notifications/read/request/{id}": {
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "get": {
          "summary": "Прочитать уведомление",
          "tags": ["Notification"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                  },
                }
              }
            }
          }
        }
      },
      "/notifications/read/event/{id}": {
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "get": {
          "summary": "Прочитать уведомление",
          "tags": ["Notification"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                  },
                }
              }
            }
          }
        }
      },
      "/notifications/read/message/{id}": {
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "get": {
          "summary": "Прочитать уведомление",
          "tags": ["Notification"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                  },
                }
              }
            }
          }
        }
      },
      "/messages": {
        "get": {
          "summary": "Получить сообщения",
          "tags": ["Messages"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/Message"
                }
              }
            }
          }
        },
        "post": {
          "summary": "Написать сообщение",
          "tags": ["Messages"],
          "parameters": [
            {
              "name": "to",
              "in": "query",
              "required": true,
              "type": "string"
            },
            {
              "name": "text",
              "in": "query",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/Message"
              }
            }
          }
        },
      },
      "/messages/publish": {
        "post": {
          "summary": "Написать сообщение",
          "tags": ["Messages"],
          "parameters": [
            {
              "name": "from",
              "in": "query",
              "required": true,
              "type": "string"
            },
            {
              "name": "to",
              "in": "query",
              "required": true,
              "type": "string"
            },
            {
              "name": "text",
              "in": "query",
              "required": true,
              "type": "string"
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/Message"
              }
            }
          }
        },
      },
    },
    "definitions": {
      "Profile":{
        type:"object",
        "properties":{
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "avatar": {
            "type": "string"
          },
          "language": {
            "type": "string"
          },
          "lastMessage": {
            "type": "string"
          },
          "isOnline": {
            "type": "boolean"
          }
        }
      },
      "Message":{
        type:"object",
        "properties":{
          "id": {
            "type": "string"
          },
          "from": {
            "$ref": "#/definitions/Profile"
          },
          "to": {
            "$ref": "#/definitions/Profile"
          },
          "text": {
            "type": "string"
          },
        }
      },
      "ProfileExtend": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "lat": {
            "type": "number"
          },
          "lng": {
            "type": "number"
          },
          "language": {
            "type": "string"
          },
          "avatar": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "nativeLanguage": {
            "type": "string"
          },
          "learningLanguages": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "bdate": {
            "type": "string",
            "format": "date"
          },
          "city": {
            "type": "string"
          },
          "pubNub": {
            "type": "string"
          },
          "socialNetworkType": {
            "type": "string"
          },
          "linkToSocialNetwork": {
            "type": "string"
          },
          "futureEvents":{
            type: "array",
            items: {
              "$ref": "#/definitions/Event"
            }
          }
        }
      },
      "Coordinates": {
        "type": "object",
        "properties": {
          "lat": {
            "type": "number"
          },
          "lng": {
            "type": "number"
          }
        }
      },
      "EmailReport": {
        "type": "object",
        "properties": {
          "accepted": {
            "type": "string"
          },
          "rejected": {
            "type": "array",
            "items":{
              "type":"string",
            },
          },
          "response": {
            "type":"string",
          },
          "envelop": {
            "type": "object",
            "properties": {
              "from": {
                "type": "string",
              },
              "to": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              },
            }
          },
          "messageId": {
            "type": "string",
          },
        }
      },
      "AbuserUser": {
        "type": "object",
        "properties": {
          "profile": {
            "$ref": "#/definitions/ProfileExtend"
          },
          "text": {
            "type": "string",
          },
          "response": {
            "type":"string",
          },
        }
      },
      "Request": {
        "type": "object",
        "properties": {
          "from": {
            "type": "string"
          },
          "to": {
            "type": "string"
          },
          "place": {
            "type": "string"
          },
          "help": {
            "type": "string"
          },
          "startDate": {
            "type": "string"
          }
        }
      },
      "Error": {
        "type": "object",
        "properties": {
          "code": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          },
          "fields": {
            "type": "string"
          }
        }
      },
      "Event": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "id event"
          },
          "language": {
            "type": "integer",
            "format": "int32",
            "description": "language code"
          },
          "title": {
            "type": "string",
            "description": "event title"
          },
          "description": {
            "type": "string",
            "description": "event description"
          },
          "owner": {
            "type": "string",
            "description": "owner profile id"
          },
          "startDate": {
            "type": "string",
            "format": "date-time",
            "description": "YYYY-MM-DDTHH:mm:ss.sssZ"
          },
          "wantVisit": {
            "type": "boolean",
            "description": "default value false"
          }
        }
      },
      "Participant": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "jay's id"
          },
          "name": {
            "type": "string",
            "description": "place name"
          },
          "language": {
            "type": "string",
            "description": "jay`s language"
          },
          "avatar": {
            "type": "string",
            "description": "link to jay's avatar"
          }
        }
      },
      "Place": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "id event"
          },
          "photo": {
            "type": "string",
            "format": "byte"
          },
          "name": {
            "type": "string",
            "description": "place name"
          },
          "address": {
            "type": "string",
            "description": "place address"
          },
          "lat": {
            "type": "number",
            "format": "double",
            "description": "latitude"
          },
          "lng": {
            "type": "number",
            "format": "double",
            "description": "latitude"
          },
          // "price": {
          //   "type": "integer",
          //   "format": "int32",
          //   "description": "стоимость??"
          // }
        }
      },
      "Device": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": ""
          },
          "type": {
            "type": "string",
            "description": ""
          },
          "token": {
            "type": "string",
            "description": ""
          },
        }
      },
    }
  }, params)
}
