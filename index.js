const express = require('express');
const app = express();
const Sentry = require("@sentry/node");
const routes = require('./src/routes/index');

/* dotenv to access env variables */
require('dotenv').config();

/* environment variables */
const PORT = +process.env.PORT;
const DSN = process.env.DSN;

/* Sentry initialization */
app.use(Sentry.Handlers.requestHandler()); 
Sentry.init({dsn: `${DSN}`});

/* parcing request body */
app.use(express.json());

app.use('/api', routes);

/* Sentry handling errors */
app.use(Sentry.Handlers.errorHandler());

/* listening server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});