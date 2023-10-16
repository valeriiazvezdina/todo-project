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

/* swagger configuration */
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Users API',
            description: 'Users information and manipulation',
            contact: {
                name: 'Valeriia Zvezdina'
            },
            servers: [`http://localhost:${PORT}`]
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    name: 'Authorization'
                }
            }
        },
    },
    apis: ['index.js', 'src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* parcing request body */
app.use(express.json());

app.use('/api', routes);

/* Sentry handling errors */
app.use(Sentry.Handlers.errorHandler());

/* listening server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});