import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/Constants";
import Comment from "./Comment";
import "./singleProduct.css";

export default function SingleProduct({ userId }) {
  const { id } = useParams()

  const [singleProduct, setSingleProduct] = useState([]);
  const [formValue, setFormValue] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`${BASE_URL}/api/v1/product/by-id?productId=${id}`)
        .then((res) => {
          setSingleProduct(res.data.result);
        })
        .catch((err) => console.log({ err }));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [singleProduct]);
  return (
    // <div className="cs-con containersecond container d-flex flex-column justify-content-center align-items-center row">
    //   <div className="d-flex ">
    //     <div className="img-wrapper">
    //     </div>
    //     <img src={singleProduct.img} />
    //     <div className="main-wrapper">
    //       <h2 className="title">{singleProduct.name}</h2>
    //       <p className="description">{singleProduct.description}</p>
    //       <p className="p-0 m-0 submit-text">Submit your reviews</p>
    //     </div>
    //   </div>
    //   <Comment
    //     value={formValue}
    //     onChange={setFormValue}
    //     comments={singleProduct.comments}
    //     productId={id}
    //   />
    // </div>
    <div className="w-100 h-100 bg-white">
      <div className="w-100 h-75 d-flex " >
        <div className="w-50 h-100 d-flex justify-content-center align-items-center col-6">
          <img src={singleProduct.img} />
        </div>
        <div className="w-50 h-100 d-flex flex-column justify-content-center align-items-start col-6">
          <h2 className="">{singleProduct.name}</h2>
          <p className="">{singleProduct.description}</p>
          <p className="">Submit your reviews</p>
        </div>
      </div>
      <div className="w-100">
        <Comment userId={userId}
          value={formValue}
          onChange={setFormValue}
          comments={singleProduct.comments}
          productId={id}
        />
      </div>
    </div>
  );
}
