import React from 'react'
import ReactStars from 'react-rating-stars-component'

const Rating = ({ initialRating, edit, size, numReviews }) => {
    const handleRating = () => {}
    return (
        <div className='mx-auto'>
            <ReactStars
                count={5}
                edit={edit}
                value={initialRating || 0}
                size={size ? size : 24}
                isHalf={true}
                emptyIcon={<i className='far fa-star'></i>}
                halfIcon={<i className='fa fa-star-half-alt'></i>}
                fullIcon={<i className='fa fa-star'></i>}
                activeColor='#ffd700'
                onChange={edit ? (newRating) => handleRating(newRating) : undefined}
            />
            {numReviews && (
                <div className='lead' style={{ fontSize: '1rem' }}>
                    {numReviews} Reviews
                </div>
            )}
        </div>
    )
}

export default Rating
