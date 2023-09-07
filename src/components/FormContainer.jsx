import React from 'react'

const FormContainer = ({ children, removeRow }) => {
    return <div className={`mx-auto ${!removeRow && 'row col-md-6'}`}>{children}</div>
}

export default FormContainer
