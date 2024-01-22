<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  ## Description

  In this application, the user can register their data, such as name, CPF and date of birth. To do this, some rules must be followed, such as: The CPF number must be a valid number, have the correct size (11 digits), have only numbers and not be    registered in the system.

  

  ## Technologies 💻:

<div>
  <img src="https://img.shields.io/badge/node js%20-%2320232a.svg?&style=for-the-badge&color=339933&logo=node.js&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/Express%20-%2320232a.svg?&style=for-the-badge&color=000000&logo=Express&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/TypeScript%20-%2320232a.svg?&style=for-the-badge&color=3178C6&logo=TypeScript&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/Prisma%20-%2320232a.svg?&style=for-the-badge&color=4C51BF&logo=Prisma&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/jest%20-%2320232a.svg?&style=for-the-badge&color=C21325&logo=jest&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL%20-%2320232a.svg?&style=for-the-badge&color=4169E1&logo=PostgreSQL&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
</div>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## To run with Docker:

```bash
  docker compose up
```

## Routes guide:

### You can test this using ThunderClient or another method you prefer.

### All routes are to /users, changing only their methods (post and get).

```
  1. POST => localhost:3000/users (3000 is a default port)
      send: name (string), cpf (string) and birthday (string)
      you receive a object with your's informations and a status code 201 (created)

  2. GET => localhost:3000/users
      the system sends you all users

  3. GET => localhost:3000/users?page=1&limit1 (you can change the page and limit)
      the system sends users based on your "page" and "limit" parameters using pagination

  4. GET => localhost:3000/users/cpf
      the system returns the user with the CPF specified in the parameter
```




### Feel free to contact me 😄:

<div align="left">
  
  [![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:wiliancosta52@gmail.com)
  [![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/williamcosta52/)
</div>
