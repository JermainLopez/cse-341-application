const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../software/software')

//Recipes routes
const Recipe = require('../modules/Recipe')

//Show Recipe page
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('recipes/recipes')
})

//Post Recipe into de database
router.post('/', ensureAuthenticated, async(req, res) => {
    try {
        req.body.user = req.user.id
        await Recipe.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err.message)
        res.redirect('geterror/error500')
    }
})

router.get('/', ensureAuthenticated, async(req, res) => {
    try {
        const recipes = await Recipe.find({ status: 'public' }).populate('recipes').sort({ createdAt: 'desc' }).lean()
        res.render('recipes/index', {
            recipes: recipes,
        })
    } catch (err) {
        console.error(err)
        res.render('geterror/error500')
    }
})





module.exports = router