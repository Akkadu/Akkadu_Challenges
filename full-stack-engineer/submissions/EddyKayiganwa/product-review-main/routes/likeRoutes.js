const express = require('express');
const route = express.Router();
const LikesController = require("../controllers/likesController");
const { protect } = require("../middleware/auth");

route.post('/create/:id', protect, LikesController.createLike);
route.get('/onelike/:id', protect, LikesController.getLike);
route.get('/likes', protect, LikesController.getLikes);
route.get('/revlikes/:id' , LikesController.getLikesByReview);
route.put('/update/:id', protect, LikesController.updateLike);
route.delete('/delete/:id', protect, LikesController.deleteLike);

module.exports=route;