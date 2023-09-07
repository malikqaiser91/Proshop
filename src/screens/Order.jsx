import React, { Fragment } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { useGetOrderQuery, useOrderDeliveredMutation } from '../slices/orderApiSlice'
import Spinner from '../components/Spinner'

const Order = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth)
    const { data, isLoading, refetch } = useGetOrderQuery(id)

    const [delivered, { isLoading: deliveredLoading }] = useOrderDeliveredMutation()

    const itemPrice = data?.data?.orderItems?.reduce((acc, item) => {
        acc += item.qty * item.price
        return acc
    }, 0)

    const deliveredHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await delivered(data?.data?._id).unwrap()
            refetch()
            toast.success(res?.data?.message)
        } catch (err) {
            toast.success(err?.data?.message || err?.error)
        }
    }

    return (
        <Fragment>
            <h3 className='text-secondary'>Order {id}</h3>
            <button className='mt-1 btn btn-light' onClick={() => navigate(-1)}>
                Go back
            </button>
            {isLoading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <div className='mt-3 row p-3'>
                        <div className='col-md-8'>
                            <div className='mb-5'>
                                <h4 className='text-secondary mt-1'>Shipping</h4>
                                <p className='text-secondary mt-1'>
                                    <strong>Name:</strong> {data.data?.user?.name}
                                </p>
                                <p className='text-secondary ' style={{ marginTop: '-5px' }}>
                                    <strong>Email:</strong> {data.data?.user?.email}
                                </p>
                                <p className='text-secondary' style={{ marginTop: '-5px' }}>
                                    <strong>Address:</strong>{' '}
                                    {`${data.data?.shippingAddress?.address}, ${data.data?.shippingAddress?.city}, ${data.data?.shippingAddress?.postalCode}, ${data.data?.shippingAddress?.country} `}
                                </p>
                                <div>
                                    {!data.data?.isDelivered ? (
                                        <div className='alert alert-danger' role='alert'>
                                            Not Delivered
                                        </div>
                                    ) : (
                                        <div className='alert alert-success' role='alert'>
                                            Delivered
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr />
                            <div className='mb-5'>
                                <h4 className='text-secondary mt-1'>Payment Method</h4>
                                <p className='text-secondary mt-1'>
                                    <strong>Method:</strong> {data.data?.paymentMethod}
                                </p>
                                <div>
                                    {!data.data?.isPaid ? (
                                        <div className='alert alert-danger' role='alert'>
                                            Not Paid
                                        </div>
                                    ) : (
                                        <div className='alert alert-success' role='alert'>
                                            Paid
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr />
                            <div className='mb-5'>
                                <h4 className='text-secondary '>Order Items</h4>
                                <div className='px-3 mt-4'>
                                    {data.data?.orderItems?.length > 0 ? (
                                        <div>
                                            {data.data?.orderItems.map((cart, index, array) => (
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
                                    <span className='text-secondary'>{itemPrice && `$${itemPrice}`}</span>
                                </li>
                                <hr />
                                <li className='d-flex justify-content-between px-3 '>
                                    <span className='text-secondary'>Shipping</span>
                                    <span className='text-secondary'>{data.data?.shippingPrice && `$${data.data?.shippingPrice}`}</span>
                                </li>
                                <hr />
                                <li className='d-flex justify-content-between px-3 '>
                                    <span className='text-secondary'>Tax</span>
                                    <span className='text-secondary'>{data.data?.taxPrice && `$${data.data?.taxPrice}`}</span>
                                </li>
                                <hr />
                                <li className='d-flex justify-content-between px-3 '>
                                    <span className='text-secondary'>Total</span>
                                    <span className='text-secondary'>{data.data?.totalPrice && `$${data.data?.totalPrice}`}</span>
                                </li>
                                <hr />
                                {userInfo.isAdmin && !data?.data?.isDelivered && (
                                    <button className='btn btn-dark  mx-2' disabled={deliveredLoading} onClick={deliveredHandler}>
                                        {deliveredLoading ? 'Loading...' : 'Mark As Delivered'}
                                    </button>
                                )}
                                {!userInfo.isAdmin && <button className='btn btn-dark  mx-2'>PAYPAL</button>}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Order
