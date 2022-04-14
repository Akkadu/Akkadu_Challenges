import React, { useState } from 'react'

function Comment({ value, onChange, comments }) {

    const onChangeHandler = (e) => {
        onChange(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

    }

    const [val, setVal] = useState({})

    return (
        <div className='comments-wrapper'>
            <form className='d-flex flex-column justify-content-center align-items-center' onSubmit={onSubmitHandler}>
                <input type='text' onChange={(e) => setVal({ ...val, name: e.target.value })} />
                <textarea value={value} onChange={(e) => setVal({ ...val, content: e.target.value })} />
                <button type='submit' className='btn btn-success'>Submit</button>
            </form>
            {
                comments.length > 0 ? comments.map(c =>
                    <div key={c._id} className='col-12 col-md-6 col-lg-3'>
                        <div>
                            // name 
                            // time stamp 
                            // content 
                            // delete 
                            // update 
                        </div>
                    </div>
                ) : <h1>Loading</h1>
            }
        </div>
    )
}

export default Comment