const graphql = require('graphql');
const { authorSchema } = require('../models/author');




const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema
} = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and descibes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   

var fakeBookDatabase = [
    authorSchema
]

const BookType = new GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book 
//or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument by the user
                return fakeBookDatabase.find((item) => { return item.id == args.id });
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery
});



/* const { Author } = require('@hapi/joi');
const AuthorSchema = Author.Object({
    name: Author.string().required(),
    email: Author.string().email().required(),
    password: Author.string().min(8).required(),
    phone: Author.string().required(),
    address: Author.string().required(),
    city: Author.string().required(),
    state: Author.string().required(),
    eperience: Author.int().required(),
    createdAt: Author.date().default(Date.now)
});
module.exports = {
    AuthorSchema
}; */