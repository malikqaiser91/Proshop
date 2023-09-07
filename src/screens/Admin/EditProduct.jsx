import { Fragment, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import FormContainer from '../../components/FormContainer'
import Spinner from '../../components/Spinner'
import { useProductQuery, useEditProductMutation, useUploadImageMutation } from '../../slices/productApiSlice'
import { useEffect } from 'react'

const EditProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [image, setImage] = useState('')

    const { id } = useParams()

    const { data, isLoading, refetch } = useProductQuery(id)
    const [editProduct, { isLoading: editProductLoading }] = useEditProductMutation()
    const [imageUpload, { isLoading: imageLoading }] = useUploadImageMutation()

    useEffect(() => {
        refetch()
    }, [refetch])

    useEffect(() => {
        setName(data?.data?.name || '')
        setPrice(data?.data?.price || 0)
        setBrand(data?.data?.brand || '')
        setCategory(data?.data?.category || '')
        setDescription(data?.data?.description || '')
        setCountInStock(data?.data?.countInStock || 0)
        setImage(data?.data?.image || '')
    }, [data])

    const formHandler = async (e) => {
        e.preventDefault()
        try {
            await editProduct({ _id: data?.data?._id, name, price, brand, category, description, countInStock, image }).unwrap()
            refetch()
            toast.success('Product edited successfully')
        } catch (err) {
            toast.error(err?.data?.message || err?.message)
        }
    }

    const handleFile = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('image', e.target.files[0])
            const res = await imageUpload({ formData, _id: data?.data?._id }).unwrap()
            refetch()
            toast.success(res?.message)
        } catch (err) {
            toast.error(err?.data.message || err?.error)
        }
    }

    return (
        <Fragment>
            <Link className='btn btn-light shadow-none mt-3 mb-3' to='/admin/products'>
                Go back
            </Link>
            <FormContainer removeRow={false}>
                <h4 className='text-secondary'>Edit Product</h4>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <form className='mt-1' onSubmit={formHandler}>
                        <div className='form-group mb-2'>
                            <label htmlFor='name' className='mb-1 text-secondary form-label'>
                                Name
                            </label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name='name'
                                id='name'
                                placeholder='Enter name'
                                className='form-control shadow-none'
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <label htmlFor='price' className='mb-1 text-secondary form-label'>
                                Price
                            </label>
                            <input
                                type='number'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                name='price'
                                id='price'
                                placeholder='Enter price'
                                className='form-control shadow-none'
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <label htmlFor='file-image' className='mb-1 text-secondary form-label'>
                                Image
                            </label>
                            <input
                                type='text'
                                name='image'
                                id='image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className='form-control shadow-none'
                            />
                            <input
                                type='file'
                                name='file-image'
                                id='file-image'
                                onChange={handleFile}
                                placeholder='Upload image'
                                className='form-control shadow-none'
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <label htmlFor='brand' className='mb-1 text-secondary form-label'>
                                Brand
                            </label>
                            <input
                                type='text'
                                name='brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                id='brand'
                                placeholder='Enter brand'
                                className='form-control shadow-none'
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <label htmlFor='countInStock' className='mb-1 text-secondary form-label'>
                                Count In Stock
                            </label>
                            <input
                                type='number'
                                name='countInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                                id='countInStock'
                                placeholder='Enter stock count'
                                className='form-control shadow-none'
                            />
                        </div>
                        <div className='form-group mb-2'>
                            <label htmlFor='category' className='mb-1 text-secondary form-label'>
                                Category
                            </label>
                            <input
                                type='text'
                                name='category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                id='category'
                                placeholder='Enter category'
                                className='form-control shadow-none'
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <label htmlFor='description' className='mb-1 text-secondary form-label'>
                                Description
                            </label>
                            <input
                                type='text'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                name='description'
                                id='description'
                                placeholder='Enter description'
                                className='form-control shadow-none'
                            />
                        </div>
                        <button className='btn btn-dark ' type='submit' disabled={editProductLoading}>
                            {editProductLoading ? 'Loading...' : 'Submit'}
                        </button>
                    </form>
                )}
            </FormContainer>
        </Fragment>
    )
}

export default EditProduct
