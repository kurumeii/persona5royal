import Image from 'next/image.js'
import Link from 'next/link.js'
import React from 'react'

export function ConfidantCard({ confidants }) {
  return (
    <>
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
          <div
            key={name}
            className='relative col-auto drop-shadow-lg border-primary border-2 border-solid cursor-pointer'
          >
            <Image
              src={`/confidants/${arcana}/${arcana}_bg.jpg`}
              alt={arcana}
              width={170}
              height={300}
              className='transition-opacity group-hover:opacity-80 w-full h-full'
            />
          </div>
        </Link>
      ))}
    </>
  )
}
