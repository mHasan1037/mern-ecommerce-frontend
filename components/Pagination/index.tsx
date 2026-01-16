import React from 'react'

interface PaginationProps{
    totalPages: number,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({totalPages, page, setPage}: PaginationProps) => {

  return (
    <div>
        {Array.from({length: totalPages}, (_, i) =>(
            <button
               key={i}
               onClick={() => setPage(i + 1)}
               className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-[#299E60] text-white' : ''}`}
            >
              {i + 1}
            </button>
        ))}
    </div>
  )
}

export default Pagination