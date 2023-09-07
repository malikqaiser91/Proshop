import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import FormContainer from '../components/FormContainer'
import { useRegisterMutation } from '../slices/authApiSlice'
import { setCredentials } from '../slices/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth)

    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        if (userInfo) navigate('/')
    }, [userInfo, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('Password do not match.')
            setPassword('')
            setPassword2('')
            return
        } else {
            try {
                const res = await register({ name, email, password }).unwrap()
                dispatch(setCredentials({ ...res.data }))
                toast.success('Register successfully')
                navigate('/')
            } catch (err) {
                toast.error(err?.data?.message)
            }
        }
    }
    return (
        <FormContainer>
            <div className='mt-2'>
                <h2 className='text-body-secondary '>Register</h2>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <form className='mt-3' onSubmit={submitHandler}>
                        <div className='form-group mb-3'>
                            <label htmlFor='name' className='mb-1'>
                                Name:
                            </label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter name'
                                className='form-control shadow-none'
                                id='name'
                                name='name'
                            />
                        </div>
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
                        <div className='form-group mb-3'>
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
                        <div className='form-group mb-3 '>
                            <label htmlFor='password2' className='mb-1'>
                                Confirm Password:
                            </label>
                            <input
                                type='password'
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                placeholder='Confirm password'
                                className='form-control shadow-none'
                                id='password2'
                                name='password2'
                            />
                        </div>
                        <button className='mt-2 btn btn-dark' type='submit'>
                            Register
                        </button>
                        <p className='mt-3 lead' style={{ fontSize: '1rem' }}>
                            Already have an account ?{' '}
                            <Link to='/login' className='text-decoration-none'>
                                Login
                            </Link>{' '}
                        </p>
                    </form>
                )}
            </div>
        </FormContainer>
    )
}

export default Register
