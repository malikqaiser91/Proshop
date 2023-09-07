import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import FormContainer from '../components/FormContainer'
import { useProfileMutation } from '../slices/authApiSlice'
import { useMyOrdersQuery } from '../slices/orderApiSlice'
import { setCredentials } from '../slices/authSlice'
import Spinner from '../components/Spinner'
import Orders from '../components/Orders'

const Profile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)
    const [profile, { isLoading }] = useProfileMutation()

    const { data, isLoading: ordersLoading, refetch } = useMyOrdersQuery()

    useEffect(() => {
        refetch()
    }, [refetch])

    useEffect(() => {
        setName(userInfo?.name)
        setEmail(userInfo?.email)
    }, [userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('Password do not match')
            setPassword('')
            setPassword2('')
            return
        } else {
            try {
                const res = await profile({ name, email, password }).unwrap()
                dispatch(setCredentials({ ...res.data }))
                toast.success('Profile updated successfully')
            } catch (err) {
                toast.error(err?.data?.message)
            }
        }
    }

    return (
        <div className='row'>
            <div className='col-md-4' style={{ marginRight: '10px' }}>
                <h2 className='text-secondary '>User Profile</h2>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <FormContainer removeRow={true}>
                        <div className='mt-2'>
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
                                <button className='mt-2 btn btn-secondary' type='submit'>
                                    Update
                                </button>
                            </form>
                        </div>
                    </FormContainer>
                )}
            </div>
            <div className='col-md-7'>
                <Orders isLoading={ordersLoading} orders={data?.data} />
            </div>
        </div>
    )
}

export default Profile
