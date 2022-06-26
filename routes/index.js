const express = require('express');
const router = express.Router();

// generic route handler
const genericHandler = (req, res, next) => {
    res.json({
        status: 'success',
        data: req.body
    });
};

router.use('/recipes', require('./recipes'));

router.use('/authors', require('./author'));


module.exports = router;