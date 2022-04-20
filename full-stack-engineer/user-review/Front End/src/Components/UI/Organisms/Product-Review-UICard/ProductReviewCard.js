import React, { useContext, useState } from "react";
import { deleteReview, saveReview, updateReview } from "../../../../Context/action";
import { GlobalContext } from "../../../../Context/context";
import { Button, InputFeild, ProductImage } from "../../Atoms";
import { AddReviewFeild } from "../../Molecules";

import styles from "./styles.module.css";
const ProductReviewCard = ({
  customStyle,
  product_Image,
  product_Review,
  _id,
}) => {
  const { dispatch } = useContext(GlobalContext);
  // const {
  //   products: { reviewLoading },
  // } = state;

  const [review, setReview] = useState("");
  const [updateReviewIndex, setUpdateReviewIndex] = useState("");
  const [buttonLabel, setButtonLabel] = useState("Add Review");

  const submitReview = async () => {
    if (review !== "") {
      await saveReview(dispatch, review, _id);
      setReview("");
    }
  };

  function updateInputTextHandler(data, index) {
    setReview(data);
    setUpdateReviewIndex(index);
    setButtonLabel("Update Review");
  }

  async function updateReviewHandler() {
    await updateReview(dispatch, review, _id,updateReviewIndex)
    setReview("");
    setUpdateReviewIndex("");
    setButtonLabel("Add Review");
  }

  function deleteReviewHandler(index) {
    deleteReview(dispatch, index, _id);
  }

  return (
    <div className={`${styles.card} ${customStyle}`}>
      <ProductImage customStyle={styles.productImage} uri={product_Image} />

      <AddReviewFeild
        // inputStyle,
        innerLabel="Your Review"
        onChangeHandler={setReview}
        inputValue={review}
        clickHandler={
          buttonLabel === "Add Review" ? submitReview : updateReviewHandler
        }
        // buttonStyle
        label={buttonLabel}
      />

      <h4>Reviews</h4>

      {product_Review.length > 0 ? (
        product_Review.map((data, index) => (
          <div className={styles.reviewList} key={index}>
            <p>{data}</p>
            <div>
              <Button
                label="Update"
                clickHandler={() => {
                  updateInputTextHandler(data, index);
                }}
              />
              <Button
                label={"Delete"}
                clickHandler={() => {
                  deleteReviewHandler(index);
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p>Please Add Your First Review.</p>
      )}
    </div>
  );
};

export default ProductReviewCard;
