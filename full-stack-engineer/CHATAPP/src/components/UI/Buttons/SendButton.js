import React from 'react'

function SendButton({handleClick}) {
  return (
    <button onClick={handleClick} className="btn btn-primary mx-2" style={{ width: '18%', fontSize: '15px', fontWeight: '550', maxWidth: '200px'}} >Send</button>
  )
}

export default SendButton