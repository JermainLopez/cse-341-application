module.exports = (mongoose) => {
    const authorSchema = mongoose.Schema({
        username: {
            type: String
        },
        name: {
            type: String
        },
        lastname: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: Date
        },
        phone: {
            type: String
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        eperience: [{
            type: String
        }]

    });

    return mongoose.model('authors', authorSchema);
};