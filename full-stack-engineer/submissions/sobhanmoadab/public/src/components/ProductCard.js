import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({product}) {
    return (
        <div className="card">
            <img src={product.img} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <Link to={product._id} className="btn btn-primary">Show more</Link>
            </div>
        </div >
    )
}
