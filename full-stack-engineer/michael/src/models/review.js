const { model,Schema } = require('mongoose');
//Schema for review
const reviewSchema = new Schema ({
    name : String,
    rating : Number,
    review : String,
    timestamp : String
})

module.exports = model('review',reviewSchema);