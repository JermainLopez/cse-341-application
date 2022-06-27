const database = require('../db/connectDb.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = database.url;

db.recipe = require('./recipe.js')(mongoose);
db.author = require('./author.js')(mongoose);

module.exports = db;