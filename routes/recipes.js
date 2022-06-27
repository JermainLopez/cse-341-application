const recipesController = require('../controllers/recipesShema');
const express = require('express');
const router = express.Router();

router.get('/', recipesController.getallRecipes);

router.get('/:id', recipesController.getSingleRecipe);

//Call the funtion to create a new Recipe
router.post('/', recipesController.createNewRecipe);

//Update the Recipe from database
router.put('/:id', recipesController.updateRecipe);

//Delete the Recipe from database
router.delete('/:id', recipesController.deleteRecipe);

//Get getIngredients 
router.get('/:id', recipesController.getIngredients);

module.exports = router;