const express = require('express');
const router = express.Router();

const authorController = require('../controllers/authorShema');

//Get all Authors
router.get('/', authorController.getAllAuthors);

//Create a new author
router.post('/', authorController.createAuthor);
//Get all Authors
router.get('/:username', authorController.getSingleAuthor);

//Update a new author
router.put('/:username', authorController.updateAuthor);

module.exports = router;