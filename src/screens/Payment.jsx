import { useState, useEffect, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import FormContainer from '../components/FormContainer'
import { addPaymentMethod } from '../slices/cartSlice'

const Payment = () => {
    const [paypal, setPaypal] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { paymentPayment } = useSelector((state) => state.cart)

    useEffect(() => {
        if (paymentPayment === 'PayPal' && paymentPayment) setPaypal(true)
    }, [paymentPayment])

    const submitHandler = (e) => {
        e.preventDefault()
        if (paypal) dispatch(addPaymentMethod('PayPal'))
        toast.success('Payment Method added successfully')
        navigate('/checkout')
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
                    <Link className='nav-link' style={{ color: '#333', textDecoration: 'underline' }} to='/payment'>
                        Payment
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' style={{ color: '#333' }} to='/checkout'>
                        Place Order
                    </Link>
                </li>
            </ul>
            <FormContainer>
                <h2 className='text-secondary'>Payment Method</h2>
                <p className='lead text-secondary mt-3'>Select Method</p>
                <form onSubmit={submitHandler}>
                    <div className='form-group  mb-3'>
                        <label className='rounded-checkbox text-secondary'>
                            <input type='checkbox' checked={paypal} onChange={() => setPaypal(!paypal)} />
                            <span className='checkmark' style={{ marginTop: '3px' }}></span>
                            PayPal or Credit Card
                        </label>
                    </div>
                    <button className='btn btn-dark' type='submit'>
                        Continue
                    </button>
                </form>
            </FormContainer>
        </Fragment>
    )
}

export default Payment
