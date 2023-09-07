import { apiSlice } from './apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/users/login',
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: '/users/',
                method: 'POST',
                body: data,
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: '/users/profile',
                method: 'PUT',
                body: data,
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `/users/${data}`,
                method: 'DELETE',
            }),
        }),
        getUser: builder.query({
            query: (data) => ({
                url: `/users/${data}`,
                method: 'GET',
            }),
        }),
        editUser: builder.mutation({
            query: (data) => ({
                url: `/users/${data._id}`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation, useProfileMutation, useGetAllUsersQuery, useDeleteUserMutation, useGetUserQuery,useEditUserMutation } = authApiSlice
