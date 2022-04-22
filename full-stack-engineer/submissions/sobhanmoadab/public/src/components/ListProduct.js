import React, { useLayoutEffect, useState } from "react";
import ProductCard from "./ProductCard";
import BeatLoader from 'react-spinners/BeatLoader'
import Api from '../utils/ApiConfig'
export default function ListProduct() {
  const [products, setProduct] = useState([]);

  useLayoutEffect(() => {
    // const interval = setInterval(() => {
    Api
      .get(`/api/v1/product`)
      .then((res) => {
        setProduct(res.result);
      })
      .catch((err) => console.log({ err }));
    // }, 1000);
    return () => {
      // clearInterval(interval);
    };
  }, []);
  return (
    <div className="container vh-100">
      <div className="row h-100">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p._id} className="col-12 col-md-6 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center w-100 h-100" >
            <BeatLoader color={'#0af'} loading={true} size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
