import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useGetUserQuery, useEditUserMutation } from '../../slices/authApiSlice'
import FormContainer from '../../components/FormContainer'
import Spinner from '../../components/Spinner'

const User = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading, refetch } = useGetUserQuery(id)

    const [editUser, { isLoading: editLoading }] = useEditUserMutation()

    useEffect(() => {
        refetch()
    }, [refetch])

    console.log('Data', data)

    useEffect(() => {
        setName(data?.data?.name || '')
        setEmail(data?.data?.email || '')
        setPassword(data?.data?.password || '')
        setIsAdmin(data?.data?.isAdmin || false)
    }, [data])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await editUser({ _id: data?.data?._id, name, email, password, isAdmin: isAdmin ? true : false }).unwrap()
            refetch()
            console.log(res.message)
            toast.success(res?.message)
        } catch (err) {
            toast(err.data.message || err.error)
        }
    }

    return (
        <div>
            <h4 className='mt-1 text-secondary text-center'>Edit User</h4>
            <button className='btn btn-light mt-2' onClick={() => navigate(-1)}>
                Go Back
            </button>
            {isLoading && <Spinner />}
            <FormContainer>
                <form className='mt-3' onSubmit={submitHandler}>
                    <div className='form-group mb-3'>
                        <label htmlFor='name' className='form-label'>
                            Name:
                        </label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter name'
                            name='name'
                            id='name'
                            className='form-control shadow-none'
                        />
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='email' className='form-label'>
                            Email:
                        </label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter email'
                            name='email'
                            id='email'
                            className='form-control shadow-none'
                        />
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='password' className='form-label'>
                            Password:
                        </label>
                        <input
                            type='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter password'
                            id='password'
                            className='form-control shadow-none'
                        />
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='isAdmin' className='form-check-label' style={{ marginRight: '10px' }}>
                            Is Admin:
                        </label>
                        <input type='checkbox' checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} className='form-check-input shadow-none' />
                    </div>
                    <button className='btn btn-dark w-100' type='submit' disabled={editLoading}>
                        {editLoading ? 'Loading...' : 'Edit'}
                    </button>
                </form>
            </FormContainer>
        </div>
    )
}

export default User
