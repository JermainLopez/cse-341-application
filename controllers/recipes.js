const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
//Function get all the database from mongodb and acces the colection in db
const getAll = async(req, res) => {
    try {
        // #swagger.description = 'Display all the Recipes in the database';
        const result = await mongodb.getDb().db().collection('recipes').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//Get a single library fron db in mongodb
const getSingle = async(req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db()
            .collection('recipes')
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
};
//Crate a new recipe in db in mongodb
const createNewRecipe = async(req, res) => {
        try {
            const newRecipe = {
                name: req.body.name,
                difficulty: req.body.difficulty,
                duration: req.body.duration,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                notes: req.body.notes,
                tags: req.body.tags
            };
            const result = await mongodb.getDb().db().collection('recipes').insertOne(newRecipe);
            if (result.acknowledged) {
                res.status(201).json({ message: 'Recipe created successfully' });
            } else {
                res.status(500).json({ message: 'Error creating recipe' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    //Update a recipe in db in mongodb
const updateRecipeInDatabase = async(req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        if (!userId) {
            res.status(400).send({ message: 'Invalid recipe Id' });
            return;
        }
        const newRecipe = {
            name: req.body.name,
            difficulty: req.body.difficulty,
            duration: req.body.duration,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            notes: req.body.notes,
            tags: req.body.tags
        };
        const result = await mongodb.getDb().db().collection('recipes').updateOne({ _id: userId }, { $set: newRecipe });
        if (result.acknowledged) {
            res.status(200).json({ message: 'Recipe updated successfully' });
        } else {
            res.status(500).json({ message: 'Error updating recipe' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Delete a Recipe in db in mongodb
const deleteRecipeFromDatabase = async(req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        if (!userId) {
            res.status(400).send({ message: 'Invalid recipe Id' });
            return;
        }
        const result = await mongodb
            .getDb()
            .db()
            .collection('recipes')
            .deleteOne({ _id: userId });
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Somethin cause a problem with delete Recipe');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getIngredients = async(req, res) => {
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection('recipes')
            .findAll({ ingredients: { $exists: true } });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/*
//update ingredients in db in mongodb
const updateIngredientsInDatabase = async(req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const newIngredients = {
            ingredients: req.body.ingredients
        };
        const result = await mongodb.getDb().db().collection('recipes').updateOne({ _id: userId }, { $set: newIngredients });
        if (result.acknowledged) {
            res.status(200).json({ message: 'Ingredients updated successfully' });
        } else {
            res.status(500).json({ message: 'Error updating ingredients' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
} */
//Export the function por use in another file
// eslint-disable-next-line no-undef
module.exports = { getAll, getSingle, createNewRecipe, updateRecipeInDatabase, deleteRecipeFromDatabase, getIngredients };