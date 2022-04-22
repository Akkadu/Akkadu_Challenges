import { useLocation } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'
import Comment from './Comment'
import './singleProduct.css'

export default function SingleProduct({ userInfo }) {

    let id = useLocation().pathname
    id = id.split('/')[1]

    const [singleProduct, setSingleProduct] = useState([

    ])
    const [formValue, setFormValue] = useState('')
    const [commentValue, setCommentValue] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`${BASE_URL}/api/v1/product`)
                .then(res => {
                    setSingleProduct(res.data.result.find(item => item._id == id))
                    setCommentValue(res.data.result.find(item => item._id == id).comments)
                }).catch(err => console.log({ err }))
        }, 3000)
        return () => {
            clearInterval(interval);
        }
    }, [singleProduct])
    return (
        

        <div className='cs-con container d-flex flex-column justify-content-center align-items-center containersecond'>
            <div className='img-wrapper'>
                <img src={singleProduct.img} />
            </div>
            <div className='main-wrapper'>
                <h2 className='title'>
                    {singleProduct.name}
                </h2>
                <p className='description'>
                    {singleProduct.description}
                </p>
            </div>
            <p className='p-0 m-0 submit-text'>Submit your reviews</p>
            <Comment userInfo={userInfo} value={formValue} onChange={setFormValue} commentValue={commentValue} onCommentChange={setCommentValue} comments={singleProduct.comments} productId={id} />
        </div>

    )
}
