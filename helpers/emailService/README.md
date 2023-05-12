<div align="center">
  <h1>Email send - Microservices</h1>
</div>

# Content

- [Introduction](#introduction)
- [Local deploy](#local-deploy)
  - [Prerequisites](#prerequisites)
  - [Install dependencies](#install-dependencies)
  - [Run service](#run-service)
  - [Test and coverage](#test-and-coverage)
- [End Points](#end-points)
  - [Send email service](#send-email-service-post)

# Introduction

This service sends a verification email to the email entered, generates a token from this <a href="http://gitlabdevqa.ionix.aws/zeleri/create-token-from-email/-/tree/master">microservice</a>, sending it in the message as a button and link.

# Local deploy

## Prerequisites

For this project it's necessary to get installed NodeJS, for this visit [https://nodejs.org/es/](https://nodejs.org/es/)

## Install dependencies

To deploy this project in a development enviroment in your local machine first you must install the dependencies.

```shell
yarn
```

## Run service

After the dependencies are installed, you can run the service.

```shell
$ yarn dev
```

## Test and coverage

It's very important to create tests for all the code that we develop, and that it covers at least 80% of the development. To execute the tests carried out in the project, we execute the command

```shell
$ yarn test
```

# End Point

## Send email service [POST]

```shell
/api/email
```

```shell
Body Params
```

```javascript
{
    "recipients": ["test@test.com", "test@test.com"], // or only "test@test.com"
    "email_sender":"soporte@zeleri.com",
    "subject": "test",
    "body": "index.html" // accept html
}
```

### Validation errors

```shell
Response (400) -> errors
```

```javascript
{
    "value": {
        "email_sender": "soporte@zeleri.com",
        "subject": "eso",
        "body": "index.html"
    },
    "path": "recipients",
    "type": "required",
    "errors": [
        "recipients is a required field"
    ],
    "params": {
        "path": "recipients"
    },
    "inner": [],
    "name": "ValidationError",
    "message": "recipients is a required field"
}
```

### Internal server error

```shell
Response (500) -> Internal server error
```

```javascript
{
  error: 'Ocurrio un error al enviar el email, intente nuevamente'
}
```