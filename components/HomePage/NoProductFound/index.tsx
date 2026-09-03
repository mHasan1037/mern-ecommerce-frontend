import Image from 'next/image'
import React from 'react'

const NoProductFound = () => {
  return (
    <div className='flex min-h-[60vh] w-full flex-col items-center justify-center gap-5 border border-mist bg-white/75 p-8 shadow-boutique-sm'>
        <Image 
           src={'/images/No_Product_Found.png'}
           alt='No product found'
           height={200}
           width={200}
        />
        <h1 className="font-display text-2xl font-semibold text-ink/65 md:text-3xl">No product found</h1>
    </div>
  )
}

export default NoProductFound
