var mongoose = require('mongoose');
const reviewsSchema = require('./reviews.model');


reviewsSchema.statics = {
    create : function(data, cb) {
        let reviews = new this(data);
        reviews.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },

    getById: function(query, cb) {
        this.find(query, cb);
    },

    update: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    delete: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

let reviewsSchema = mongoose.model('reviews', reviewsSchema);
module.exports = reviewsSchema;