import { useState, useMemo, useEffect, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import countryList from 'react-select-country-list'

import FormContainer from '../components/FormContainer'
import { addShipping } from '../slices/cartSlice'
import { isObjectEmpty } from '../utils'

const Shipping = () => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const options = useMemo(() => countryList().getData(), [])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { shippingAddress } = useSelector((state) => state.cart)

    useEffect(() => {
        if (!isObjectEmpty(shippingAddress)) {
            setAddress(shippingAddress?.address)
            setCity(shippingAddress?.city)
            setPostalCode(shippingAddress?.postalCode)
            setCountry(shippingAddress?.country)
        }
    }, [shippingAddress])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addShipping({ address, city, postalCode, country }))
        toast.success('Shipping added successfully')
        navigate('/payment')
    }

    return (
        <Fragment>
            <ul className='nav justify-content-center'>
                <li className='nav-item'>
                    <Link className='nav-link active' style={{ color: '#333', textDecoration: 'underline' }} to='/shipping'>
                        Shipping
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' style={{ color: '#333' }} to='/payment'>
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
                <h2 className='text-secondary'>Shipping</h2>
                <form onSubmit={submitHandler}>
                    <div className='form-group mt-2 mb-2'>
                        <label htmlFor='address'>Address</label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type='text'
                            name='address'
                            id='address'
                            placeholder='Enter address'
                            className='form-control shadow-none'
                        />
                    </div>
                    <div className='form-group  mb-2'>
                        <label htmlFor='city'>City</label>
                        <input
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            name='city'
                            id='city'
                            placeholder='Enter city'
                            className='form-control shadow-none'
                        />
                    </div>
                    <div className='form-group  mb-2'>
                        <label htmlFor='postal_code'>Postal Code</label>
                        <input
                            type='text'
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            name='postal_code'
                            id='postal_code'
                            placeholder='Enter postal code'
                            className='form-control shadow-none'
                        />
                    </div>
                    <div className='form-group  mb-2'>
                        <label htmlFor='country'>Country</label>
                        <select value={country} onChange={(e) => setCountry(e.target.value)} className='form-select shadow-none' name='country' id='country'>
                            {options.map((option, index) => (
                                <option key={index} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className='btn btn-dark' type='submit'>
                        Submit
                    </button>
                </form>
            </FormContainer>
        </Fragment>
    )
}

export default Shipping
