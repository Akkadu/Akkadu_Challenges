import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { AuthContext } from './AuthContext';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const [products, setProducts ] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authToken } = useContext(AuthContext);

    const getProducts = useCallback(async ()  => {
        const res = await fetch("/api/pro/getpro", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await res.json();
        if (res.status === 200) {
            setLoading(false);
            setProducts(data);
        }
    }, []);

    const getProduct = async (id) => {
        const res = await fetch(`/api/pro/getOnepro/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await res.json();
        if (res.status === 200) {
            return data;
        }
        return null;
    };

    const getReviews = async(product) => {
        const res = await fetch(`/api/reviews/getrev/${product}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await res.json();
        if (res.status === 200) {
            return data;
        }
        return null;
    };

    const sendReview = async(product, review, rating) => {
        const res = await fetch(`/api/reviews/create/${product}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({review, rating})
        });

        const data = await res.json();
        if (res.status === 200) {
            return data;
        }
        return null;
    };

    const updateReview = async(id, review, rating) => {
        const res = await fetch(`/api/reviews/getupdate/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({review, rating: parseInt(rating)})
        });

        const data = await res.json();
        if (res.status === 200) {
            return data;
        }
        return null;
    };

    const deleteReview = async(review) => {
        const res = await fetch(`/api/reviews/delete/${review}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        });

        const data = await res.json();
        if (res.status === 200) {
            return data;
        }
        return null;
    };

    const getLikes = async(review) => {
        const res = await fetch(`/api/likes/revlikes/${review}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            }
        });
        if (res.status === 200) {
            return res.json();
        }
        return null;
    };

    const likeReview = async(review, data) => {
        const res = await fetch(`/api/likes/create/${review}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(data)
        });
        if (res.status === 200) {
            return res.json();
        }
        return null;
    };

    const unlikeReview = async(like) => {
        const res = await fetch(`/api/likes/delete/${like}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        });
        if (res.status === 200) {
            return res.json();
        }
        return null;
    };

    const updateLike = async(review, data) => {
        const res = await fetch(`/api/likes/update/${review}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(data)
        });
        if (res.status === 200) {
            return res.json();
        }
        return null;
    };

    const contextData = {
        products,
        getProducts,
        getProduct,
        getReviews,
        sendReview,
        updateReview,
        deleteReview,
        getLikes,
        likeReview,
        unlikeReview,
        updateLike
    };

    useEffect(() => {
        if (loading) {
            getProducts();
        }
    }, [loading, getProducts]);

    return (
        <ProductContext.Provider value={contextData}>
            { children }
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;