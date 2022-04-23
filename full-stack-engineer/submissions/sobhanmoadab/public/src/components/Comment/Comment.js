import React, { useState } from "react";
import "./comment.css";
import moment from "moment";
import AddComment from "./AddComment";
import UpdateComment from "./UpdateComment";
import { toast } from 'react-toastify'
import Api from '../../utils/ApiConfig'
function Comment({ value, onChange, productId, comments = [], userId }) {

  const onDeleteHandler = (e, cmId) => {
    e.preventDefault();
    Api
      .delete(`/api/v1/comments/?commentId=${cmId}`)
      .then((res) =>
        toast.success("deleted your comment", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }))
      .catch((err) =>
        toast.error(err.response.data?.err, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }));
  };
  const [updatedValue, setUpdatedValue] = useState({
    name: '',
    content: '',
    rating: '',
  });


  const edit = (c) => {
    console.log(c)
    setUpdatedValue({
      name: c.name,
      content: c.content,
      rating: c.rating
    })
  }


  const onUpdate = (e, id, val) => {
    // setEditComment(id)
    e.preventDefault();
    const data = {
      id,
      name: val.name,
      content: val.content,
      rating: val.rating,
      productId,
    };
    Api.put(`/api/v1/comments`, data)
      .then((result) => {
        toast.success("Updated your comment", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
      .catch((err) => {
        toast.error(err.response.data?.err, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      });

    setUpdatedValue({
      newRating: 0,
      newName: "",
      newContent: "",
    });
  };

  const onAdd = (e) => {

    e.preventDefault();
    const data = {
      name: value.name,
      content: value.content,
      rating: parseInt(value.rating),
      productId,
    };
    Api
      .post(`/api/v1/comments`, data)
      .then((result) => {
        toast.success("Added your comment", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
      .catch((err) => {
        toast.error(err.response.data?.err, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      });
    onChange({
      rating: 1,
      name: "",
      content: "",
    });
  };
  return (
    <div className="comments-wrapper w-100">

      {
        <div className="rev-section">
          <h2 className="title">Reviews</h2>
          <AddComment
            submitFunction={onAdd}
            value={value}
            onValueChange={onChange}
          />
          <div className="reviews">
            {comments.length > 0 ? (
              comments.map((c) => {
                const Rating = () => {
                  let arr = []
                  for (var i = 0; i < c.rating; i++) {
                    arr.push(i)
                  }
                  return arr
                }
                return (
                  <div key={c._id} className="col-12 m-2">
                    <div className="body-review">
                      <div className="body-header d-flex justify-content-between">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-column align-items-start justify-content-start">
                            <div className="d-flex  justify-content-start me-2">
                              <span className="me-2 title">Rating:</span>
                              {
                                Rating().map(() => {
                                  return (
                                    <>
                                      <svg xmlns="http://www.w3.org/2000/svg" width={20} style={{ fill: '#fcba03' }} viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>

                                    </>
                                  )
                                })
                              }
                            </div>
                            <div className="d-flex  justify-content-start">
                              <span>
                                {moment(c.createdAt).format("YYYY/MM/DD hh:mm")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="actions">
                          {userId !== c.userId ? <i
                            className="fa-solid fa-pen p-2 action"
                            data-bs-toggle="modal"
                            onClick={() => edit(c)}
                            data-bs-target={`#staticBackdrop${c._id}`}
                          ></i> : <></>}
                          <div
                            className="modal fade"
                            id={`staticBackdrop${c._id}`}
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabIndex="-1"
                            aria-labelledby="staticBackdropLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog ">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="staticBackdropLabel"
                                  >
                                    Edit Comment ?
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  <UpdateComment
                                    updatedValue={updatedValue}
                                    updateValueChange={setUpdatedValue}
                                    commentId={c._id}
                                  />
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    onClick={(e) =>
                                      onUpdate(e, c._id, updatedValue)
                                    }
                                  >
                                    Yes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {userId !== c.userId ? <i
                            className="fa-solid fa-trash p-2 action"
                            data-bs-toggle="modal"
                            data-bs-target={`#staticBackdrop2${c._id}`}
                          ></i> : <></>}
                          <div
                            className="modal fade"
                            id={`staticBackdrop2${c._id}`}
                            data-bs-backdrop="static"
                            data-bs-keyboard="false"
                            tabIndex="-1"
                            aria-labelledby="staticBackdrop2"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog ">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="staticBackdrop2"
                                  >
                                    Delete Comment?
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">Are you sure?</div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => onDeleteHandler(e, c._id)}
                                  >
                                    Yes
                                  </button>
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
                );
              })
            ) : (
              <h2>No Comments</h2>
            )}
          </div>
        </div>
      }
    </div>
  );
}

export default Comment;
