import { useContext } from "react";
import ProductCard from "../cards/product-card";
import { ProductContext } from "../context/productContext";

function Home() {
    const { products } = useContext(ProductContext);
    return (
        <div className="product">
            <div className="product_list_cont">
                {products.length ? 
                    products.map((e, i) => (
                        <div key={i} className="product-cont">
                            <ProductCard product={e}/>
                        </div>
                    ))
                :<div style={{marginTop: "30px"}}>
                    <div style={{width: "42px", height: "42px"}} className="spinner-border" role="status"></div>
                </div>
                }
            </div>
        </div>
    );
}

export default Home;