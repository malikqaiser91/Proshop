import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Spinner from './Spinner'

const Orders = ({ isLoading, orders }) => {
    const { userInfo } = useSelector((state) => state.auth)

    console.log('Orders', orders)

    return isLoading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h2 className='text-secondary '>{userInfo.isAdmin ? 'Orders' : 'My Orders'} </h2>
            <div className='mt-3'>
                {orders.length > 0 ? (
                    <table className='table text-secondary'>
                        <thead>
                            <tr>
                                <th scope='col '>
                                    <span className='text-secondary'>ID</span>
                                </th>
                                <th scope='col'>
                                    <span className='text-secondary'>DATE</span>
                                </th>
                                <th scope='col'>
                                    <span className='text-secondary'>TOTAL</span>
                                </th>
                                <th scope='col'>
                                    <span className='text-secondary'>PAID</span>
                                </th>
                                <th scope='col'>
                                    <span className='text-secondary'>DELIVERED</span>
                                </th>
                                <th scope='col'>
                                    <span className='text-secondary'></span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className='text-secondary'>{order._id}</td>
                                    <td className='text-secondary'>{new Date(order.createdAt).toISOString().split('T')[0]}</td>
                                    <td className='text-secondary'>{order.totalPrice}</td>
                                    <td className='text-secondary'>
                                        {order.isPaid ? (
                                            // <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>
                                            <span style={{ color: 'green', fontWeight: 'bold' }}>{new Date(order.paidAt).toISOString().split('T')[0]}</span>
                                        ) : (
                                            <span style={{ color: 'red', fontWeight: 'bold' }}>X</span>
                                        )}
                                    </td>
                                    <td className='text-secondary'>
                                        {order.isDelivered ? (
                                            // <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>
                                            <span style={{ color: 'green', fontWeight: 'bold' }}>
                                                {new Date(order.deliveredAt).toISOString().split('T')[0]}
                                            </span>
                                        ) : (
                                            <span style={{ color: 'red', fontWeight: 'bold' }}>X</span>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/orders/${order._id}`} style={{ textDecoration: 'underline', color: '#333', fontWeight: 'bold' }}>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className='lead text-center mt-3'>No orders to show.</p>
                )}
            </div>
        </Fragment>
    )
}

export default Orders
