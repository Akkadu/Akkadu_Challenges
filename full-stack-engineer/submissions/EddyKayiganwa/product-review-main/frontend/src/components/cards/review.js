import { useState, useEffect, useContext, useCallback } from "react";
import { ProductContext } from "../context/productContext";
import { toast } from 'react-toastify';
import { AuthContext } from "../context/AuthContext";

function Review(props) {
    const { getLikes, likeReview, unlikeReview } = useContext(ProductContext);
    const { user } = useContext(AuthContext);
    const review = props.review;
    const [revUser, setRevUser] = useState(null);
    const [mylike, setMyLike] = useState(null);
    const [myDisLike, setMyDisLike] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const [inLike, setInLike] = useState(true);

    const getReviewUser = useCallback(async () => {
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
    }, [review._id]);

    const getRevLikes = useCallback(async () => {
        const res = await getLikes(review._id);
        if (res) {
            var lk = 0, unlk = 0;
            res.forEach(like => {
                if (user) {
                    if (like.user === user.id) {
                        like.type === 'like' ? setMyLike(like) : setMyDisLike(like);
                    }
                }

                if (like.type === 'like') {
                    lk += 1;
                }
                if (like.type === 'dislike') {
                    unlk += 1;
                }
            });
            setLikes(lk);
            setDislikes(unlk);
        }
    }, [getLikes, likes, dislikes, setLikes, setDislikes, review._id], user && user.id);

    const addLike = async (type) => {
        if (!user) {
            toast.info('Login to add like on review');
            return;
        }
        const data = {
            review: review._id,
            type: type,
        };
        const res = await likeReview(review._id, data);
        if (res) {
            await getLikes();
            type === 'like' ? setMyLike(res) : setMyDisLike(data);
            toast.success(`${type} added successfully.`)
        }
        else {
            toast.error('fail to add like on review, try again');
        }
    }

    const rmvLike = async (like, type) => {
        const res = await unlikeReview(like);
        if (res) {
            type === 'like' ? setMyLike(null) : setMyDisLike(null);
            toast.success(`Review ${type}ed successfully`);
        }
        else {
            toast.error('Fail to add unlike review')
        }
    };

    const likeHandler = async (type) => {
        setInLike(false);
        if (!user) {
            toast.info(`Login to ${type} review`);
            setInLike(true);
            return;
        }

        if (type === 'like') {
            if (mylike) {
                await rmvLike(mylike._id, type);
                setLikes(likes => likes - 1);
            }
            else {
                if (myDisLike) {
                    await rmvLike(myDisLike._id, "dislike");
                    setDislikes(dislikes - 1);
                }
                await addLike('like');
                setLikes(likes + 1);
            }
        }

        else if (type === 'dislike') {
            if (myDisLike) {
                await rmvLike(myDisLike._id, type);
                setDislikes(dislikes - 1, type);
            }
            else {
                if (mylike) {
                    await rmvLike(mylike._id, "like");
                    setLikes(likes - 1);
                }
                await addLike('dislike');
                setDislikes(dislikes + 1);
            }
        }
        setInLike(true);
    };

    useEffect(() => {
        getReviewUser();
        getRevLikes();
    }, [getReviewUser, getRevLikes]);
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
                    <h5><small style={{ fontSize: "14px" }}>By</small> {revUser ? revUser.username : ''}</h5>
                </div>
            </div>

            <div className='revtext'>
                <p>{review.review}</p>
            </div>

            <div className="rowrev">
                <div className="likes">
                    <div className="like">
                        <p>
                            {inLike ? <i onClick={() => likeHandler("like")} className={mylike ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}></i>
                            :<small style={{width: "15px", height: "15px", border: "2px solid currentColor", borderRightColor: "transparent"}} className="spinner-border" role="status"></small>}
                        </p>

                        <p> {likes} </p>
                    </div>

                    <div className="dislike">
                        <p>
                            {inLike ? <i onClick={() => likeHandler("dislike")} className={dislikes ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"}></i>
                            :<small style={{width: "15px", height: "15px", border: "2px solid currentColor", borderRightColor: "transparent"}} className="spinner-border" role="status"></small>}
                        </p>

                        <p>{dislikes}</p>
                    </div>
                </div>

                <div className='revDate'>
                    <p>{new Date(review.createdAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}

export default Review;