import { useLocation } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'
import Comment from './Comment'

export default function SingleProduct() {

    let id = useLocation().pathname
    id = id.split('/')[1]

    const [singleProduct, setSingleProduct] = useState([])
    const [formValue, setFormValue] = useState('')

    useEffect(() => {

        axios.get(`${BASE_URL}/api/v1/product`)
            .then(res => {
                setSingleProduct(res.data.result.find(item => item._id == id))
            }).catch(err => console.log({ err }))
    }, [])
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center'>
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
            <Comment value={formValue} onChange={setFormValue} comments={singleProduct.comments}/>
        </div>
    )
}
