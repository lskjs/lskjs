// import api from 'lego-starter-kit/api/api.client'
// export default api
/* eslint-disable */
export default function getDocs(ctx, params) {
  return {
    "paths": {
      "/user/list": {
        "get": {
          "summary": "Получить список пользователей",
          "tags": ["User"],
          "responses": {
            "200": {
              "description": "",
              "schema": {
                "$ref": "#/definitions/UserExtend"
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
                "$ref": "#/definitions/UserExtend"
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
                "$ref": "#/definitions/UserExtend"
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
                "$ref": "#/definitions/UserExtend"
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
                "$ref": "#/definitions/User"
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
                  "$ref": "#/definitions/User"
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
          "summary": "Получить список \"My Friends\"",
          "description": "Получить список \"My Friends\"\n",
          "tags": ["user"],
          "responses": {
            "200": {
              "description": "Координаты",
              "schema": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/User"
                }
              }
            }
          }
        }
      },
    },
    "definitions": {
      "User":{
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
        }
      },
      "Message":{
        type:"object",
        "properties":{
          "id": {
            "type": "string"
          },
          "from": {
            "$ref": "#/definitions/User"
          },
          "to": {
            "$ref": "#/definitions/User"
          },
          "text": {
            "type": "string"
          },
        }
      },
      "UserExtend": {
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

    }
  }
}
