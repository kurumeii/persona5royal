import Image from 'next/image.js'
import Link from 'next/link.js'
import React from 'react'

export function ConfidantCard({ confidants }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 md:gap-5 auto-cols-max justify-items-center items-center'>
      {confidants.map(({ id, arcana, name }) => (
        <Link
          className='group '
          key={id}
          href={{
            pathname: '/confidants/[arcanaId]',
            query: { arcanaId: arcana },
          }}
          replace
        >
          <div className='relative cursor-pointer rounded-md w-32 h-64 md:w-40 md:h-72 transition-transform hover:scale-95'>
            <Image
              src={`/confidants/${arcana}/${arcana}_bg.jpg`}
              alt={name}
              fill
              className='object-contain object-center'
              sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
            />
          </div>
        </Link>
      ))}
    </div>
  )
}
