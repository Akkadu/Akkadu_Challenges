import React from "react";
import "./UpdateComment.scss";
function UpdateComment({
  updateValueChange,
  updatedValue,
  oldvalue,
  commentId,
}) {

  return (
    <form className="add-comment">
      <div>
        <div className="feedback">
          <div className="rating2">
            <input
              type="radio"
              name={commentId}
              id={`5-${commentId}`}
                checked={updatedValue.rating === 5 ? true : false}
              onChange={(e) =>
                updateValueChange({
                  ...updatedValue,
                  rating: 5,
                })
              }
            />
            <label htmlFor={`5-${commentId}`}></label>
            <input
              type="radio"
              name={commentId}
              id={`4-${commentId}`}
                checked={updatedValue.rating === 4 ? true : false}
              onChange={(e) =>
                updateValueChange({
                  ...updatedValue,
                  rating: 4,
                })
              }
            />
            <label htmlFor={`4-${commentId}`}></label>
            <input
              type="radio"
              name={commentId}
              id={`3-${commentId}`}
                checked={updatedValue.rating === 3 ? true : false}
              onChange={(e) =>
                updateValueChange({
                  ...updatedValue,
                  rating: 3,
                })
              }
            />
            <label htmlFor={`3-${commentId}`}></label>
            <input
              type="radio"
              name={commentId}
              id={`2-${commentId}`}
                checked={updatedValue.rating === 2 ? true : false}
              onChange={(e) =>
                updateValueChange({
                  ...updatedValue,
                  rating: 2,
                })
              }
            />
            <label htmlFor={`2-${commentId}`}></label>
            <input
              type="radio"
              name={commentId}
              id={`1-${commentId}`}
                checked={updatedValue.rating === 1 ? true : false}
              onChange={(e) =>
                updateValueChange({
                  ...updatedValue,
                  rating: 1,
                })
              }
            />
            <label htmlFor={`1-${commentId}`}></label>
            <div className="emoji-wrapper"></div>
          </div>
        </div>
      </div>
      <input
        type="text"
        placeholder="Name"
        value={updatedValue.name}
        // value={oldvalue.name }
        onChange={(e) =>
          updateValueChange({ ...updatedValue, name: e.target.value })
        }
      />
      <textarea
        placeholder="Comment"
        value={updatedValue.content}
        onChange={(e) =>
          updateValueChange({ ...updatedValue, content: e.target.value })
        }
      />
    </form>
  );
}

export default UpdateComment;
