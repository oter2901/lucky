<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

NestJs framework implementation of a simple api.

## Environment

```bash
$ cp env.example .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# dockerized version
$ docker-compose build && $ docker-compose up

# database migrations
# After the service is running you can run the migrations to seed the database
$ npm run typeorm:run
```

## Documentation
When the server is running you will have access to http://localhost:3000/api where you can find a swagger documentation with every available endpoint and how to test them
