import {useNavigate, useParams } from "react-router-dom";
import Api from '../utils/ApiConfig'
import React, { useLayoutEffect, useState } from "react";
import Comment from "./Comment";
import "./singleProduct.css";

export default function SingleProduct({ userId }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [singleProduct, setSingleProduct] = useState([]);
  const [formValue, setFormValue] = useState({});

  useLayoutEffect(() => {
    const interval = setInterval(() => {
    Api.get(`/api/v1/product/by-id?productId=${id}`)
      .then((res) => {
        setSingleProduct(res.result);
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
    <div className="w-100 vh-100 bg-white">
      <div className="d-flex justify-content-between px-5 align-items-center" style={{ height: '10%' }} >
        <div className="w-50" >
          <div style={{ width: 'fit-content', cursor: 'pointer' }} onClick={() => navigate('/')} >
            <span className="p-2 border rounded-circle"    >
              <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', marginTop: '-5px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </span>
            Back To Home
          </div>
        </div>

      </div>
      <div className="w-100 h-75 d-flex "  >
        <div className="w-50 h-100 d-flex justify-content-center align-items-center col-6" style={{ backgroundColor: '#ccc' }} >
          <img src={singleProduct.img} />
        </div>
        <div className="w-50 px-5 h-100 d-flex flex-column justify-content-center align-items-start col-6">
          <h2 className="">{singleProduct.name}</h2>
          <p className="">{singleProduct.description}</p>
          <p className="">Submit your reviews</p>
        </div>
      </div>
      <div className="w-100 py-5" style={{ backgroundColor: "#fffa" }}>
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
