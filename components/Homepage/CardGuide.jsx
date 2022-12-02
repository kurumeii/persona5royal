import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
export const CardGuide = props => {
  const { src, title, alt, page } = props
  return (
    <Link href={page}>
      <div className='card w-96 bg-base-100 shadow-xl image-full cursor-pointer transition hover:scale-105'>
        <figure>
          <Image
            src={src}
            alt={alt}
            priority
          />
        </figure>
        <div className='card-body items-center justify-center text-center uppercase'>
          <h2 className='card-title'>{title}</h2>
        </div>
      </div>
    </Link>
  )
}
