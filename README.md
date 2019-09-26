# Web3-2019-1 - API

## Installation

To start developping, first run `npm install` into the project folder. This will donwload all the dependencies.

Copy the `.env.example` file to `.env` at the project folder root and change the values to your needs.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the API in the development mode.<br>
Use a REST client like "insomnia" or "Postman" on the URL [http://localhost:8080](http://localhost:8080) to consume the API.

## Deployment

The `.env` file is only read in development mode. When deployed, all the environment variables must be set into the deployment environment. This may be done into the platform settings (Heroku...) or with your project runner (pm2...) or any other manner to give the needed environment variables.