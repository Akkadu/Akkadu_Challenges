import React, { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/Constants'
import './comment.css'
import moment from 'moment'
import Form from './Form'
import EditCommentForm from './EditCommentForm'

function Comment({ value, onChange, productId, commentValue = [], onCommentChange, userInfo }) {

    const onChangeHandler = (e) => {
        onChange(e.target.value)
    }
    const [val, setVal] = useState({})
    const [editComment, setEditComment] = useState({})
    const onDeleteHandler = (e, commentId) => {
        e.preventDefault()
        axios.delete(`${BASE_URL}/api/v1/comments/?commentId=${commentId}`)
            .then(res => console.log(res.data.status))
            .catch(e => console.log(e))
    }
    const onUpdate = (e, id, val) => {
        // setEditComment(id)
        e.preventDefault()
        const data = {
            id,
            name: val.name,
            content: val.content,
            rating: val.rating,
            productId
        }
        axios.put(`${BASE_URL}/api/v1/comments`, data)
            .then(result => console.log(result.data))
            .catch(err => console.log(err))
    }


    const onAdd = (e, val) => {
        e.preventDefault()
        const data = {
            name: val.name,
            content: val.content,
            rating: val.rating,
            productId
        }

        axios.post(`${BASE_URL}/api/v1/comments`, data)
            .then(result => console.log(result.data))
            .catch(err => console.log(err))

    }
    return (
        <div className='comments-wrapper col-12'>
            <Form value={val} onChangeHandler={onChangeHandler} onChangeValue={setVal} onSubmitHandler={(e) => onAdd(e, val)} />
            {
                <div className="rev-section">

                    <h2 className="title">Reviews</h2>

                    <div className="reviews">

                        {
                            commentValue.length > 0 ? commentValue.map((c) =>
                            (<div key={c._id} className="col-12 m-2">

                                <div className="body-review">
                                    <div className='body-header d-flex justify-content-between'>
                                        <div className='d-flex justify-content-between'>
                                            <div className='d-flex flex-column align-items-start justify-content-start'>
                                                <div className='d-flex  justify-content-start me-2'>
                                                    <span className='me-2 title'>Rating:</span>
                                                    <span>{c.rating}</span>
                                                </div>
                                                <div className='d-flex  justify-content-start'>
                                                    <span>{moment(c.createdAt).format("YYYY/MM/DD hh:mm")}</span>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='actions'>
                                            {userInfo.userId !== c.userId ? <></> : <i className="fa-solid fa-pen p-2 action" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            </i>}
                                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                <div className="modal-dialog ">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="staticBackdropLabel">Edit Comment ?</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <EditCommentForm onChangeHandler={onCommentChange} commentId={c._id} value={commentValue} productId={productId} onSubmitHandler={(e) => onUpdate(e, editComment)} />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {userInfo.userId !== c.userId ? <></> : <i className="fa-solid fa-trash p-2 action" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                                            </i>}
                                            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdrop2" aria-hidden="true">
                                                <div className="modal-dialog ">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="staticBackdrop2">Delete Comment?</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            Are you sure?
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => onDeleteHandler(e, c._id)}>Yes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="name-review">{c.name}</div>


                                    <div className="desc-review">{c.content}</div>
                                </div>
                            </div>
                            )) : <h2>No Comments</h2>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Comment