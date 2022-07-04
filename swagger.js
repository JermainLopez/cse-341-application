const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Recipes API',
        description: 'Recipes API with Swagger by Jermain Lopez'
    },
    host: 'dashboard.heroku.com/apps/cse341-recipe-book-whith-autho',
    schemes: ['https']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);