import React from "react";
import "./AddComment.scss";
function AddComment({ submitFunction, value, onValueChange }) {
  
  return (
    <form className="add-comment" onSubmit={submitFunction}>
      <div>
        <div className="feedback">
          <div className="rating">
            <input
              type="radio"
              name="rating"
              id="rating-5"
              onChange={(e) =>
                onValueChange({
                  ...value,
                  rating: 5,
                })
              }
            />
            <label htmlFor="rating-5"></label>
            <input
              type="radio"
              name="rating"
              id="rating-4"
              onChange={(e) =>
                onValueChange({
                  ...value,
                  rating: 4,
                })
              }
            />
            <label htmlFor="rating-4"></label>
            <input
              type="radio"
              name="rating"
              id="rating-3"
              onChange={(e) =>
                onValueChange({
                  ...value,
                  rating: 3,
                })
              }
            />
            <label htmlFor="rating-3"></label>
            <input
              type="radio"
              name="rating"
              id="rating-2"
              onChange={(e) =>
                onValueChange({
                  ...value,
                  rating: 2,
                })
              }
            />
            <label htmlFor="rating-2"></label>
            <input
              type="radio"
              name="rating"
              id="rating-1"
              onChange={(e) =>
                onValueChange({
                  ...value,
                  rating: 1,
                })
              }
            />
            <label htmlFor="rating-1"></label>
            <div className="emoji-wrapper"></div>
          </div>
        </div>
      </div>
      <input className="form-control"
        type="text"
        placeholder="Name"
        value={value.name}
        onChange={(e) => onValueChange({ ...value, name: e.target.value })}
      />
      <textarea className="form-control"
        placeholder="Comment"
        value={value.content}
        onChange={(e) => onValueChange({ ...value, content: e.target.value })}
      />
      <button className="btn btn-primary" type="submit">Send Comment</button>
    </form>
  );
}

export default AddComment;
