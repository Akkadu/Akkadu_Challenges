import mongoose from "mongoose";

const orderReviewSchema = mongoose.Schema(
  {
    product_Image: {
      type: String,
    },
    product_Review: {
      type: Array,
      
    },
  },
);

const OrderReview = mongoose.model("order-Review", orderReviewSchema);
export default OrderReview;
