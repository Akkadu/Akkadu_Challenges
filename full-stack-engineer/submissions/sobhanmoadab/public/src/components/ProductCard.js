import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './ProductCard.css'


export default function ProductCard({ product }) {
  const navigate = useNavigate()
  return (
    <div className="card border-0 shadow-lg my-4" onClick={() => navigate(`/${product._id}`)}>
      <img src={product.img} style={{ height: 250, width: "100%" }} className=" rounded-3 card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <Link to={product._id} className="btn w-100 btn-primary">
          Show more
        </Link>
      </div>
    </div>
  );
}
