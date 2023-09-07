import React from 'react'

const Message = ({ variant, children }) => {
    return (
        <div className={`alert alert-${variant || 'primary'}`} role='alert'>
            {children}
        </div>
    )
}

export default Message
