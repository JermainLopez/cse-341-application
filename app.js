const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const port = process.env.PORT || 8080;
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        app.get('/', require('./routes/index2.js'));
        next();
    })
    .use('/', require('./routes'));
//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 
app.use('/graphql', graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph 
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql: true
}));





mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        const db = require('./models');
        db.mongoose
            .connect(db.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,

            })
            .then(() => {
                app.listen(port, () => {
                    console.log(`DB Connected and server running on ${port}.`);
                });
            })
            .catch((err) => {
                console.log('Cannot connect to the database!', err);
                process.exit();
            });
    }
});