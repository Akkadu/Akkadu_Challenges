import React, { useState } from 'react'

function Form({ value, onChangeValue ,onSubmitHandler ,onChangeHandler}) {

    return (
        <form className='d-flex flex-column md-form justify-content-center align-items-center mb-3' onSubmit={onSubmitHandler}>
            <div>
                <fieldset className="rating" onChange={(e) => onChangeValue({ ...value, rating: parseInt(e.target.value) })}>
                    <input onChange={(e)=>onChangeHandler(e)} checked={value.rating === 5 ? true : false}  type="radio" id="star5" name="rating" value="5" /><label className="full" htmlFor="star5" title="Awesome - 5 stars"></label>
                    <input onChange={(e)=>onChangeHandler(e)} checked={value.rating === 4 ? true : false}  type="radio" id="star4" name="rating" value="4" /><label className="full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                    <input onChange={(e)=>onChangeHandler(e)} checked={value.rating === 3 ? true : false}  type="radio" id="star3" name="rating" value="3" /><label className="full" htmlFor="star3" title="Meh - 3 stars"></label>
                    <input onChange={(e)=>onChangeHandler(e)} checked={value.rating === 2 ? true : false}  type="radio" id="star2" name="rating" value="2" /><label className="full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                    <input onChange={(e)=>onChangeHandler(e)} checked={value.rating === 1 ? true : false}  type="radio" id="star1" name="rating" value="1" /><label className="full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                </fieldset>
            </div>
            <div className='input-wrapper'>
                <input value={value.name} type='text' className='input' onChange={(e) => onChangeValue({ ...value, name: e.target.value })} />
                <textarea value={value.content} className='input mt-3' onChange={(e) => onChangeValue({ ...value, content: e.target.value })} />
            </div>
            <button type='submit'  data-bs-dismiss="modal"  className='btn btn-success mt-3'>Submit</button>
        </form>
    )
}

export default Form