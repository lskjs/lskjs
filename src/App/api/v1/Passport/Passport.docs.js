
export default (ctx, parent) => {
  const { Profile } = ctx.models
  // User.schema.paths
  //console.log( Profile.schema.paths);
  return {
    "/user": {
        "get": {
            "summary": "Получить список пользователей",
            "tags": [
                "user"
            ],
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
        },
        "post": {
            "summary": "Создать пользователя",
            "description": "Создать пользователя\n",
            "tags": [
                "user"
            ],
            parameters: Profile.schema.paths,
            "parameters2": [
                {
                    "name": "username",
                    "in": "query",
                    "type": "string",
                    "description": "username",
                    "required": true
                },
                {
                    "name": "firstName",
                    "in": "query",
                    "type": "string",
                    "description": "Имя",
                    "required": true
                },
                {
                    "name": "lastName",
                    "in": "query",
                    "type": "string",
                    "description": "Фамилия",
                    "required": true
                },
                {
                    "name": "email",
                    "in": "query",
                    "type": "string",
                    "description": "Email",
                    "required": true
                },
                {
                    "name": "gender",
                    "in": "query",
                    "type": "string",
                    "description": "Пол",
                    "required": true,
                    "enum": [
                        "male",
                        "female"
                    ]
                },
                {
                    "name": "about",
                    "in": "query",
                    "type": "string",
                    "description": "описание пользователя",
                    "required": false
                },
                {
                    "name": "rating",
                    "in": "query",
                    "type": "number",
                    "description": "рейтинг",
                    "required": false
                }
            ],
            "responses": {
                "200": {
                    "description": "Созданный пользователь",
                    "schema": {
                        "$ref": "#/definitions/User"
                    }
                }
            }
        }
    },
    "/user/{id}": {
        "parameters": [
            {
                "name": "id",
                "in": "path",
                "type": "string",
                "description": "ID пользователя",
                "required": true
            }
        ],
        "get": {
            "summary": "user api",
            "description": "Позволяет найти пользователя по ID\n",
            "tags": [
                "user"
            ],
            "responses": {
                "200": {
                    "description": "USER",
                    "schema": {
                        "$ref": "#/definitions/User"
                    }
                }
            }
        },
        "put": {
            "summary": "Изменить пользователя",
            "description": "Изменить пользователя\n",
            "tags": [
                "user"
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "query",
                    "type": "string",
                    "description": "username",
                    "required": true
                },
                {
                    "name": "username",
                    "in": "query",
                    "type": "string",
                    "description": "username",
                    "required": false
                },
                {
                    "name": "firstName",
                    "in": "query",
                    "type": "string",
                    "description": "Имя",
                    "required": false
                },
                {
                    "name": "lastName",
                    "in": "query",
                    "type": "string",
                    "description": "Фамилия",
                    "required": false
                },
                {
                    "name": "email",
                    "in": "query",
                    "type": "string",
                    "description": "Email",
                    "required": false
                },
                {
                    "name": "gender",
                    "in": "query",
                    "type": "string",
                    "description": "Пол",
                    "required": false,
                    "enum": [
                        "male",
                        "female"
                    ]
                },
                {
                    "name": "about",
                    "in": "query",
                    "type": "string",
                    "description": "описание пользователя",
                    "required": false
                },
                {
                    "name": "rating",
                    "in": "query",
                    "type": "number",
                    "description": "рейтинг",
                    "required": false
                }
            ],
            "responses": {
                "200": {
                    "description": "Созданный пользователь",
                    "schema": {
                        "$ref": "#/definitions/User"
                    }
                },
                "default": {
                    "description": "Unexpected error",
                    "schema": {
                        "$ref": "#/definitions/Error"
                    }
                }
            }
        }
    },

  }
}
