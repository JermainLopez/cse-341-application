const { empty } = require('@hapi/joi/lib/base');
const db = require('../models');
const ObjectId = require('mongodb').ObjectId;
const Recipe = db.recipe;
const passwordUtil = require('../utils/checkpassword');

//Get all recipes
const getallRecipes = async(req, res) => {
    try {
        Recipe.find({})
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving users.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
}

//Get a single recipe
const getSingleRecipe = async(req, res) => {
    try {
        const recipeId = new ObjectId(req.params.id);
        Recipe.findOne({ _id: recipeId }, (err, recipe) => {
            if (err) {
                res.status(500).json(err || 'Recipe not found');
            } else {
                res.status(200).json(recipe);
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Create a new recipe
const createNewRecipe = async(req, res) => {
    try {
        const recipenamae = req.body.name;
        const ingredients = req.body.ingredients;
        if (!recipenamae || ingredients.length === 0 || !ingredients) {
            res.status(400).send({ message: 'You must add at least one name and the ingredients' });
            return;
        }
        const recipe = new Recipe(req.body);
        const result = await recipe.save();
        res.status(201).json(result).send({
            message: 'You have created a new recipe'
        });

    } catch (err) {
        res.status(500).json(err || 'Could not create a recipe');
    }
}

//Update a recipe
const updateRecipe = async(req, res) => {
        try {
            const recipenamae = req.body.name;
            const ingredients = req.body.ingredients;
            if (!recipenamae || ingredients.length === 0 || !ingredients) {
                res.status(400).send({ message: 'You must add at least one name and the ingredients' });
                return;
            }
            const recipeId = req.params.id;
            Recipe.findOne({ _id: recipeId }, (err, recipe) => {
                recipe.name = req.body.name;
                recipe.difficulty = req.body.difficulty;
                recipe.duration = req.body.duration;
                recipe.ingredients = req.body.ingredients;
                recipe.instructions = req.body.instructions;
                recipe.notes = req.body.notes;
                recipe.tags = req.body.tags;
                recipe.save((err, result) => {
                    if (err) {
                        res.status(500).json(err || 'The contact could not be updated, an error occurred while updating.');
                    } else {
                        res.status(200).json(result);
                    }
                });
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    //Delete a recipe
const deleteRecipe = async(req, res) => {
    try {
        const recipeId = new ObjectId(req.params.id);
        const result = await Recipe.findOneAndDelete({ _id: recipeId });
        res.status(200).json(result).send({ message: 'The recipe has been deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Get ingredients from a recipe
const getIngredients = async(req, res) => {
    try {
        const recipeId = new ObjectId(req.params.id);
        const result = await Recipe.findOne({ _id: recipeId }, { ingredients: 1 });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getallRecipes, getSingleRecipe, createNewRecipe, updateRecipe, deleteRecipe, getIngredients };