import { Link } from "react-router-dom";

function ProductCard(props) {
    const product = props.product;

    return (
        <div className="product-card">
            <h1>{product.product_name}</h1>
            <div className="product-pic" style={{backgroundImage: `url(${product.imagePath})`}}></div>
           
            <div className="product-info" style={{marginTop: "20px"}}>
                <Link to={`/product/${product._id}`} className="product-button">Add a review</Link>
            </div>
        </div>
    );
}

export default ProductCard;