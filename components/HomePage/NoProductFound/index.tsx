import Image from 'next/image'
import React from 'react'

const NoProductFound = () => {
  return (
    <div className='w-fullmin-h-[75vh] h-full flex flex-col gap-4 justify-center items-center'>
        <Image 
           src={'images/No_Product_Found.png'}
           alt='No product found'
           height={200}
           width={200}
        />
        <h1 className="text-xl md:text-2xl font-semibold text-gray-500">No product found</h1>
    </div>
  )
}

export default NoProductFound