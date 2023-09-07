import { apiSlice } from './apiSlice'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        products: builder.query({
            query: (data) => ({
                url: '/products',
                method: 'GET',
            }),
        }),
        product: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'GET',
            }),
        }),
        addReview: builder.mutation({
            query: (data) => ({
                url: `/products/${data.id}/reviews`,
                method: 'POST',
                body: data,
            }),
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: '/products',
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: 'DELETE',
            }),
        }),
        editProduct: builder.mutation({
            query: (data) => ({
                url: `/products/${data._id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        uploadImage: builder.mutation({
            query: (data) => ({
                url: `/products/${data._id}/upload`,
                method: 'PUT',
                body: data.formData,
            }),
        }),
    }),
})

export const {
    useProductsQuery,
    useProductQuery,
    useAddReviewMutation,
    useCreateProductMutation,
    useDeleteProductMutation,
    useEditProductMutation,
    useUploadImageMutation,
} = productApiSlice
