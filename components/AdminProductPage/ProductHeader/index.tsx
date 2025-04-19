"use client"
import ConfirmButton from '@/components/buttons/ConfirmButton'
import React from 'react';
import { useRouter } from 'next/navigation';

const ProductHeader = () => {
    const router = useRouter();

  return (
    <div className='flex justify-between items-start w-full mb-10'>
        <select name="category">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
        </select>
        <div className='flex gap-5'>
            <input type="text" placeholder='Search product' className='px-3 rounded-md focus:outline-none'/>
            <ConfirmButton buttonText={"Add product"} onclick={()=> router.push('/admin/product/new')}/>
        </div>
    </div>
  )
}

export default ProductHeader