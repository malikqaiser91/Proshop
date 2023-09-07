import { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Spinner from '../../components/Spinner'
import { useProductsQuery } from '../../slices/productApiSlice'
import { useCreateProductMutation, useDeleteProductMutation } from '../../slices/productApiSlice'

const Products = () => {
    const { data, isLoading, refetch } = useProductsQuery()

    const navigate = useNavigate()
    const [product, { isLoading: productLoading }] = useCreateProductMutation()
    const [productDel, { isLoading: productDelLoading }] = useDeleteProductMutation()

    useEffect(() => {
        refetch()
    }, [refetch])

    const handleCreateProduct = async (e) => {
        e.preventDefault()
        const res = await product().unwrap()
        toast.success('Product added successfully')
        navigate(`/admin/products/${res.data._id}`)
    }

    const handleDelete = async (id) => {
        const res = await productDel(id).unwrap()
        refetch()
        toast.success(res?.message)
    }

    return (
        <Fragment>
            <div className='d-flex justify-content-between mt-2'>
                <h3 className='text-secondary'>Products</h3>
                <button className='btn btn-dark' disabled={productLoading} onClick={handleCreateProduct}>
                    {productLoading ? 'Loading...' : 'Create Product'}
                </button>
            </div>
            <div className='mt-4'>
                {isLoading && <Spinner />}
                {data?.data?.length > 0 ? (
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>NAME</th>
                                <th scope='col'>PRICE</th>
                                <th scope='col'>CATEGORY</th>
                                <th scope='col'>BRAND</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((product) => (
                                <tr>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price && `$${product.price}`}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <Link to={`/admin/products/${product._id}`}>
                                            <i className='fas fa-edit' />
                                        </Link>
                                        <button
                                            style={{
                                                textDecoration: 'none',
                                                border: 'none',
                                                marginLeft: '15px',
                                                cursor: 'pointer',
                                                color: 'black',
                                                backgroundColor: '#ccc',
                                            }}
                                            onClick={() => handleDelete(product._id)}
                                            disabled={productDelLoading}
                                        >
                                            <i className='fa fa-trash' style={{ color: 'red', cursor: 'pointer' }} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className='lead mt-3 '>No product added</p>
                )}
            </div>
        </Fragment>
    )
}

export default Products
