import express from "express";
import OrderReview from "../models/orderReviewModel.js";
import asyncHandler from "express-async-handler";

const orderReviewRouter = express.Router();

orderReviewRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    let orders = await OrderReview.find({});
    res.send(orders);
  })
);

orderReviewRouter.patch(
  "/add-review",
  asyncHandler(async (req, res) => {
    let { _id, review } = req.body;
    let orders = await OrderReview.findById(_id);



    orders.product_Review = [review,...orders.product_Review];

    let updatedReview = await orders.save();
    res.send(updatedReview);
  })
);
orderReviewRouter.patch(
  "/update-review",
  asyncHandler(async (req, res) => {
    let { _id, review,index } = req.body;
    let orders = await OrderReview.findById(_id);
    orders.product_Review[Number(index)] = review
    let updatedReview = await orders.save();
    res.send(updatedReview);
  })
);

orderReviewRouter.delete(
  "/delete-review/:id/:index",
  asyncHandler(async (req, res) => {
    let { id,index } = req.params;
    let orders = await OrderReview.findById(id);
    orders.product_Review.splice(index,1);
    let updatedReview = await orders.save();
    res.send(updatedReview);
  })
);

export default orderReviewRouter;
