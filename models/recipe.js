module.exports = (mongoose) => {
    const recipeSchema = mongoose.Schema({
        name: {
            type: String
        },
        difficulty: {
            type: String
        },
        duration: {
            type: String
        },
        ingredients: {
            type: [
                String
            ]
        },
        instructions: {
            type: [
                String
            ]
        },
        notes: {
            type: Array
        },
        tags: {
            type: [
                String
            ]
        }
    });

    return mongoose.model('recipes', recipeSchema);
};