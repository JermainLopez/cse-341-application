const express = require('express')
const router = express.Router()
const { ensureAuthenticated, ensureAuthor } = require('../software/soft')

//Recipes routes
const Recipe = require('../models/Recipe')

router.get('/', ensureAuthor, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

router.get('/dashboard', ensureAuthenticated, async(req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            recipes: recipes
        })
    } catch (err) {
        console.error(err)
        res.render('geterror/error500')

    }


})

module.exports = router