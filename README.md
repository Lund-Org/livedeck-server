# 🌉 Livedeck Server

[![Build Status](https://travis-ci.com/Lund-Org/livedeck-server.svg?branch=master)](https://travis-ci.com/Lund-Org/livedeck-server)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3aca2987a1354a0a3c3d/test_coverage)](https://codeclimate.com/github/Lund-Org/livedeck-server/test_coverage)

Livedeck server is the bridge between the smartphone webapp and the software.
It manages the data and the communication.

## :electric_plug: Installation

```bash
git clone git@github.com:Lund-Org/livedeck-server.git
cd livedeck-server
npm i --production
```

## :wrench: Usage

You need to set the following environment variables :

|Variable name|Description|
| ------------ | ------------ |
|APP_JWT_SIGN_KEY|The hash to sign the JWT tokens|
|APP_WEBSOCKET_PORT|The port to communicate with the websocket|

<br />
<br />

To add env var, use [Docker](https://github.com/Lund-Org/livedeck-server/tree/master/etc/docker/docker-compose.yml), set in your own environment using `export` (on Bash), or put it in front of the next command like this : `ENV_VAR=value <cmd>`


```bash
node ./src/index.js
```


## :telephone_receiver: Communication

#### :inbox_tray: Websocket event received by the server

|Event name|Data|Emit by|Need Authentication|Description|
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
|authentify|`{ token: <string>, device: <front|software> }`|WebApp|No|Allows an user to authentify its socket and to get access to the rest of the websocket calls|
|trigger-binding|`{ id: <number> }`|WebApp|Yes|Tell to the server that a binding has been triggered to send it to the software. ID is the id of the binding triggered.|

---

#### :outbox_tray: Websocket event sent by the server

|Event name|Data|Target|Need Authentication|Description|
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
|create-category|`{ category: <Category> }`|WebApp|Yes|Tell to the webapp that a new category has been created|
|update-category|`{ category: <Category> }`|WebApp|Yes|Tell to the webapp that a category has been updated|
|delete-category|`{ category: <Category> }`|WebApp|Yes|Tell to the webapp that a category has been deleted|
|create-binding|`{ binding: <Binding> }`|WebApp|Yes|Tell to the webapp that a new binding has been created|
|update-binding|`{ binding: <Binding> }`|WebApp|Yes|Tell to the webapp that a binding has been updated|
|delete-binding|`{ binding: <Binding> }`|WebApp|Yes|Tell to the webapp that a binding has been deleted|
|binding-triggered|`{ bindingId: <number> }`|Software|Yes|Tell to the software that a binding has been triggered|
|authentication-ok||Both|Yes|Tell if the event `authentify` is a success|
|authentication-ko||Both|Yes|Tell if the event `authentify` is a success|
|trigger-binding-ok||Webapp|True|Tell if the event `trigger-binding` is a success|
|trigger-binding-ko||Webapp|True|Tell if the event `trigger-binding` is a failure|

---

### :memo: API

#### :key: Authentication

##### API Resources :
- [POST /register](#post-register)
- [POST /login](#post-login)
- [POST /valid-token](#post-valid-token)

---

##### POST /register

Example: http://localhost:4000/register

Request body :

    {
      "username": "MyUsername",
      "password": "MyPassword"
    }

Response body:

    {
      "id": <number>,
      "username": <string>,
      "key": <string>,
      "created_at": <Datetime string>,
      "updated_at": <Datetime string>
    }

##### POST /login

Example: http://localhost:4000/login

Request body :

    {
      "username": <string>,
      "password": <string>
    }

Response body:

    {
      "id": <number>,
      "username": <string>,
      "key": <string>,
      "token": <string>
      "created_at": <Datetime string>,
      "updated_at": <Datetime string>,
    }

##### POST /valid-token

Example: http://localhost:4000/valid-token

Request body :

    {
      "jwtToken": <string>
    }

Response body:

    {
      "user": {
        "id": <number>,
        "username": <string>,
        "key": <string>,
        "created_at": <Datetime string>,
        "updated_at": <Datetime string>
      }
    }

---

#### :open_file_folder: Categories

##### API Resources :
- [GET /categories/](#get-categories)
- [GET /categories/:id](#get-categoriesid)
- [POST /categories/](#post-categories)
- [PATCH /categories/:id](#patch-categoriesid)
- [DELETE /categories/:id](#delete-categoriesid)
- [POST /categories/:id/bindings/:bindingId](#post-categoriesidbindingsbindingid)
- [DELETE /categories/:id/bindings/:bindingId](#delete-categoriesidbindingsbindingid)

---

##### GET /categories/

Example: http://localhost:4000/categories/

Response body:

    [
      {
        "id": <number>,
        "name": <string>,
        "color": <string>,
        "weight": <number>,
        "created_at": <Datetime string>,
        "updated_at": <Datetime string>
      },
      ...
    ]

##### GET /categories/:id/

Example: http://localhost:4000/categories/:id/

Response body:

    {
      "id": <number>,
      "name": <string>,
      "color": <string>,
      "weight": <number>,
      "created_at": <Datetime string>,
      "updated_at": <Datetime string>
      "bindings": [
        <Binding>,
        ...
      ]
    }

##### POST /categories/

Example: http://localhost:4000/categories/

Request body :

    {
      "name": <string>,
      "color": <string>,
      "weight": <number>
    }

Response body:

    {
      "id": <number>,
      "name": <string>,
      "color": <string>,
      "weight": <number>,
      "created_at": <Datetime string>,
      "updated_at": <Datetime string>
      "bindings": [
        <Binding>,
        ...
      ]
    }

##### PATCH /categories/:id/

Example: http://localhost:4000/categories/:id/

Request body :

    {
      "name": <?string>,
      "color": <?string>,
      "weight": <?number>
    }

Response body:

    {
      "id": <number>,
      "name": <string>,
      "color": <string>,
      "weight": <number>,
      "created_at": <Datetime string>,
      "updated_at": <Datetime string>
      "bindings": [
        <Binding>,
        ...
      ]
    }

##### DELETE /categories/:id/

Example: http://localhost:4000/categories/:id/

Response body:

    {
      "removed": {
        "id": <number>,
        "name": <string>,
        "color": <string>,
        "weight": <number>,
        "created_at": <Datetime string>,
        "updated_at": <Datetime string>
      }
    }

##### POST /categories/:id/bindings/:bindingId/

Example: http://localhost:4000/categories/:id/bindings/:bindingId/

Response body:

    {
      "id": <number>,
      "name": <string>,
      "color": <string>,
      "weight": <number>,
      "created_at": <Datetime string>,
      "updated_at": <Datetime string>
      "bindings": [
        <Binding>,
        ...
      ]
    }

##### DELETE /categories/:id/bindings/:bindingId/

Example: http://localhost:4000/categories/:id/bindings/:bindingId/

Response body:

    {
      "id": <number>,
      "name": <string>,
      "color": <string>,
      "weight": <number>,
      "created_at": <Datetime string>,
      "updated_at": <Datetime string>
      "bindings": [
        <Binding>,
        ...
      ]
    }

---

#### :loudspeaker:  Bindings

##### API Resources :
- [GET /bindings/](#get-bindings)
- [GET /bindings/:id](#get-bindingsid)
- [POST /bindings/](#post-bindings)
- [PATCH /bindings/:id](#patch-bindingsid)
- [DELETE /bindings/:id](#delete-bindingsid)

---

##### GET /bindings/

Example: http://localhost:4000/bindings/

Response body:

    [
      {
        "id": <number>,
        "name": <string>,
        "icon": <string>,
        "weight": <number>,
        "type": <string>,
        "configuration": <Object>,
        "created_at": <Datetime string>,
        "updated_at": <Datetime string>
      },
      ...
    ]

##### GET /bindings/:id/

Example: http://localhost:4000/bindings/:id/

Response body:

    {
      "id": <number>,
      "name": <string>,
      "icon": <string>,
      "weight": <number>,
      "type": <string>,
      "configuration": <Object>,
      "categories": [
        <Category>,
        ...
      ],
      "created_at": <Datetime string>,
      "updated_at": <Datetime string>
    }

##### POST /bindings/

Example: http://localhost:4000/bindings/

Request body :

    {
      "name": <string>,
      "icon": <string>,
      "weight": <number>,
      "type": <string>
    }

Response body:

    {
      "id": <number>,
      "name": <string>,
      "icon": <string>,
      "weight": <number>,
      "type": <string>,
      "configuration": <Object>,
      "categories": [],
      "created_at": <Datetime string>,
      "updated_at": <Datetime string>
    }

##### PATCH /bindings/:id/

Example: http://localhost:4000/bindings/:id/

Request body :

    {
      "name": <?string>,
      "icon": <?string>,
      "weight": <?number>
      "type": <?string>
      "configuration": <?JSON>
    }

Response body:

    {
      "id": <number>,
      "name": <string>,
      "icon": <string>,
      "weight": <number>,
      "type": <string>,
      "configuration": <Object>,
      "categories": [
        <Category>,
        ...
      ],
      "created_at": <Datetime string>,
      "updated_at": <Datetime string>
    }

##### DELETE /bindings/:id/

Example: http://localhost:4000/bindings/:id/

Response body:

    {
      "removed": {
        "id": <number>,
        "name": <string>,
        "icon": <string>,
        "weight": <number>,
        "type": <string>,
        "configuration": <Object>,
        "categories": [],
        "created_at": <Datetime string>,
        "updated_at": <Datetime string>
      }
    }




## :open_file_folder: Resources
- [Cherry](https://github.com/Lund-Org/cherry) : The framework used to build the http server
- [Cherry Pug connector](https://github.com/Lund-Org/cherry-pug-connector) : The plugin which uses [pug](https://pugjs.org/api/getting-started.html) as the view engine
- [Cherry Typeorm connector](https://github.com/Lund-Org/cherry-typeorm-connector) : The plugin which uses [typeorm](https://typeorm.io/) as the database-orm engine

## :pencil2: Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## :book: License
[MIT](https://github.com/Lund-Org/livedeck-server/blob/master/LICENSE)
