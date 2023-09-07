import { useState } from 'react'
import Rating from './Rating'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { addToCart } from '../slices/cartSlice'

const SingleProduct = ({ product }) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const handleCart = (e) => {
        e.preventDefault()
        dispatch(addToCart({ ...product, qty: Number(qty) }))
        toast.success('Product added to cart successfully')
    }

    return (
        <div className='row'>
            <div className='col-md-6'>
                <img src={`http://localhost:5000/uploads/${product.image}`} alt={`${product.name}`} className='img-fluid rounded' />
            </div>
            <div className='col-md-3'>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                        <h3 className='text-body-secondary'>{product.name}</h3>
                    </li>
                    <li className='list-group-item'>
                        <Rating initialRating={product.rating} edit={false} size={23} numReviews={product.numReviews} />
                    </li>
                    <li className='list-group-item'>
                        <p className='lead'>Price: ${product.price}</p>
                    </li>
                    <li className='list-group-item'>
                        <p className='lead' style={{ textAlign: 'justify', fontSize: '1.2rem', color: '#333' }}>
                            Description:
                            <br /> {product.description}
                        </p>
                    </li>
                </ul>
            </div>
            <div className='col-md-3'>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <div className='d-flex justify-content-between'>
                            <p className='lead'>Price:</p>
                            <p className='lead fw-semibold'>${product.price}</p>
                        </div>
                    </li>
                    <li className='list-group-item'>
                        <div className='d-flex justify-content-between'>
                            <p className='lead'>Stock:</p>
                            <p className={`lead fw-semibold ${!product.countInStock && 'text-danger'}`}>{product.countInStock ? 'In Stock' : 'Out of Stock'}</p>
                        </div>
                    </li>
                    <li className='list-group-item'>
                        <div className='d-flex justify-content-between'>
                            <p className='lead'>Qty:</p>
                            <select
                                className='form-select shadow-none'
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                disabled={!product.countInStock}
                                style={{ width: '80px' }}
                            >
                                {!product.countInStock && <option value='0'>0</option>}
                                {[...Array(product.countInStock).keys()].map((x) => (
                                    <option value={x + 1} key={x}>
                                        {x + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </li>
                    <li className='list-group-item pt-4' style={{ paddingBlock: '12px' }}>
                        <button className='btn btn-secondary' disabled={!product.countInStock} onClick={handleCart}>
                            Add To Cart
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SingleProduct
