import React, { Fragment } from 'react'
import Spinner from './Spinner'
import ProductCard from './ProductCard'

const Products = ({ products, isLoading }) => {
    return (
        <Fragment>
            <div className='row'>{isLoading ? <Spinner /> : products.map((product) => <ProductCard key={product?._id} product={product} />)}</div>
        </Fragment>
    )
}

export default Products
