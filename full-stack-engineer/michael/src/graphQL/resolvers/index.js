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