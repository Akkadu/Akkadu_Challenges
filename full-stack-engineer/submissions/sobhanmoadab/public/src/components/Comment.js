import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import "./comment.css";
import moment from "moment";
import AddComment from "./AddComment";
import UpdateComment from "./UpdateComment";

function Comment({ value, onChange, productId, comments = [], userId }) {

  const onDeleteHandler = (e, cmId) => {
    e.preventDefault();
    axios
      .delete(`${BASE_URL}/api/v1/comments/?commentId=${cmId}`)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };
  const [updatedValue, setUpdatedValue] = useState({
    newRating: "",
    newName: "",
    newContent: "",
  });
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
    axios
      .put(`${BASE_URL}/api/v1/comments`, data)
      .then((result) => console.log(result.data))
      .catch((err) => console.log(err));

    setUpdatedValue({
      newRating: 0,
      newName: "",
      newContent: "",
    });
  };

  const onAdd = (e) => {
    const token = localStorage.getItem('token')
    e.preventDefault();
    const data = {
      name: value.name,
      content: value.content,
      rating: parseInt(value.rating),
      productId,
    };
    axios
      .post(`${BASE_URL}/api/v1/comments`, data, { headers: { Authorization: `Bearear ${token}` } })
      .then((result) => console.log(result.data))
      .catch((err) => console.log(err));
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
                return (
                  <div key={c._id} className="col-12 m-2">
                    <div className="body-review">
                      <div className="body-header d-flex justify-content-between">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-column align-items-start justify-content-start">
                            <div className="d-flex  justify-content-start me-2">
                              <span className="me-2 title">Rating:</span>
                              <span>{c.rating}</span>
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
                                    oldvalue={{
                                      rating: c.rating,
                                      name: c.name,
                                      content: c.content,
                                    }}
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
