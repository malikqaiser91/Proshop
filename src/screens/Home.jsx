import React from 'react'
import Products from '../components/Products'

import { useProductsQuery } from '../slices/productApiSlice'
import { useEffect } from 'react'

const Home = () => {
    let { data, isLoading, refetch } = useProductsQuery()

    useEffect(() => {
        refetch()
    }, [refetch])

    return (
        <div>
            <h2 className='text-body-secondary'>Latest Products</h2>
            {data?.data.length > 0 ? (
                <Products products={data.data} isLoading={isLoading} />
            ) : (
                <p className='text-center lead mt-3 text-secondary'>No Products to show.</p>
            )}
        </div>
    )
}

export default Home
