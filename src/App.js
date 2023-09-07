import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { clearCredentials } from './slices/authSlice'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const expirationTime = JSON.parse(localStorage.getItem('expirationTime'))
        const currentTime = new Date().getTime()
        if (currentTime > expirationTime) dispatch(clearCredentials())
    }, [dispatch])

    return (
        <div className='layout'>
            <ToastContainer autoClose={1000} theme='colored' />
            <Navbar />
            <main className='py-3'>
                <div className='container'>
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default App
