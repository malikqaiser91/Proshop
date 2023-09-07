import React, { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth)
    return <Fragment>{userInfo ? <Outlet /> : <Navigate replace to='/login' />}</Fragment>
}

export default PrivateRoute
