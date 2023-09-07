import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import FormContainer from '../components/FormContainer'
import { useLoginMutation } from '../slices/authApiSlice'
import { setCredentials } from '../slices/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth)

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        if (userInfo) navigate('/')
    }, [userInfo, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res.data }))
            toast.success('Login successfully')
            navigate('/')
        } catch (err) {
            toast.error(err?.data?.message)
        }
    }

    return (
        <FormContainer>
            <div className='mt-2'>
                <h2 className='text-body-secondary '>Sign In</h2>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <form className='mt-3' onSubmit={submitHandler}>
                        <div className='form-group mb-3'>
                            <label htmlFor='email' className='mb-1'>
                                Email Address:
                            </label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter email'
                                className='form-control shadow-none'
                                id='email'
                                name='email'
                            />
                        </div>
                        <div className='form-group mb-3 '>
                            <label htmlFor='password' className='mb-1'>
                                Password:
                            </label>
                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter password'
                                className='form-control shadow-none'
                                id='password'
                                name='password'
                            />
                        </div>
                        <button className='mt-2 btn btn-dark' type='submit'>
                            Sign In
                        </button>
                        <p className='mt-3 lead' style={{ fontSize: '1rem' }}>
                            New Customer{' '}
                            <Link to='/register' className='text-decoration-none'>
                                Register
                            </Link>{' '}
                        </p>
                    </form>
                )}
            </div>
        </FormContainer>
    )
}

export default Login
