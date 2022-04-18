import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Review from '../cards/review';
import { ProductContext } from '../context/productContext';


function Product() {
    const { user } = useContext(AuthContext);
    const { 
        getProduct,
        getReviews,
        sendReview, 
        updateReview,
        deleteReview 
    } = useContext(ProductContext);
    
    const [reviews, setReviews] = useState([]);
    const [myReview, setMyReview] = useState(null);
    const [product, setProduct] = useState(null);
    const [requesting, setRequesting] = useState(false);

    const { id } = useParams();
    
    const [star, setStar] = useState(0);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [reModel, setReModel] = useState(false);

    const addReviewHandler = async(event) => {
        setRequesting(true);
        event.preventDefault();
        if (user) {
            const data = myReview ? await updateReview(myReview._id, review, star) : await sendReview(product._id, review, star);
            if (data) {
                var temp = myReview ? reviews.map(e => {
                    if(e._id === myReview._id) {
                        return data
                    }
                    return e;
                }) 
                : [...reviews, data];

                setReviews(temp.reverse());
                setRating(() => {
                    let sum = 0;
                    temp.forEach(e => {
                        sum += e.rating;
                    });
                    return parseInt(sum / temp.length);
                });
                toast.success(myReview ? 'review updated successfully' : 'review added successfully');
                setMyReview(data);
            }
            else {
                toast.error("Fail to add review, try again");
            }
            setReModel(false);

        }
        else {
            toast.info("You must login to add review");
        }
        setRequesting(false);
    };

    const deleteMyReview = async() => {
        const confirm = window.confirm("You are about to delete your review, Click ok to confirm");
        setRequesting(true);
        if (myReview && confirm) {
            const data = await deleteReview(myReview._id);
            if (data) {
                var temp = reviews.filter(e => e._id !== myReview._id);
                setReviews(temp.reverse());

                setRating(() => {
                    let sum = 0;
                    temp.forEach(e => {
                        sum += e.rating;
                    });
                    return parseInt(sum / temp.length);
                });
                setMyReview(null);
                setStar(0);
                setReview('');
                toast.success("review deleted successfully");
            }
            else {
                toast.error("Fail to delete review");
            }
        }
        setRequesting(false);
    }

    useEffect(() => {
        getProduct(id).then(data => {
            if (data) {
                setProduct(data);
                getReviews(id).then(data => {
                    if (data) {
                        data.length ? setReviews([...data].reverse()) : setReviews(null);
                        setRating(() => {
                            let sum = 0;
                            data.forEach(e => {
                                sum += e.rating;
                            });
                            return parseInt(sum / data.length);
                        });

                        user && data.forEach(e => {
                            if (e.user === user.id) {
                                setMyReview(e);
                                setStar(e.rating);
                                setReview(e.review);
                            }
                        });
                    }
                    else {
                        setProduct(null);
                        toast.error('Fail to get Product reviews, try again');
                    }
                }
                );
            }
            else {
                toast.error("Fail to get product, try again");
            }
        });
        
    }, [getReviews, getProduct, id, user]);

    return (
        <div className='product_review_container'>
            {product ? 
                <div className='product_review_header'>
                    <div className="product_img">
                        <h2>{ product.product_name }</h2>

                        <div className='pimg'>
                            <img src={product.imagePath} alt='product' />

                            <div className='strev'>
                                <h2 style={{marginTop: "20px"}}>
                                    {Array(5).fill().map((_, i) => (
                                        <span key={i}>
                                            <i className={rating > i ? 'bi bi-star-fill' : 'bi bi-star'}></i>
                                        </span>
                                    ))}  

                                    <span style={{fontSize: "small"}}> { rating } / 5 rating</span>               
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className='product_rev'>

                        <div className='adrvbtn'>
                            {myReview ? 
                                requesting ?  <button style={{cursor: 'wait'}} type="button" className='btn'>Loading</button>
                                :
                                <>
                                <button onClick={() => setReModel(true)}>Edit my Review</button>
                                <button style={{marginLeft: "10px"}} onClick={() => deleteMyReview()}>Delete my review</button>
                                </>
                            
                            : <button onClick={() => setReModel(true)}>Add Review</button>}
                        </div>

                        <div className='myreview'></div>
                        <div style={{display: reModel ? 'block' : 'none'}} className='addrev'>
                            
                            <div className='addrev_body'>
                            <div className='clsbtn'>
                                <button onClick={() => !requesting && setReModel(false)}><i className='bi bi-x'></i></button>
                            </div>
                                <div className='strcon'>
                                    <h4>Rate Product</h4>
                                    <h3>
                                        {Array(5).fill().map((_, i) => (
                                        <span key={i} onClick={() => {
                                            if ((i+1 === 1) && (star === 1)) {
                                                !requesting && setStar(0);
                                            }
                                            else {
                                                    !requesting && setStar(i+1);
                                            }
                                        }}>
                                                <i className={star > i ? 'bi bi-star-fill' : 'bi bi-star'}></i>
                                        </span>
                                        ))}  
                                    </h3>
                                </div>

                                <form className='revin' onSubmit={(event) => addReviewHandler(event)}>
                                    <div className='textarea'>
                                        <textarea placeholder='Enter your review...' onChange={(event) => !requesting && setReview(event.target.value)} value={review} required></textarea>
                                    </div>

                                    <div className='revbtn'>
                                        {!requesting ? <button type='submit'>{myReview ? "Update Review" : "Add Review"}</button> : <button style={{cursor: 'wait'}} type="button" className='btn'>Loading</button>}
                                    </div>
                                </form>
                            </div>

                        </div>

                        <div className='listrev'>
                            <div className='listrev_header'>
                                <h2>Product Reviews</h2>
                            </div>

                            {reviews ? 
                                reviews.length > 0 ? reviews.reverse().map((review, i) => (
                                    <div key={i} className='review_card'>
                                        <Review review={review}/>
                                    </div>
                                ))
                                : <div style={{marginTop: "30px"}}>
                                    <div style={{width: "42px", height: "42px"}} className="spinner-border" role="status"></div>
                                </div>

                            : <h5>No reviews yet</h5>
                            }
                            
                        </div>
                    </div>
                </div>
                
                :<div style={{marginTop: "30px"}}>
                    <div style={{width: "42px", height: "42px"}} className="spinner-border" role="status"></div>
                </div>
            }
        </div>
    );
}

export default Product;