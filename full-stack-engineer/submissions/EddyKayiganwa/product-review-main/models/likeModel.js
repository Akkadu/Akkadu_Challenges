const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    review: {
        type: mongoose.Schema.ObjectId,
        ref: 'Review',
        required: true
    }
});

module.exports = mongoose.model('Like', likeSchema);