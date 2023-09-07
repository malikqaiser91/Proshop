import { useEffect } from 'react'
import { Fragment } from 'react'

import { useGetOrdersQuery } from '../../slices/orderApiSlice'
import Orders from '../../components/Orders'

const OrdersData = () => {
    const { data, isLoading, refetch } = useGetOrdersQuery()

    useEffect(() => {
        refetch()
    }, [refetch])

    return (
        <Fragment>
            <div className='mt-2'>
                <Orders orders={data?.data} isLoading={isLoading} />
            </div>
        </Fragment>
    )
}

export default OrdersData
