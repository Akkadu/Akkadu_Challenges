import React from 'react'

function LeaveButton({handleClick}) {
  return (
    <button className="btn btn-danger" onClick={handleClick}>Leave</button>
  )
}

export default LeaveButton