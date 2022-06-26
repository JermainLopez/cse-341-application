/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb')


let _db;

//Connect our mongodb
const initDb = (callback) => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    //Use our variable MONGODB_URI fron .env file
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

//Send our client
const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

//Exports both function to use in another file
module.exports = {
    initDb,
    getDb,
    URL: process.env.MONGODB_URI,
};