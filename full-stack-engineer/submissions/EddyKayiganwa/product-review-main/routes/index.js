const express = require ("express");
const route=express.Router()
const productRouter = require ('./productRoutes');
const userRouter = require ('./userRoutes');
const reviewRouter = require ('./reviewRoutes');

route.use('/pro',productRouter)
route.use('/users',userRouter)
route.use('/reviews',reviewRouter)

module.exports=route