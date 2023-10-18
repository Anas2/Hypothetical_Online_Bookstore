const express = require('express');
const { PORT, MONGODB_CONNECTION_STRING } = require('./config/configuration');
const BookRouter = require('./Routes/bookRouter');
const errorHandler = require('./Middleware/errorHandler');
const cors = require("cors");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const corsOptions = {
    // credentials: true,
    origin: ['http://localhost:3000'],

}

const app = express();

const mongoose = require('mongoose');

app.use(express.json({ limit: '50mb' }));
app.use(cors(corsOptions));


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Hypothetical Online Bookstore",
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ]
    },
    apis: ['./Routes/bookRouter.js']
}

const swaggerSpec = swaggerJSDoc(options);

app.use('/api/books', BookRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(errorHandler);

mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT} & db connected sucssesfully `);

    });
})
