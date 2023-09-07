import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useProductQuery } from '../slices/productApiSlice'
import SingleProduct from '../components/SingleProduct'
import AddReview from '../components/AddReview'
import Spinner from '../components/Spinner'
import Rating from '../components/Rating'
import Message from '../components/Message'

const Product = () => {
    const { id } = useParams()
    const { userInfo } = useSelector((state) => state.auth)
    const { data, isLoading, refetch } = useProductQuery(id)

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to='/' className='btn btn-light fw-light px-3'>
                        Go Back
                    </Link>
                    <main className='mt-3'>
                        <SingleProduct product={data?.data} />
                        <div className='row'>
                            <div className='col-md-6'>
                                <Message variant='secondary'>
                                    <h2 className='lead fw-medium' style={{ marginBottom: '-3px', marginTop: '-3px' }}>
                                        Reviews
                                    </h2>
                                </Message>
                            </div>
                        </div>

                        <div className='row px-4'>
                            <div className='col-md-6'>
                                {data?.data?.reviews.length !== 0 ? (
                                    data?.data?.reviews.map((review) => (
                                        <div className='mb-2' key={review._id}>
                                            <p className='fw-medium' style={{ marginBottom: '-1px' }}>
                                                {review.name}
                                            </p>
                                            <Rating initialRating={review.rating} edit={false} />
                                            <p className='fw-light'>{new Date(review.createdAt).toISOString().split('T')[0]}</p>
                                            <p className='fw-light'>{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <Message variant='light'>No Reviews.</Message>
                                )}
                                <hr />
                            </div>
                        </div>

                        <div className='row px-4'>
                            <div className='col-md-6'>
                                <Message variant='secondary'>
                                    <span className='lead fw-medium'>Write a customer Review</span>
                                </Message>
                                {userInfo ? (
                                    <AddReview refetch={refetch} reviews={data?.data?.reviews} />
                                ) : (
                                    <Message>
                                        Please{' '}
                                        <Link to='/login' className='alert-link'>
                                            sign in
                                        </Link>{' '}
                                        to write a review
                                    </Message>
                                )}
                            </div>
                        </div>
                    </main>
                </Fragment>
            )}
        </div>
    )
}

export default Product
