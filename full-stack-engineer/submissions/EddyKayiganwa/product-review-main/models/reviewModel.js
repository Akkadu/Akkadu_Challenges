// create a new model for the review
const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, 'Please add a rating'] 
    },
    review: {
        type: String,
        required: [true, 'Please add a review']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // add the user id as a reference to the user who created the review
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    // add the product id as a reference to the product that was reviewed
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    }
});

module.exports = mongoose.model('Review', reviewSchema);

