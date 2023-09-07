import { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useGetAllUsersQuery, useDeleteUserMutation } from '../../slices/authApiSlice'
import Spinner from '../../components/Spinner'

const Users = () => {
    const { data, isLoading, refetch } = useGetAllUsersQuery()

    const [deleteUser, { isLoading: delLoading }] = useDeleteUserMutation()

    useEffect(() => {
        refetch()
    }, [refetch])

    const handleDelete = async (id) => {
        try {
            const res = await deleteUser(id).unwrap()
            refetch()
            toast.success(res?.message)
        } catch (err) {
            toast.error(err?.data?.message || err?.error)
        }
    }

    return (
        <Fragment>
            <h4 className='text-secondary mt-2'>Users</h4>
            <div className='mt-4'>
                {isLoading && <Spinner />}
                {data?.data?.length > 0 ? (
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>NAME</th>
                                <th scope='col'>EMAIL</th>
                                <th scope='col'>IS_ADMIN</th>
                                <th scope='col'>CREATED AT</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'true' : 'false'}</td>
                                    <td>{new Date(user.createdAt).toISOString().split('T')[0]}</td>
                                    <td>
                                        <Link to={`/admin/users/${user._id}`}>
                                            <i className='fas fa-edit' />
                                        </Link>
                                        <button
                                            style={{
                                                textDecoration: 'none',
                                                border: 'none',
                                                marginLeft: '15px',
                                                cursor: 'pointer',
                                                color: 'black',
                                                backgroundColor: '#ccc',
                                            }}
                                            onClick={() => handleDelete(user._id)}
                                            disabled={delLoading}
                                        >
                                            <i className='fa fa-trash' style={{ color: 'red', cursor: 'pointer' }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className='lead mt-3 '>No users found</p>
                )}
            </div>
        </Fragment>
    )
}

export default Users
