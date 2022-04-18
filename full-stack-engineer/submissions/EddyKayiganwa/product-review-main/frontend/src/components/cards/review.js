import { useState, useEffect, useCallback } from "react";

function Review(props) {
    const review = props.review;
    const [revUser, setRevUser] = useState(null);

    const getReviewUser = useCallback(async() => {
        const res = await fetch(`/api/reviews/getrevuser/${review._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        if (res.status === 200) {
            setRevUser(data);
        }
    }, [review]);
    
    useEffect(() => {
        getReviewUser();
    }, [getReviewUser]);
    return (
        <div className='revcard'>

            <div className='starnm'>
                <div className='gvnstar'>
                    <h4>
                        {Array(5).fill().map((_, i) => (
                            <span key={i}>
                                <i className={review.rating > i ? 'bi bi-star-fill' : 'bi bi-star'}></i>
                            </span>
                        ))}  
                    </h4>
                </div>

                <div className='reviewer'>
                    <h5><small style={{fontSize: "14px"}}>By</small> { revUser ? revUser.username : '' }</h5>
                </div>
            </div>

            <div className='revtext'>
                <p>{ review.review }</p>
            </div>

            <div className='revDate'>
                <p>{ new Date(review.createdAt).toLocaleString() }</p>
            </div>
        </div>
    );
}

export default Review;