/*
*Resolvers entry point
*Clones the Query and Mutation from review object
*Date : 18th Feb 2021
*/
const reviews = require('./reviews');
//Spread the review object
module.exports = {
    Query : {
        ...reviews.Query
    },
    Mutation : {
        ...reviews.Mutation
    }
}