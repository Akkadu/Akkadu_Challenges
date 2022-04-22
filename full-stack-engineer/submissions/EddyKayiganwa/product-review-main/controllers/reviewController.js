// create controller for review
const asyncHandler = require('express-async-handler');
const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

// @desc    Get reviews
// @route   Get /api/reviews
// @access  Private

// get all reviews of a product
const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ product: req.params.id});
    res.status(200).json(reviews);
});

// @desc    Set reviews
// @route   Get /api/reviews
// @access  Private

// create  a review controller
const setReview = asyncHandler(async (req, res, next) => {
    const { rating, review } = req.body;
    const user = await User.findById(req.user.id);
    const product = await Product.findById(req.params.id);
    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.user.id}`, 404));
    }
    if (!product) {
        return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));
    }
    const newReview = new Review({
        rating,
        review,
        user: req.user.id,
        product: req.params.id
    });
    await newReview.save();
    res.status(200).json(newReview);
});

// route to get reviews of a product by user id
const getReviewsUser = asyncHandler(async (req, res) => {
    const review = await Review.findOne({ _id: req.params.id });
    
    // display reviews of a product by id that belongs to a user  by user id
    if (review) {
        const user = await User.findById(review.user);
        res.status(200).json({username: user.name});
    }
    else {
        res.status(404).json({message: "view not found"});
    }

});


// @desc    update reviews
// @route   Get /api/reviews/:id
// @access  Private

const updateReview = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ _id: req.params.id });


    if(!reviews) {
        return res.status(400)
            throw new Error('Review not found');
    }

    const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json(updatedReview);
})

// @desc    Delete reviews
// @route   Get /api/reviews/:id
// @access  Private

const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if(!review) {
        return res.status(400)
            throw new Error('Review not found');
    }
    await review.remove();

    res.status(200).json({id:req.params.id});

})

module.exports ={
    getAllReviews,
    setReview,
    updateReview,
    deleteReview,
    getReviewsUser
}




