import React from 'react'
import Rating from './Rating'

import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    return (
        <div className='card card-body col-sm-12 col-md-6 mt-3 col-lg-4 col-xl-3 rounded' style={{ marginRight: '10px' }}>
            <Link to={`/product/${product?._id}`}>
                <img src={`http://localhost:5000/uploads/${product?.image}`} className='img-fluid card-img-top' alt={`${product.image}`} />
            </Link>
            <Link style={{ textDecoration: 'none', color: '#333' }} to={`/product/${product?._id}`}>
                <h5 className='card-title mt-3 text-center'>{product?.name}</h5>
            </Link>
            <Rating initialRating={product?.rating} edit={false} />
            <Link style={{ textDecoration: 'none', color: '#333' }} to={`/product/${product?._id}`}>
                <p className='lead text-center'>${product?.price}</p>
            </Link>
        </div>
    )
}

export default ProductCard
