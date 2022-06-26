const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Recipes API',
        description: 'Recipes API with Swagger by Jermain Lopez'
    },
    host: 'localhost:8080',
    schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);