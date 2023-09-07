import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { isObjectEmpty } from '../utils'

import { addToCart, removeItem } from '../slices/cartSlice'

const Cart = () => {
    const { cartItems, totalPrice, shippingAddress, paymentPayment } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addToCartHandler = (item, qty) => {
        dispatch(addToCart({ ...item, qty }))
        toast.success('Item quantity changed successfully')
    }

    const removeHandler = (item) => {
        dispatch(removeItem({ ...item }))
        toast.success('Item removed successfully')
    }

    const checkOutHandler = (e) => {
        e.preventDefault()
        if (!userInfo) navigate('/login')
        if (isObjectEmpty(shippingAddress)) navigate('/shipping')
        if (shippingAddress && paymentPayment) navigate('/checkout')
    }

    return (
        <div className='mt-2 row'>
            <div className='col-md-8'>
                <h2 className='text-secondary mb-4'>Shopping Cart</h2>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <Fragment key={item._id}>
                            <div className='row mb-3'>
                                <div className='col-md-4'>
                                    <div className='d-flex'>
                                        <img
                                            src={`http://localhost:5000/uploads/${item.image}`}
                                            style={{ width: '140px', marginRight: '15px' }}
                                            className='img-fluid rounded'
                                            alt={`${item.image}`}
                                        />
                                        <p className='text-decoration-underline'>
                                            <Link className='text-decoration-none text-dark' to={`/product/${item._id}`}>
                                                {item.name}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <p>${item.price}</p>
                                </div>
                                <div className='col-md-4'>
                                    <div className='d-flex justify-content-center'>
                                        <select
                                            className='form-select shadow-none'
                                            value={item.qty}
                                            onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                            disabled={!item.countInStock}
                                            style={{ width: '80px' }}
                                        >
                                            {!item.countInStock && <option value='0'>0</option>}
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option value={x + 1} key={x}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <button className='btn btn-light px-3 mx-4' onClick={() => removeHandler(item)}>
                                            <i className='fas fa-trash' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {index !== cartItems.length - 1 && <hr />}
                        </Fragment>
                    ))
                ) : (
                    <p className='lead text-secondary mt-2'>No items in cart</p>
                )}
            </div>
            <div className='col-md-4'>
                <div className='card card-body'>
                    <h3 className='text-secondary mb-3 text-center'>Subtotal ({cartItems.length}) items</h3>
                    <p className='text-center mb-3 lead'>{totalPrice && cartItems.length > 0 ? `$${totalPrice}` : ''}</p>
                    <hr />
                    <Link className='btn btn-dark mx-4 mt-3' onClick={checkOutHandler}>
                        Proceed To Checkout
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart
