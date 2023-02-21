<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://twitter.com/alex_wite" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Chat Room REST API application

A generic chat room API made following DDD and SOLID principles.

The entire application is contained within the `main.ts` file.

`local.sh` runs several commands to execute the application in Docker, and also run tests and execute the shell console:

    sh local.sh [option]

`docker-compose-local.yml` contains the configuration for launching docker instances through `deploy/local/Dockerfile` 

Using Postgres database and configured in `ormconfig.json`

## Install and run the app
    
    # To perform an start within a build
    sh local.sh build

    sh local.sh start

## Run the tests

    sh local.sh test

    sh local.sh coverage

# REST API

PENDING IMPROVEMENTS:

- Command Bus pattern to match commands with handlers: the current app works connecting directly with controllers
- Event sourcing pattern: event dispatchers are commented with TODO where they should be working
- Authentication: next step would be to add authentication and don't allow to interact with the endpoints unless the user is authenticated
- Authorization: here, we could have 2 roles: ADMIN and USER.
  - ADMIN for creating Rooms and Users.
  - USER for add theirshelves to a chat room, or to send a message to a room.
- Fix many to many issue, as currently is not possible to save related user and room at endpoint `/POST /room/:roomId/user/:userId`

# Endpoints
## Create a Room

### Request

`POST /room/`

    curl -i -H 'Accept: application/json' -d 'name=Room 1' http://localhost:3000/room

### Response

    HTTP/1.1 201 Created
    Date: Thu, 23 Feb 2023 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Content-Length: X

    []

## Stay in touch

- Author - [Alex Villapalos](https://villapalos.com)
- Twitter - [@alex_wite](https://twitter.com/alex_wite)
