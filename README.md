# Backend ToDo project

## Description

The project includes the backend for ToDo project. There are several branches with different types of storing the data, for instance, storing in files, MongoDb, PostgresSQL. (GraphQL is in progress). For safety and  security are used JWT and express-validator. Sentry is integrated for monitoring the errors. In order to provide an easier experience with HTTP requests the Swagger documentaion is integrated.

## Installation

First of all, clone the repo to your local computer:

```
git clone git@github.com:valeriiazvezdina/chat-app-mern.git
```
Don't forget to install all dependencies:
```
npm install
```

## Running app

1. It is necessary to configure `.env` file using `.env.example` file.

2. To start the app run:

```
npm start
```
4. Now you can go to `http://localhost:YOUR_PORT_FROM_ENV_FILE/api-docs` and enjoy the app with comfortable Swagger docs.

## Deployment
The application is deployed in Render.com on the link <https://todo-project-416f.onrender.com>.
