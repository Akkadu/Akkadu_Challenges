import React, { useContext, useEffect } from "react";
import { getProduct } from "../../../Context/action";
import { GlobalContext } from "../../../Context/context";
import { ProductReviewCard } from "../../UI/Organisms";
import styles from "./styles.module.css";

const HomePageTemplate = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const {
    products: { productloading, productData, productError },
  } = state;
  useEffect(() => {
    getProduct(dispatch);
  }, []);

  useEffect(()=>{
    console.log("ssss",state)
  },[state])
  return (
    <div className={styles.section}>
      <h2>Product Review</h2>

      {productloading ? (
        <p>Loading Product...</p>
      ) : productError ? (
        <p>{productError}</p>
      ) : (
        productData.map((data) => (
          <ProductReviewCard
            key={data._id}
            {...data}
            customStyle={styles.cardSpacing}
          />
        ))
      )}
    </div>
  );
};

export default HomePageTemplate;
