const mongodb = require('../db/connect');
const db = require('../models');
const ObjectId = require('mongodb').ObjectId;
const { Autror } = db.author;
const passwordUtil = require('../utils/checkpassword');

const createAuthor = async(req, res) => {
    try {
        const username = req.params.username;
        const password = req.body.password;
        const passwordCheck = passwordUtil.passwordPass(password);
        if (!username || !password) {
            res.status(400).send({ message: 'Invalid data' });
            return;
        }
        if (passwordCheck.error) {
            res.status(400).send({ message: passwordCheck.error });
            return;
        }
        const author = new Autror(req.body);
        const result = await author.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json(err || 'Could not create an author');
    }
}

const getAllAuthors = async(req, res) => {
    try {
        // #swagger.description = 'Display all the Recipes in the database';
        const result = await mongodb.getDb().db().collection('authors').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const getSingleAuthor = async(req, res) => {
    try {
        const username = req.params.username;
        Autror.findOne({ username: username }, (err, author) => {
            if (err) {
                res.status(500).json(err || 'Author not found');
            } else {
                res.status(200).json(author);
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateAuthor = async(req, res) => {
    try {
        const username = req.params.username;
        const password = req.body.password;
        const passwordCheck = passwordUtil.passwordPass(password);
        if (!username || !password) {
            res.status(400).send({ message: 'Invalid data' });
            return;
        }
        if (passwordCheck.error) {
            res.status(400).send({ message: passwordCheck.error });
            return;
        }
        Autror.findOne({ username: username }, (err, author) => {
            author.username = req.body.username;
            author.name = req.body.name;
            author.email = req.body.email;
            author.password = req.body.password;
            author.phone = req.body.phone;
            author.address = req.body.address;
            author.city = req.body.city;
            author.state = req.body.state;
            author.eperience = req.body.eperience;

            author.save((err, result) => {
                if (err) {
                    res.status(500).json(err || 'The contact could not be updated, an error occurred while updating.');
                } else {
                    res.status(200).json(result);
                }
            });
        });
    } catch (err) {
        res.status(500).json(err || 'The contact could not be updated, an error occurred while updating.');
    }
}

module.exports = { getAllAuthors, getSingleAuthor, updateAuthor, createAuthor };