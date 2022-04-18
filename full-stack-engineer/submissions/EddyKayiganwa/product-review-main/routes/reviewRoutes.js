const express = require('express');
const route = express.Router();
const upload = require("../helpers/multer");
const reviewController = require("../controllers/reviewController");
const { protect } = require("../middleware/auth");

route.post('/create/:id',protect,reviewController.setReview);
route.get('/getrev/:id',reviewController.getAllReviews)
route.patch('/getupdate/:id',protect,reviewController.updateReview)
route.delete('/delete/:id',protect,reviewController.deleteReview)
route.get('/getrevuser/:id',reviewController.getReviewsUser)

module.exports=route