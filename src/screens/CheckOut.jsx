import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'

import { useOrderMutation } from '../slices/orderApiSlice'
import { isObjectEmpty } from '../utils'
import { clearCart } from '../slices/cartSlice'

const CheckOut = () => {
    const { shippingAddress, paymentPayment, cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = useSelector((state) => state.cart)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const completeAddress = `${shippingAddress?.address}, ${shippingAddress?.city}  ${shippingAddress?.postalCode}, ${shippingAddress?.country}`

    const orderItems = cartItems.reduce((acc, item) => {
        const obj = { name: item.name, image: item.image, price: item.price, qty: item.qty, product: item._id }
        acc.push(obj)
        return acc
    }, [])

    const [order, { isLoading }] = useOrderMutation()

    const handleOrder = async (e) => {
        e.preventDefault()
        try {
            const res = await order({ orderItems, paymentMethod: paymentPayment, shippingAddress, taxPrice, shippingPrice, totalPrice }).unwrap()
            dispatch(clearCart())
            toast.success('Order placed successfully')
            navigate(`/orders/${res.data._id}`)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <Fragment>
            <ul className='nav justify-content-center'>
                <li className='nav-item'>
                    <Link className='nav-link active' style={{ color: '#333' }} to='/shipping'>
                        Shipping
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' style={{ color: '#333' }} to='/payment'>
                        Payment
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' style={{ color: '#333', textDecoration: 'underline' }} to='/checkout'>
                        Place Order
                    </Link>
                </li>
            </ul>
            <div className='row mt-1'>
                <div className='col-md-8'>
                    <div className='mb-2'>
                        <h4 className='text-secondary'>Shipping</h4>
                        <p className='text-secondary mt-1'>
                            <strong>Address:</strong> {isObjectEmpty(shippingAddress) ? '' : completeAddress}
                        </p>
                    </div>
                    <hr />
                    <div className='mb-2'>
                        <h4 className='text-secondary'>Payment Method</h4>
                        <p className='text-secondary mt-1'>
                            <strong>Method:</strong> {paymentPayment}
                        </p>
                    </div>
                    <hr />
                    <div>
                        <h4 className='text-secondary'>Order Items</h4>
                        <div className='px-3 mt-3'>
                            {cartItems.length > 0 ? (
                                <div>
                                    {cartItems.map((cart, index, array) => (
                                        <Fragment key={cart._id}>
                                            <div className='d-flex justify-content-between'>
                                                <div className='d-flex'>
                                                    <img
                                                        src={`http://localhost:5000/uploads/${cart.image}`}
                                                        alt={cart.name}
                                                        style={{ width: '100px' }}
                                                        className='img-fluid rounded'
                                                    />
                                                    <p className='text-secondary' style={{ marginLeft: '20px', paddingTop: '15px' }}>
                                                        {cart.name}
                                                    </p>
                                                </div>
                                                <p className='text-secondary'>
                                                    {cart.price} x {cart.qty} : {Math.round(cart.price * cart.qty).toFixed(2)}
                                                </p>
                                            </div>
                                            {!(index === array.length - 1) && <hr />}
                                        </Fragment>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-secondary'>No items in the cart.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card rounded card-body mb-3 list-group list-group-flush'>
                        <h4 className='text-secondary mb-3 px-3 '>Order Summary</h4>
                        <li className='d-flex justify-content-between px-3 mb-2'>
                            <span className='text-secondary'>Items</span>
                            <span>{itemsPrice && `$${itemsPrice}`}</span>
                        </li>
                        <hr />
                        <li className='d-flex justify-content-between px-3 '>
                            <span className='text-secondary'>Shipping</span>
                            <span>{shippingPrice && `$${shippingPrice}`}</span>
                        </li>
                        <hr />
                        <li className='d-flex justify-content-between px-3 '>
                            <span className='text-secondary'>Tax</span>
                            <span>{taxPrice && `$${taxPrice}`}</span>
                        </li>
                        <hr />
                        <li className='d-flex justify-content-between px-3 '>
                            <span className='text-secondary'>Total</span>
                            <span>{totalPrice && `$${totalPrice}`}</span>
                        </li>
                        <hr />
                        <button className='btn btn-dark  mx-2' disabled={isLoading || cartItems.length === 0} onClick={handleOrder}>
                            {isLoading ? 'Loading...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CheckOut
