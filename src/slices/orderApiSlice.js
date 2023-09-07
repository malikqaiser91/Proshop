import { apiSlice } from './apiSlice'

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        myOrders: builder.query({
            query: () => ({
                url: '/orders/my-orders',
                method: 'GET',
            }),
        }),
        getOrder: builder.query({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'GET',
            }),
        }),
        order: builder.mutation({
            query: (data) => ({
                url: '/orders/',
                method: 'POST',
                body: data,
            }),
        }),
        getOrders: builder.query({
            query: (data) => ({
                url: '/orders',
                method: 'GET',
            }),
        }),
        orderDelivered: builder.mutation({
            query: (data) => ({
                url: `/orders/${data}/deliver`,
                method: 'PUT',
            }),
        }),
    }),
})

export const { useMyOrdersQuery, useOrderMutation, useGetOrderQuery, useGetOrdersQuery, useOrderDeliveredMutation } = orderApiSlice
