import React from 'react'

const Spinner = () => {
    return (
        <div className='d-flex justify-content-center mt-5'>
            <div className='spinner-border  spinner-border-xl ' style={{ width: '4rem', height: '4rem' }} role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
