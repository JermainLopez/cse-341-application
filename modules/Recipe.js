const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    difficulty: {
        type: String
    },
    duration: {
        type: String
    },
    ingredients: {
        type: String
    },
    instructions: {
        type: String
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Recipe', RecipeSchema)