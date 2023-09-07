import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { clearCredentials } from '../slices/authSlice'
import { resetCart } from '../slices/cartSlice.js'

const Navbar = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const { cartItems } = useSelector((state) => state.cart)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(clearCredentials())
        dispatch(resetCart())
        toast.success('Logged out Successfully')
        navigate('/login')
    }

    return (
        <Fragment>
            <nav className='navbar navbar-expand-lg bg-body-tertiary'>
                <div className='container'>
                    <Link className='navbar-brand' to='/'>
                        Proshop
                    </Link>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarSupportedContent'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                        <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
                            <li className='nav-item mx-4'>
                                <form className='d-flex' role='search' onSubmit={(e) => e.preventDefault()}>
                                    <input className='form-control me-2 shadow-none' type='search' placeholder='Search' aria-label='Search' />
                                    <button className='btn btn-outline-dark' type='submit'>
                                        Search
                                    </button>
                                </form>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link ' to='/cart'>
                                    Cart
                                    {cartItems.length > 0 && <div className='badge text-bg-primary rounded mx-2'>{cartItems.length}</div>}
                                </Link>
                            </li>
                            {userInfo ? (
                                <Fragment>
                                    <li className='nav-item dropdown'>
                                        <span
                                            className='nav-link dropdown-toggle'
                                            data-bs-toggle='dropdown'
                                            aria-expanded='false'
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {userInfo.name}
                                        </span>
                                        <ul className='dropdown-menu'>
                                            <li>
                                                <Link className='dropdown-item' to='/profile'>
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <span className='dropdown-item' role='button'>
                                                    Purchase Details
                                                </span>
                                                <ul className=' dropdown-menu dropdown-submenu'>
                                                    <li>
                                                        <Link className='dropdown-item' to='/shipping'>
                                                            Shipping
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className='dropdown-item' to='/payment'>
                                                            Payment Method
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link className='dropdown-item' to='/checkout'>
                                                            Checkout
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link className='dropdown-item' onClick={handleLogout}>
                                                    Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    {userInfo.isAdmin && (
                                        <li className='nav-item dropdown'>
                                            <span
                                                className='nav-link dropdown-toggle'
                                                data-bs-toggle='dropdown'
                                                aria-expanded='false'
                                                style={{ cursor: 'pointer' }}
                                            >
                                                Admin
                                            </span>
                                            <ul className='dropdown-menu'>
                                                <li>
                                                    <Link className='dropdown-item' to='/admin/products'>
                                                        Products
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className='dropdown-item' to='/admin/orders'>
                                                        Orders
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className='dropdown-item' to='/admin/users'>
                                                        Users
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    )}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/login'>
                                            Login
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/register'>
                                            Register
                                        </Link>
                                    </li>
                                </Fragment>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Navbar
