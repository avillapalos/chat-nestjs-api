# Chat Room REST API application

A generic chat room API made following DDD and SOLID principles.

The entire application is contained within the `main.ts` file.

`local.sh` runs several commands to execute the application in Docker, and also run tests and execute the shell console:

    sh local.sh [option]

`docker-compose-local.yml` contains the configuration for launching docker instances through `deploy/local/Dockerfile` 

Using Postgres database and configured in `ormconfig.json`

## Project Structure

Project is divided in several contexts:
- **app**
- **core**: shared code
- **health**: simple health check service
- **room**: contains everything related with a Chat Room
  - **user**: contains logic for adding a User to a Chat Room
- **user**: contains everything related with a User
- **message**: contains everything related with a Chat Message
- **test**: contains e2e tests (others are stored close to their equivalent implementation, I suppose this is a good practice working with Nest)

## Dependency Injection

For keeping infrastructure out of domain/application, every dependency is injected in context modules (*.module.ts) which belongs to infra

## Install and run the app
    
    # To perform a start within a build
    sh local.sh build

    sh local.sh start

**WARNING**: Node and postres containers don't connect well in Mac, due to the following issue:



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
- Add pagination to GET List Messages endpoint, and also Criteria pattern for filtering

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

    Adding room id in response to have a quick reference to perform other requests:
    {
      "id": "7e6e9e90-ae35-4274-8613-3e9167eeae65"
    }

## Create a User

### Request

`POST /user/`

    curl -i -H 'Accept: application/json' -d 'name=User 1' http://localhost:3000/user

### Response

    HTTP/1.1 201 Created
    Date: Thu, 23 Feb 2023 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Content-Length: X

    Adding user id in response to have a quick reference to perform other requests:
    {
      "id": "7e6e9e90-ae35-4274-8613-3e9167eeae65"
    }

## Add a User to a Chat Room

Note: due to an issue this endpoint doesn't persist data to database

### Request

`POST /room/:roomId/user/:userId`

    curl -i -H 'Accept: application/json' http://localhost:3000/room/:roomId/user/:userId

### Response

    HTTP/1.1 201 Created
    Date: Thu, 23 Feb 2023 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Content-Length: X

## Send a Message to a Chat Room

### Request

`POST /room/:roomId/message`

    curl -i -H 'Accept: application/json' -d 'text=Message example' -d 'userId=:userId' http://localhost:3000/room/:roomId/message

### Response

    HTTP/1.1 201 Created
    Date: Thu, 23 Feb 2023 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Content-Length: X

    Adding message id in response to have a quick reference to perform other requests:
    {
      "id": "7e6e9e90-ae35-4274-8613-3e9167eeae65"
    }


## Get most recent Messages List from a Chat Room

### Request

Default limit is 10

`GET /room/:roomId/message`

    curl -i http://localhost:3000/room/:roomId/message?limit=2

### Response

    HTTP/1.1 201 Created
    Date: Thu, 23 Feb 2023 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Content-Length: X

    [
      {
          "id": "681e84a5-431a-4daf-b156-274d4c9b74b4",
          "text": "Message example",
          "created": "2023-02-21T09:31:40.090Z",
          "user_id": "30bb752f-f513-43cb-86d0-9ec9239fcc23",
          "room_id": "51b09adb-7289-477c-a654-46a946da51a8"
      },
      {
          "id": "10dba169-8050-4d6b-93ea-adebabbc3573",
          "text": "Message example,userId=30bb752f-f513-43cb-86d0-9ec9239fcc23",
          "created": "2023-02-21T09:29:38.957Z",
          "user_id": "30bb752f-f513-43cb-86d0-9ec9239fcc23",
          "room_id": "51b09adb-7289-477c-a654-46a946da51a8"
      }
    ]

## Stay in touch

- Author - [Alex Villapalos](https://villapalos.com)
- Twitter - [@alex_wite](https://twitter.com/alex_wite)
