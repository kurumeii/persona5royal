import Image from 'next/image.js'
import Link from 'next/link.js'
import React, { createRef, forwardRef, useEffect } from 'react'

function CrossWord(props, ref) {
  const { data, scrollToContent } = props
  return (
    <>
      <div className='col-span-2 hidden xl:block'>
        <div className='w-60 sticky top-0 max-h-screen overflow-auto overscroll-contain'>
          <ul className='menu menu-vertical bg-base-300 '>
            {data.map((obj, i) => (
              <li
                key={i}
                className='hover-bordered'
              >
                <Link
                  href=''
                  onClick={e => scrollToContent(e, i)}
                >
                  Crossword puzzle q {obj.no}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='col-span-10'>
        {data.map((obj, i) => (
          <div
            className='card lg:card-side p-10'
            key={i}
            ref={ref[i]}
          >
            <figure>
              {obj ? (
                <Image
                  src={`/quiz/${obj.no}.jpg`}
                  alt='cover picture'
                  width={600}
                  height={300}
                />
              ) : null}
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>{obj.question} ?</h2>
              <p>{obj.answers}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default forwardRef(CrossWord)
