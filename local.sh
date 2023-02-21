#!/bin/bash

help()
{
   echo ""
   echo "----- CHAT LOCAL SERVER SCRIPTS -----"
   echo "Usage: $0 <option>"
   echo "Example: $0 start"
   echo "Options:"
   echo -e " - build : Starts the server as daemon building it before"
   echo -e " - start : Starts the server as daemon"
   echo -e " - stop : Stops the server"
   echo -e " - restart : Stops and starts server"
   echo -e " - test : Runs the tests"
   echo -e " - coverage : Runs the tests with coverage"
   echo -e " - shell : Runs an interactive shell on the container"
   echo "-------------------------------------"
   echo ""
   exit 1 # Exit script after printing help
}

build()
{
  docker-compose -f docker-compose-local.yml up --build --detach --renew-anon-volumes dev
}

start()
{
  docker-compose -f docker-compose-local.yml up --detach dev
}

stop()
{
  docker-compose -f docker-compose-local.yml down --volumes
}

restart()
{
  stop
  start
}

test()
{
  start
  docker exec -it chat_nestjs_api_dev /bin/sh -c "npm run test"
}

coverage()
{
  start
  docker exec -it chat_nestjs_api_dev /bin/sh -c "npm test -- --coverage"
}

shell()
{
  start
  docker exec -it chat_nestjs_api_dev /bin/sh
}

case "$1" in
  build ) build ;;
  start ) start ;;
  stop ) stop ;;
  restart ) restart ;;
  test ) test ;;
  coverage ) coverage ;;
  shell ) shell ;;
  * ) help ;; # Print helpFunction in case parameter is non-existent
esac
