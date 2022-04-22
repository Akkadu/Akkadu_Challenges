import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import ProductCard from "./ProductCard";

export default function ListProduct() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`${BASE_URL}/api/v1/product`)
        .then((res) => {
          setProduct(res.data.result);
        })
        .catch((err) => console.log({ err }));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [products]);
  return (
    <div className="container">
      <div className="row">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p._id} className="col-12 col-md-6 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
}
