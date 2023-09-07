import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

import FormContainer from './FormContainer'
import { useAddReviewMutation } from '../slices/productApiSlice'
import Spinner from './Spinner'

const AddReview = ({ refetch, reviews }) => {
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')

    const { id } = useParams()
    const { userInfo } = useSelector((state) => state.auth)

    const reviewExist = Boolean(reviews.find((review) => review.user?.toString() === userInfo._id?.toString()))

    const [addReview, { isLoading }] = useAddReviewMutation()

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!rating || !comment) return toast.error('Please add all the fields before adding review')
        try {
            await addReview({
                id,
                rating: Number(rating),
                comment,
            }).unwrap
            refetch()
            toast.success(`Review added successfully`)
            setRating('')
            setComment('')
        } catch (err) {
            toast.error(err?.data?.message || err?.error)
        }
    }

    return (
        <div>
            <FormContainer removeRow={true}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <form onSubmit={submitHandler}>
                        <div className='form-group mb-3'>
                            <label htmlFor='rating' className='mb-1'>
                                Rating
                            </label>
                            <select
                                disabled={reviewExist}
                                className='form-select shadow-none'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                id='rating'
                                name='rating'
                            >
                                <option defaultValue>Select...</option>
                                <option value='1'>1- Poor</option>
                                <option value='2'>2- Fair</option>
                                <option value='3'>3- Good</option>
                                <option value='4'>4- Very Good</option>
                                <option value='5'>5- Excellent</option>
                            </select>
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor='rating' className='mb-1'>
                                Comment
                            </label>
                            <textarea
                                disabled={reviewExist}
                                className='form-control shadow-none'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                name='rating'
                                id='rating'
                                cols='10'
                                rows='3'
                            ></textarea>
                        </div>
                        <button disabled={reviewExist} className='btn btn-dark' type='submit'>
                            Submit
                        </button>
                    </form>
                )}
            </FormContainer>
        </div>
    )
}

export default AddReview
