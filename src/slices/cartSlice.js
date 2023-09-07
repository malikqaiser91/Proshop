import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtil'

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { cartItems: [], shippingAddress: {}, paymentPayment: '' }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { user, rating, reviews, numReviews, ...item } = action.payload
            const existedItem = state.cartItems?.find((x) => x._id === item._id)
            if (existedItem) {
                state.cartItems = state.cartItems?.map((x) => (x._id === existedItem._id ? item : x))
            } else {
                state.cartItems = [...state.cartItems, item]
            }
            return updateCart(state, item)
        },
        addShipping: (state, action) => {
            state.shippingAddress = action.payload
            localStorage.setItem('cart', JSON.stringify(state))
        },
        addPaymentMethod: (state, action) => {
            state.paymentPayment = action.payload
            localStorage.setItem('cart', JSON.stringify(state))
        },
        removeItem: (state, action) => {
            const { ...item } = action.payload
            state.cartItems = state.cartItems.filter((x) => x._id !== item._id)
            return updateCart(state, item)
        },
        clearCart: (state, action) => {
            state.cartItems = []
            state.shippingPrice = null
            state.taxPrice = null
            state.itemsPrice = null
            state.totalPrice = null
            localStorage.setItem('cart', JSON.stringify(state))
        },
        resetCart: (state, action) => {
            state.cartItems = []
            localStorage.setItem('cart', JSON.stringify(state))
        },
    },
})

export const { addToCart, removeItem, resetCart, clearCart, addPaymentMethod, addShipping } = cartSlice.actions

export default cartSlice.reducer
