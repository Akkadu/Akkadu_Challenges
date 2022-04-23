import { useNavigate, useParams } from "react-router-dom";
import Api from '../../utils/ApiConfig'
import React, { useLayoutEffect, useState } from "react";
import Comment from "../Comment/Comment";
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
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div className="w-100  vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="w-75 h-100  d-flex flex-column gap-5">
        <div className="d-flex justify-content-between px-5 align-items-center" style={{ height: '10%'}} >
          <div className="w-50" >
            <div className="btn btn-warning" style={{ width: 'fit-content', cursor: 'pointer' }} onClick={() => navigate('/')} >
              
              Back To Home
            </div>
          </div>
        </div>
        <div className="w-100 bg-white shadow-lg h-75 d-flex "  >
          <div className="w-50 h-100 d-flex justify-content-start align-items-center col-6"  >
            <img src={singleProduct.img} alt="" />
          </div>
          <div className="w-50 px-5 h-100 d-flex flex-column justify-content-center align-items-start col-6">
            <h2 className="">{singleProduct.name}</h2>
            <p className="">{singleProduct.description}</p>
            <p className="">Submit your reviews</p>
          </div>
        </div>
        <div className="w-100 py-5 mt-1" style={{ backgroundColor: "#fffd" }}>
          <Comment userId={userId}
            value={formValue}
            onChange={setFormValue}
            comments={singleProduct.comments}
            productId={id}
          />
        </div>
      </div>
    </div>

  );
}
