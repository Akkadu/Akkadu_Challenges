
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviewsSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    rating :{
        type: Number,
        required : true
    },
    reviewNote : {
        type: String,
        required : true
    }
}, {
    timestamps: true
});

module.exports = reviewsSchema;


