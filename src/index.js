import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import store from './store'
import Shipping from './screens/Shipping'
import PrivateRoute from './components/PrivateRoute'
import Profile from './screens/Profile'
import Cart from './screens/Cart'
import Home from './screens/Home'
import Product from './screens/Product'
import Login from './screens/Login'
import Register from './screens/Register'
import Payment from './screens/Payment'
import CheckOut from './screens/CheckOut'
import Order from './screens/Order'

// Admin
import AdminPrivate from './components/AdminPrivate'
import Products from './screens/Admin/Products'
import EditProduct from './screens/Admin/EditProduct'
import Orders from './screens/Admin/Orders'
import Users from './screens/Admin/Users'
import User from './screens/Admin/User'

import App from './App'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index path='/' element={<Home />} />
            <Route index path='/product/:id' element={<Product />} />
            <Route index path='/login' element={<Login />} />
            <Route index path='/register' element={<Register />} />
            <Route index path='/cart' element={<Cart />} />
            <Route path='' element={<PrivateRoute />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/shipping' element={<Shipping />} />
                <Route path='/payment' element={<Payment />} />
                <Route path='/checkout' element={<CheckOut />} />
                <Route path='/orders/:id' element={<Order />} />
            </Route>
            <Route path='' element={<AdminPrivate />}>
                <Route path='/admin/products' element={<Products />} />
                <Route path='/admin/orders' element={<Orders />} />
                <Route path='/admin/products/:id' element={<EditProduct />} />
                <Route path='/admin/users' element={<Users />} />
                <Route path='/admin/users/:id' element={<User />} />
            </Route>
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <RouterProvider router={router} />
            </HelmetProvider>
        </Provider>
    </React.StrictMode>
)
