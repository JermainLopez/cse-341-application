const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Welcome to recipe book aplication')
})

module.exports = routes;