const express = require ("express");
const route=express.Router();
const productRouter = require ('./productRoutes');
const userRouter = require ('./userRoutes');
const reviewRouter = require ('./reviewRoutes');
const likeRouter = require ('./likeRoutes');

route.use('/pro',productRouter)
route.use('/users',userRouter)
route.use('/reviews',reviewRouter)
route.use('/likes',likeRouter)

module.exports=route