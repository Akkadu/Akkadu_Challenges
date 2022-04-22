const Like = require('../models/likeModel');
const asyncHandler = require('express-async-handler');

// get all likes
exports.getLikes = asyncHandler(async (req, res, next) => {
    const likes = await Like.find();
    res.status(200).json(likes);
});

// get single like
exports.getLike = asyncHandler(async (req, res, next) => {
    const like = await Like.findById(req.params.id);
    if (!like) {
        return next(new ErrorResponse(`No like with the id of ${req.params.id}`, 404));
    }
    res.status(200).json(like);
});

//get likes by user
exports.getLikesByUser = asyncHandler(async (req, res, next) => {
    const likes = await Like.find({ user: req.params.id });
    if (!likes) {
        return next(new ErrorResponse(`No likes with the id of ${req.params.id}`, 404));
    }
    res.status(200).json(likes);
});

//get likes by review
exports.getLikesByReview = asyncHandler(async (req, res, next) => {
    const likes = await Like.find({ review: req.params.id });
    if (!likes) {
        return next(new ErrorResponse(`No likes with the id of ${req.params.id}`, 404));
    }
    res.status(200).json(likes);
});

//create like
exports.createLike = asyncHandler(async (req, res) => {
    try {
        const like = await Like.create({
            type: req.body.type,
            user: req.user._id,
            review: req.params.id
        });
        res.status(200).json(like);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//delete like
exports.deleteLike = asyncHandler(async (req, res, next) => {
    const like = await Like.findById(req.params.id);
    if (!like) {
        return next(new ErrorResponse(`No like with the id of ${req.params.id}`, 404));
    }
    like.remove();
    res.status(200).json({ success: true });
});

//update like
exports.updateLike = asyncHandler(async (req, res, next) => {
    const like = await Like.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!like) {
        return next(new ErrorResponse(`No like with the id of ${req.params.id}`, 404));
    }
    res.status(200).json(like);
});
