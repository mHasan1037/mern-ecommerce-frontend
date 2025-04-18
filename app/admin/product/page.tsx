import ProductHeader from '@/components/AdminProductPage/ProductHeader'
import AdminSidebar from '@/components/adminSidebar'
import React from 'react'

const Product = () => {
  return (
    <div className='adminMainSection'>
        <AdminSidebar />
        <ProductHeader />
    </div>
  )
}

export default Product