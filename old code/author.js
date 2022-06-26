const db = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { schemaAuthor } = require('../models/author');
const passwordUtil = require('../utils/checkpassword');

//get all Authors
const getAllAuthors = async(req, res) => {
    try {
        // #swagger.description = 'Display all the Recipes in the database';
        const result = await db.getDb().db().collection('authors').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//Get single Author by id
const getSingleAuthor = async(req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await db
            .getDb()
            .db()
            .collection('authors')
            .find({ _id: userId });
        if (!result) {
            const error = new Error('Recipe not found');
            throw error;
        }
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Update Author
const updateAuthor = async(req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const newRecipe = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            eperience: req.body.eperience
        };
        const result = await db.getDb().db().collection('authors').updateOne({ _id: userId }, { $set: newRecipe });
        if (result.acknowledged) {
            res.status(200).json({ message: 'Author updated successfully' });
        } else {
            res.status(500).json({ message: 'Error updating recipe' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//Create Author
const createAuthor = async(req, res) => {
    try {
        const newAuthor = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            eperience: req.body.eperience
        };
        const result = await db.getDb().db().collection('authors').insertOne(newAuthor);
        if (result.acknowledged) {
            res.status(200).json({ message: 'Author created successfully' });
        } else {
            res.status(500).json({ message: 'Error creating recipe' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
/* const createUser = async(req, res) => {
    try {
        const newUser = {

            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            eperience: req.body.eperience
        };
        const result = await mongodb.getDb().db().collection('users').insertOne(newUser);
        if (result.acknowledged) {
            res.status(201).json({ message: 'User created successfully' });
        } else {
            res.status(500).json({ message: 'Error creating user' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; */



module.exports = { getAllAuthors, getSingleAuthor, updateAuthor, createAuthor };