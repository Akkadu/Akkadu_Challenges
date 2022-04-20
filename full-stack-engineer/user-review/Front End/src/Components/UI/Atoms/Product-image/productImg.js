import React from 'react'

const ProductImage = ({uri,altText,customStyle}) => {
  return <img className={customStyle}  src={uri} alt={altText} />
}

export default ProductImage