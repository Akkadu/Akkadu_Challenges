import React from 'react'

function JoinButton({handleClick}) {
  return (
    <button className="mt-3 btn btn-primary" onClick={handleClick}>
        Join
    </button>
  )
}

export default JoinButton